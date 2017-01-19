var db = require('../config');
var crypto = require('crypto');

var Link = db.url;

// Link.save( (err) => {
//   if (err) {
//     return handleError(err);
//   }
// });

module.exports = Link;
