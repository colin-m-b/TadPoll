const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

// host is not currently used, kept in app to be used in future features (e.g. authentication)
const HostSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Host = mongoose.model('Host', HostSchema);



// HostSchema.pre('save', (next) => {
//   const user = this;
//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();
//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//     if (err) return next(err);
//     // hash the password along with our new salt
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) return next(err);
//       // override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//     });
//   });
// });

HostSchema.methods.comparePassword = (candidatePassword, cb) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// const host1 = new Host({username: "Alison", password: "password"})
// const host2 = new Host({username: "Yandri", password: "something"})
//
//
// host2.save(function(err, user) {
//   if (err) console.log(err)
//   console.log(user)
// })

Host.findOne({username: "Yandri"}, function(err, user) {
  if (err) console.log(err)
  if(user) console.log(user)
  else console.log("no user")
})


module.exports = Host;
