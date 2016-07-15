const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./config/webpack.dev');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compiler = webpack(config);
const port = process.env.PORT || 3000;

const dns = require('./mock_data/dns.json');
const users = require('./mock_data/users.json');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./mock_data/mock.db')();

const password = 'changeme';
const saltrounds = 10;
const salt = bcrypt.genSaltSync(saltrounds);
const jwtsalt = 'hunter2';
const passhash = bcrypt.hashSync(password, salt);

db.set('1', {
  id: 1,
  email: 'foo@bar.io',
  password: passhash
});

////////////////////////////////////////////////////////////
// MIDDLEWARE
////////////////////////////////////////////////////////////
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// Need to use bodyParser to get data from POST and/or URL params
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// Logging
app.use(morgan('dev'));

////////////////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  const user = db.get('1');
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

const apiRoutes = express.Router();

// Unauthenticated login route

apiRoutes.post('/auth/sign_in', (req, res) => {
  // Query database for user. If founds, issue successful token, else, fail
  queryForUserEmail(req.body.email).then(user => {
    // Password verify
    const proposedHash = bcrypt.hashSync(req.body.password, salt);

    if(user.password !== proposedHash) {
      loginFailed(res);
    } else { // Successful login! Create token
      res.json(setNewToken(res, user, jwtsalt));
    }
  }).catch(_ => {
    loginFailed(res);
  });
});

apiRoutes.get('/auth/validate_token', (req, res) => {
  const token = req.headers['access-token'];

  if(token) {
    jwt.verify(token, jwtsalt, (err, decoded) => {
      if(err) {
        res.status(403);
        res.json({success: false, message: 'invalid token'});
      } else {
        // Save token to request so it's avialable in other routes
        req.token = token;
        const user = db.get(parseInt(decoded.id));
        res.json(setNewToken(res, user, jwtsalt));
      }
    });
  } else {
    res.json({success: false, message: 'no token found'});
  }
});

// Authenticated routes


apiRoutes.get('/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(db.get('1')));
});

apiRoutes.use((req, res, next) => {
  // Check header or url params or post params for token
  const token = req.header('access-token');

  if(token) {
    // Verify secret and checks expiry
    jwt.verify(token, jwtsalt, (err, decoded) => {
      if(err) {
        res.status(403);
        return res.json({success: false, message: 'invalid token'});
      } else {
        // Save token to request so it's avialable in other routes
        req.token = token;
        const user = db.get(parseInt(decoded.id));
        setNewToken(res, user, jwtsalt);
        next();
      }
    });
  } else {
    // No token, return forbidden error
    return res.status(403).send({
      success: false,
      message: 'no access token found'
    });
  }
});

apiRoutes.get('/dns', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(dns));
});

app.use('/api/v1', apiRoutes);

app.listen(port, 'localhost', err => {
  if(err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});

function queryForUserEmail(email) {
  return new Promise((res, rej) => {
    const user = db.get('1');
    const foundUser = user.email === email;
    foundUser ? res(user) : rej(Error('user not found'));
  });
}

function loginFailed(res) {
  res.status(401);
  res.json({success: false, message: 'login failed'});
}

function setNewToken(res, user, jwtsalt) {
  const secday= (24*60*60);
  const token = jwt.sign(user, jwtsalt, {
    expiresIn: secday
  });

  res.status(200);

  const expiry = (Date.now() + secday).toString();
  const clientToken = 'a3f5b6ba-cfe2-4a04-9ef6-72e8c0d2781f';

  res.set({
    'access-token': token,
    'client': clientToken,
    'expiry': expiry,
    'uid': user.id
  });

  return {
    data: {
      'uid': user.id,
      'provider': 'email',
      'email': user.email
    }
  };
}
