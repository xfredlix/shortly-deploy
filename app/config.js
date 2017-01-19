var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
// var db = require('bookshelf')(knex);


// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://localhost/my_database');

var urlsSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestaps: {type: Date, default: Date.now}
}, {collection: 'url'});
var Urls = mongoose.model('urls', urlsSchema);

var usersSchema = new Schema({
  username: String,
  password: String,
  timestaps: {type: Date, default: Date.now}
});
var Users = mongoose.model('users', usersSchema);

console.log('Users', usersSchema);
console.log('URLS', urlsSchema);
// console.log(mongoDB);
module.exports.url = Urls;
module.exports.user = Users;
module.exports.urls = urlsSchema;
module.exports.users = usersSchema;
