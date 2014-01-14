'use strict';

var
  fs      = require('fs'),
  util    = require('util'),
  growler = require('growler')
;

module.exports = function(applicationOptions) {

  applicationOptions = util._extend({
    icon: fs.readFileSync(__dirname + '/gulp.png')
  }, applicationOptions || {});

  var growl = new growler.GrowlApplication('Gulp', applicationOptions);

  growl.setNotifications({
    Gulp: {}
  });

  function notify(notificationOptions, callback) {

    growl.register(function(success, err) {
      if (!success) {
        throw callback(err);
      }

      // Rename 'message' property to 'text'
      notificationOptions.text = notificationOptions.message;
      delete notificationOptions.message;

      growl.sendNotification('Gulp', notificationOptions, function(success, err) {
        return callback(err, success);
      });

    });

  }

  return notify;

};
