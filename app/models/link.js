var db = require('../config');
var crypto = require('crypto');

var Link = new db.url;

Link.save( (err) => {
  if (err) {
    return handleError(err);
  }
});

module.exports = Link;
