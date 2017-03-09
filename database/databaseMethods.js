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
//DB Atlas pw: J@ckandjake123

//mongodb://Colin:<PASSWORD>@m123-rs1-shard-00-00-xb5dt.mongodb.net:27017,m123-rs1-shard-00-01-xb5dt.mongodb.net:27017,m123-rs1-shard-00-02-xb5dt.mongodb.net:27017/<DATABASE>?ssl=true&replicaSet=m123-rs1-shard-0&authSource=admin

//initialize methods object\
const dbMethods = {};

dbMethods.createHost = (req, res) => {
  const host = new Host(req.body);
  host.save((err, hostData) => {
    if (err) return console.error('Error! ' + err);
    res.send(true);
  });
};

dbMethods.verifyHost = function(req, res) {
  Host.findOne({ userName: req.body.userName }, 'password', (err, user) => {
      if (err) throw err;
      if (user) {
      bcrypt.compare(req.body.password, user.password, (err, match) => {
          if (err) throw err;
          res.send(match);
      });
      }
      else res.send(false)
  });
}

// Mongodb CRUD Operations for POLLS

dbMethods.generatePollCode = function() {
    const pollStr = "abcdefghijklmnopqrstuvwxyz0123456789"
    let pollCode = ''
    for (let i = 0; i < 4; i++) {
      let pos = Math.floor(Math.random() * pollStr.length)
      pollCode += pollStr[pos]
    }
    return pollCode
}

dbMethods.makeNewPoll = function(req, res) {

    const pollCode = dbMethods.generatePollCode()

    const poll = new Poll({
    _id: pollCode,
    host: req.body.host,
    title: req.body.title,
    questions: req.body.questions,
    open: req.body.open,
    created_at: Date.now()
  });
  return poll
}

dbMethods.savePoll= function(req, res) {

  const poll = dbMethods.makeNewPoll(req, res)

  poll.save(function(err, pollData) {
    if (err) return console.error('Error! ' + err);
    res.send({
      code: poll._id,
      open: poll.open
    });
  });
};

dbMethods.getPollByUser = function(req, res) {
  Poll.find({host: req.query.host}, {_id: 1, title: 1}, function(err, data) {
    if (err) res.send(err)
    if (!data) res.send(false)
    else res.send(data)
  })
}

dbMethods.getPollByCode = function(req, res) {
  console.log('getPollByCode firing')
  Poll.find({_id: req.query._id}, {_id: 1, title: 1, questions: 1, open: 1}, function(err, data) {
    if (err) res.send(err)
    if (!data) res.send(false)
    if (!data.open) res.send('closed')
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
