'use strict';

var
  growler = require('growler')
;

module.exports = function(applicationOptions) {

  applicationOptions = applicationOptions || {};

  var growl = new growler.GrowlApplication('Gulp', applicationOptions);

  growl.setNotifications({
    Gulp: {}
  });

  function notify(notificationOptions, callback) {

    growl.register(function(success, err) {
      if (!success) {
        throw callback(err);
      }

      notificationOptions.text = notificationOptions.message;
      delete notificationOptions.message;

      growl.sendNotification('Gulp', notificationOptions, function(success, err) {
        return callback(err, success);
      });

    });

  }

  return notify;

};
