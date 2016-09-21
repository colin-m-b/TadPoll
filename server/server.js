const express = require('express');
const path = require('path');
const app = express();
const dbMethods = require('../database/databaseMethods');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');

app.use(express.static(path.join(__dirname, './../')));
app.use(bodyParser, {extendedurl: true})


app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
app.post('/', (req, res) => {
  console.log('its working yandri!');
});

app.post('/createPoll', (req, res, next) => {
  dbMethods.createPollInstance(req.body, next)
});

app.get('/getPoll', (req, res, next) => {
  dbMethods.returnPollInstance(req.body, next)
});

app.post('/updatePoll', (req, res, next) => {
  dbMethods.updatePollInstance(req.body, next)
});

app.post('/deletePoll', (req, res, next) => {
  dbMethods.deletePollInstance(req.body, next)
});
//this starts the webpack-dev-server instead of having to start it manually.
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
}).listen(8080, 'localhost', (err, result) => {
  if (err) {
    console.log(err)
  }
  console.log('running webpack')
})
