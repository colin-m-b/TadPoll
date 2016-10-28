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

dbMethods.createPollInstance = (req, res) => {
  const poll = new Poll({
    hostOwner: pollToSave.userName,
    accessCode: pollToSave.code,
    questions: pollToSave.questions,
    created_at: Date.now()
  });
  poll.save = (err) => {
    if (err) return console.error('Error! ' + err);
    res.send(poll._id);
  };
};

dbMethods.returnPollInstance = (req, res) => {
  Poll.findOne({id: req.params.id}, (err, foundPoll) => {
    if (err) res.send(err)
    if (!foundPoll) res.send('poll not found');
    else res.send(foundPoll);
  });
};

dbMethods.updatePollInstance = (req, res) => {
  const id = req.params.id;
  Poll.fidByIdandUpdate(id, {accessCode: req.body.accessCode, questions: req.body.questions}, {new: true}, (err, newPoll) => {
    res.send(newPoll)
  });
};

dbMethods.deletePollInstance = (req, res) => {
  const id = req.params.id;
  Poll.findByIdAndRemove(id, (err, deletedPoll) => {
    if (err) res.send(err);
    else res.send(true)
  });
};



mongoose.connect('mongodb://localhost:27017/tadpoll');

module.exports = dbMethods;
