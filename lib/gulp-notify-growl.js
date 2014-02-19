'use strict';

var
  fs      = require('fs'),
  util    = require('util'),
  notify  = require('gulp-notify'),
  growler = require('growler')
;

module.exports = function(applicationOptions, appName) {

  if (typeof appName === 'undefined') {
    appName = 'Gulp';
  }

  applicationOptions = util._extend({
    icon: fs.readFileSync(__dirname + '/gulp.png')
  }, applicationOptions || {});

  var app = new growler.GrowlApplication(appName, applicationOptions);

  app.setNotifications({
    Gulp: {}
  });

  var reporter = notify.withReporter(function(notificationOptions, callback) {

    app.register(function(success, err) {
      if (!success) {
        return callback(err);
      }

      // Rename 'message' property to 'text'
      notificationOptions.text = notificationOptions.message;
      delete notificationOptions.message;

      app.sendNotification('Gulp', notificationOptions, function(success, err) {
        return callback(err, success);
      });

    });

  });

  reporter.app = app;

  return reporter;

};
