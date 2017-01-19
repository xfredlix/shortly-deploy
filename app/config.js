var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://198.199.105.231/var/shortly-deploy/db');

var urlsSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestaps: {type: Date, default: Date.now}
});

urlsSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Urls = mongoose.model('urls', urlsSchema);

var usersSchema = new Schema({
  username: String,
  password: String,
  timestaps: {type: Date, default: Date.now}
});

usersSchema.static.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

usersSchema.pre('save', function (next) {
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

var Users = mongoose.model('users', usersSchema);

// console.log(mongoDB);
module.exports.url = Urls;
module.exports.user = Users;
module.exports.urls = urlsSchema;
module.exports.users = usersSchema;
