const mongoose = require('mongoose');
const db = mongoose.connection;
const Host = require('../database/Models/HostModel');
const Poll = require('../database/Models/PollModel');
const bcrypt = require('bcrypt')
// verifying
db.on('error', console.error);
db.once('open', () => {
  console.log('Mongodb connected');
});

const dbMethods = {};

dbMethods.createHost = (req, res) => {
  const host = new Host(req.body);
  host.save((err, hostData) => {
    if (err) return console.error('Error! ' + err);
    res.send('saved!');
  });
};


dbMethods.verifyHost = function(req, res) {
  console.log('body: ' + req.body.userName)
  // fetch user and test password verification
  Host.findOne({ userName: req.body.userName }, 'password', (err, user) => {
      if (err) throw err;
      console.log('finding USER' + user)
      // test a matching password
      if (user) {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw err;
          res.send(isMatch);
      });
      }
      else res.send(false)
  });
}

// Mongodb CRUD Operations for POLLS

dbMethods.savePoll= function(req, res) {
  const pollStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let pollCode = ''
    for (let i = 0; i < 4; i++) {
      let pos = Math.floor(Math.random() * pollStr.length)
      pollCode += pollStr[pos]
    }
    console.log(pollCode)
  const poll = new Poll({
    _id: pollCode,
    host: req.body.host,
    title: req.body.title,
    questions: req.body.questions,
    open: req.body.open,
    created_at: Date.now()
  });
  poll.save(function(err, pollData) {
    console.log('saving poll')
    if (err) return console.error('Error! ' + err);
    res.send({
      code: poll._id,
      open: poll.open
    });
  });
};

dbMethods.getPollByUser = function(req, res) {
  console.log('finding by user', req.query.host)
  Poll.find({host: req.query.host}, {_id: 1, title: 1}, function(err, data) {
    if (err) res.send(err)
    if (!data) res.send(false)
    else res.send(data)
  })
}

dbMethods.getPollByCode = function(req, res) {
  Poll.find({_id: req.query._id}, {_id: 1, title: 1, questions: 1, open: 1}, function(err, data) {
    if (err) res.send(err)
    if (!data) res.send(false)
    else res.send(data)
  })
}

dbMethods.returnPollInstance = function(req, res) {
  Poll.findOne({_id: req.params.id}, (err, foundPoll) => {
    if (err) res.send(err)
    if (!foundPoll) res.send(false);
    else res.send(foundPoll);
  });
};

dbMethods.updatePoll = function(req, res) {
  console.log('firing update')
  const id = req.body._id;
  Poll.findByIdAndUpdate({_id: id}, req.body, {new: true}, (err, updatedPoll) => {
    if (err) console.log('err! ' + err)
    console.log(updatedPoll.questions)
    res.send(updatedPoll.open)
  });
};

dbMethods.deletePollInstance = function(req, res) {
  const id = req.body._id;
  Poll.findByIdAndRemove(id, (err, deletedPoll) => {
    if (err) res.send(err);
    else res.send(true)
  });
};

mongoose.connect('mongodb://localhost:27017/tadpoll');

module.exports = dbMethods;
