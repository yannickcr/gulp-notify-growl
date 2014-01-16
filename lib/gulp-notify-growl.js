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

  var app = new growler.GrowlApplication('Gulp', applicationOptions);

  app.setNotifications({
    Gulp: {}
  });

  function notify(notificationOptions, callback) {

    app.register(function(success, err) {
      if (!success) {
        throw callback(err);
      }

      // Rename 'message' property to 'text'
      notificationOptions.text = notificationOptions.message;
      delete notificationOptions.message;

      app.sendNotification('Gulp', notificationOptions, function(success, err) {
        return callback(err, success);
      });

    });

  }

  notify.app = app;

  return notify;

};
