const express = require('express');
const path = require('path');
const app = express();
const dbMethods = require('../database/databaseMethods');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.config');
const socket = require ('socket.io')
const fs = require('fs')


// app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({extended: true}))

// app.get('/', (req, res) => {
//   const index = fs.readFileSync('./public/index.html')
//   res.writeHead(200, {"Content-Type": "text/html"})
//   res.end(index)
// })


app.post('/createHost', dbMethods.createHost)

app.post('/verifyHost', dbMethods.verifyHost)

app.post('/savePoll', dbMethods.savePoll);

app.get('/getPollByUser', dbMethods.getPollByUser)

app.get('/getPoll', dbMethods.getPollByCode);

app.put('/updateOldPoll', dbMethods.updatePoll);

app.post('/deletePoll/:id',  dbMethods.deletePollInstance);

app.get('*',function (req, res) {
        res.redirect('/');
    });

app.listen(8080, () => {
  console.log(__dirname, 'Server is listening on port 8080');
});

//this starts the webpack-dev-server instead of having to start it manually.
// new WebpackDevServer(webpack(config), {
//   publicPath: config.output.publicPath,
//   hot: true,
//   noInfo: true,
// }).listen(8080, 'localhost', (err, result) => {
//   if (err) {
//     console.log(err)
//   }
//   console.log('running webpack')
// })
