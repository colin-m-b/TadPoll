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

dbMethods.savePollInstance = (pollToSave) => {
  const poll = new Poll(pollToSave);
  poll.save = (err) => {
    if (err) return console.error('Error! ' + err);
    console.dir('saved!');
  };
}

dbMethods.deletePollInstance = (pollToDelete) => {
  Poll.findByIdAndRemove(pollToDelete._id, (err, deledtedPoll) => {
    console.log('removed ' + deledtedPoll._id);
  });
};

mongoose.connect('mongodb://localhost/tadpoll');

module.exports = dbMethods;
