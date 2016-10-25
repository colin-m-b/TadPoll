const mongoose = require('mongoose');
//mongoose.createConnection('mongodb://localhost:3000/test')
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

dbMethods.createHost = (hostData) => {
  const hostTemp = new Host(hostData);
  hostTemp.save((err, hostData) => {
    if (err) return console.error('Error! ' + err);
    console.dir('saved!');
  });
};


dbMethods.verifyHost = (req, res) => {
  // fetch user and test password verification
  Host.findOne({ username: req.body.userName }, 'password', (err, user) => {
      if (err) throw err;
      // test a matching password
      user.comparePassword(req.body.password, (err, isMatch) => {
          if (err) throw err;
          res.send(isMatch);
      });
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



mongoose.connect('mongodb://localhost/tadpoll');

module.exports = dbMethods;
