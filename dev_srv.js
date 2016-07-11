const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./config/webpack.dev');

const app = express();
const compiler = webpack(config);
const port = process.env.PORT || 3000;

const dns = require('./mock_data/dns.json');
const users = require('./mock_data/users.json');

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get('/api/v1/dns', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(dns));
});

app.get('/api/v1/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(users));
});

app.listen(port, 'localhost', err => {
  if(err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://localhost:${port}`);
});
