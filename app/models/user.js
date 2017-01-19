var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = new db.user;


User.save( (err) => {
  if (err) {
    return handleError(err);
  }
});

module.exports = User;
