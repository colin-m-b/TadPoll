const mongoose = require('mongoose');
mongoose.connect('mongo://localhost:3000/test')
const db = mongoose.connection;
const Host = require('../database/Models/HostModel');
const Poll = require('../database/Models/PollModel');
// verifying
db.on('error', console.error);
db.once('open', () => {
  console.log('Mongodb connected');
});

const dbMethods = {};


// Mongodb CRUD Operation for HOSTS
dbMethods.createNewHost = (hostData) => {
  const hostTemp = new Host(hostData);
  hostTemp.save((err, hostData) => {
    if (err) return console.error('Error! ' + err);
    console.dir('saved!');
  });
};


dbMethods.verifyHost = (host) => {

    // fetch user and test password verification
    Host.findOne({ username: host.name }, 'password', (err, user) => {
        if (err) throw err;

        // test a matching password
        user.comparePassword(user.password, (err, isMatch) => {
            if (err) throw err;
            res.send(isMatch);
        });
    });
  }

// Mongodb CRUD Operations for POLLS

dbMethods.createPollInstance = (pollToSave, next) => {
  const poll = new Poll(pollToSave);
  poll.save = (err) => {
    if (err) return console.error('Error! ' + err);
    console.dir('saved!');
  };
  next();
};

dbMethods.returnPollInstance = (pollToReturn, next) => {
  Poll.findOne({id: pollToReturn._id}, (err, foundPoll) => {
    if (err) res.send(err)
    if (!foundPoll) res.send('poll not found');
    else res.send(foundPoll);
  });
  next();
};

dbMethods.updatePollInstance = (pollToUpdate, next) => {
  Poll.fidByIdandUpdate(id, {accessCode: pollToUpdate.accessCode, questions: pollToUpdate.questions}, {new: true}, (err, newPoll) => {
    res.send(newPoll)
  });
  next();
};

dbMethods.deletePollInstance = (pollToDelete, next) => {
  Poll.findByIdAndRemove(pollToDelete._id, (err, deledtedPoll) => {
    console.log('removed ' + deledtedPoll._id);
  });
  next();
};



mongoose.connect('mongodb://localhost/tadpoll');

module.exports = dbMethods;
