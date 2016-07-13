const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./config/webpack.dev');

const app = express();
const bodyParser = require('body-parser');
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

// Logging
app.use(morgan('dev'));

////////////////////////////////////////////////////////////
// ROUTES
////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

const apiRoutes = express.Router();

// Unauthenticated login route

apiRoutes.post('/login', (req, res) => {
  // Query database for user. If founds, issue successful token, else, fail
  queryForUserEmail(req.body.email).then(user => {
    // Password verify
    const proposedHash = bcrypt.hashSync(req.body.password, salt);

    if(user.password !== proposedHash) {
      loginFailed(res);
    } else { // Successful login! Create token

      const token = jwt.sign(user, jwtsalt, {
        expiresIn: '1d'
      });

      res.status(200);
      res.json({
        success: true,
        token: token
      });
    }
  }).catch(_ => {
    loginFailed(res);
  });
});

// Authenticated routes

apiRoutes.use((req, res, next) => {
  // Check header or url params or post params for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token) {
    // Verify secret and checks expiry
    jwt.verify(token, jwtsalt, (err, decoded) => {
      if(err) {
        res.status(403);
        return res.json({success: false, message: 'invalid token'});
      } else {
        // Save token to request so it's avialable in other routes
        req.token = token;
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

apiRoutes.get('/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(db.get('1')));
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
