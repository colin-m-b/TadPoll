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
      let pos = Math.floor(Math.random() * this.state.codeBuilder.length)
      pollCode += this.state.codeBuilder[pos]
    }
  const poll = new Poll({
    hostOwner: req.body.userName,
    _id: pollCode,
    questions: req.body.questions,
    created_at: Date.now()
  });
  poll.save = function(err) {
    if (err) return console.error('Error! ' + err);
    res.send(poll._id);
  };
};

dbMethods.returnPollInstance = function(req, res) {
  Poll.findOne({_id: req.params.id}, (err, foundPoll) => {
    if (err) res.send(err)
    if (!foundPoll) res.send('poll not found');
    else res.send(foundPoll);
  });
};

dbMethods.updatePollInstance = function(req, res) {
  const id = req.params.id;
  Poll.fidByIdandUpdate({_id: id}, {accessCode: req.body.accessCode, questions: req.body.questions}, {new: true}, (err, newPoll) => {
    res.send(newPoll)
  });
};

dbMethods.deletePollInstance = function(req, res) {
  const id = req.params.id;
  Poll.findByIdAndRemove(id, (err, deletedPoll) => {
    if (err) res.send(err);
    else res.send(true)
  });
};



mongoose.connect('mongodb://localhost:27017/tadpoll');

module.exports = dbMethods;
