var db = require('../config');
var crypto = require('crypto');

var Link = new db.url({
  tableName: 'urls',
  hasTimestamps: true,
  defaults: {
    visits: 0
  },
  initialize: function() {
    this.on('creating', function(model, attrs, options) {
      var shasum = crypto.createHash('sha1');
      shasum.update(model.get('url'));
      model.set('code', shasum.digest('hex').slice(0, 5));
    });
  },
  remove: function() {
    console.log('I am inside of Links.remove()');
  }
});

Link.save( (err) => {
  if (err) {
    return handleError(err);
  }
});
module.exports = Link;
