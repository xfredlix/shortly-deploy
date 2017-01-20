var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/testttttttt');

var urlsSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestaps: {type: Date, default: Date.now}
});

urlsSchema.post('init', function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
});

urlsSchema.post('validate', function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
});

var Urls = mongoose.model('urls', urlsSchema);

var usersSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: String,
  timestaps: {type: Date, default: Date.now}
});

usersSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

usersSchema.post('init', function () {
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
});

var Users = mongoose.model('users', usersSchema);

module.exports.url = Urls;
module.exports.user = Users;
module.exports.urls = urlsSchema;
module.exports.users = usersSchema;
