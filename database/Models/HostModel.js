const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

// host is not currently used, kept in app to be used in future features (e.g. authentication)
const HostSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Host = mongoose.model('Host', HostSchema);

HostSchema.pre('save', (next) => {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

module.exports = Host;
