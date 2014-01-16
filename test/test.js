'use strict';

var
  fs      = require('fs'),
  net     = require('net'),
  chai    = require('chai'),
  expect  = chai.expect,
  growler = require('growler'),
  growl   = require('./../lib/gulp-notify-growl'),
  registerResponse = [
    'GNTP/1.0 -OK NONE',
    'Response-Action: REGISTER',
    'Origin-Machine-Name: V151',
    'Origin-Software-Name: Snarl',
    'Origin-Software-Version: 3.1 (45.18)',
    'Origin-Platform-Name: Windows 6.1.7601 Service Pack 1',
    'Origin-Platform-Version: 6.1.7601',
    'X-Message-Daemon: Snarl',
    'X-Timestamp: 01/16/2014 04:07:32'
  ],
  notificationResponse = [
    'GNTP/1.0 -OK NONE',
    'Response-Action: NOTIFY',
    'Origin-Machine-Name: V151',
    'Origin-Software-Name: Snarl',
    'Origin-Software-Version: 3.1 (45.18)',
    'Origin-Platform-Name: Windows 6.1.7601 Service Pack 1',
    'Origin-Platform-Version: 6.1.7601',
    'X-Message-Daemon: Snarl',
    'X-Timestamp: 01/16/2014 04:07:32'
  ]
;

describe('constructor', function() {

  describe('without options', function() {

    var
      growlNotifier = growl(),
      defaultIcon   = fs.readFileSync(__dirname + '/../lib/gulp.png').toString('base64')
    ;

    it('must create a growlNotifier', function() {
      expect(growlNotifier).to.be.a('function');
      expect(growlNotifier.app).to.be.an.instanceof(growler.GrowlApplication);
      expect(growlNotifier.app.name).to.equal('Gulp');
    });

    it('must use default options', function() {
      expect(growlNotifier.app.options).to.be.an('object');
      expect(growlNotifier.app.options.hostname).to.equal('localhost');
      expect(growlNotifier.app.options.port).to.equal(23053);
      expect(growlNotifier.app.options.timeout).to.equal(5000);
      expect(growlNotifier.app.options.icon.toString('base64')).to.equal(defaultIcon);
      expect(growlNotifier.app.options.additionalHeaders).to.deep.equal({});
    });

  });

  describe('with options', function() {

    var
      growlNotifier = growl({
        hostname         : '192.168.0.10',
        port             : 25023,
        timeout          : 10000,
        icon             : fs.readFileSync(__dirname + '/doge.png').toString('base64'),
        additionalHeaders: {
          'X-Foo': 'bar'
        },
        password         : 'test',
        hashAlgorithm    : 'SHA512',
        encryption       : 'AES'
      }),
      testIcon   = fs.readFileSync(__dirname + '/doge.png').toString('base64')
    ;

    it('must create a growlNotifier', function() {
      expect(growlNotifier).to.be.a('function');
      expect(growlNotifier.app).to.be.an.instanceof(growler.GrowlApplication);
      expect(growlNotifier.app.name).to.equal('Gulp');
    });

    it('must use user options', function() {
      expect(growlNotifier.app.options).to.be.an('object');
      expect(growlNotifier.app.options.hostname).to.equal('192.168.0.10');
      expect(growlNotifier.app.options.port).to.equal(25023);
      expect(growlNotifier.app.options.timeout).to.equal(10000);
      expect(growlNotifier.app.options.icon.toString('base64')).to.equal(testIcon);
      expect(growlNotifier.app.options.additionalHeaders).to.deep.equal({
        'X-Foo': 'bar'
      });
      expect(growlNotifier.app.options.password).to.equal('test');
      expect(growlNotifier.app.options.hashAlgorithm).to.equal('SHA512');
      expect(growlNotifier.app.options.encryption).to.equal('AES');
    });

  });

});

describe('notifier', function() {

  // Fake growl client
  net.createServer(function(socket) {
    socket.setEncoding('utf8');
    socket.once('data', function(data) {
      var infoLine = data.split('\r\n');
      if (infoLine[0] === 'GNTP/1.0 REGISTER NONE') {
        socket.write(registerResponse.join('\r\n'));
        socket.end();
      } else if (infoLine[0] === 'GNTP/1.0 NOTIFY NONE') {
        socket.end(notificationResponse.join('\r\n'));
      }
    });
  }).listen(25023);

  var
    growlNotifier = growl({
      port: 25023
    })
  ;

  it('must send a notification', function(done) {

    growlNotifier.app.on('request', function(content) {
      expect(content).to.be.a('string');
      if (/GNTP\/1\.0 NOTIFY NONE/.test(content)) {
        expect(content).to.match(/Notification-Title: Test title/);
        expect(content).to.match(/Notification-Text: Test message/);
      }
    });

    growlNotifier({
      title: 'Test title',
      message: 'Test message'
    }, function(err, success) {
      expect(err).to.equal(undefined);
      expect(success).to.equal(true);
      done();
    });

  });

});
