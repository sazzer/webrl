var should = require('should'),
    Q = require('q'),
    path = require('path'),
    YUI = require('../main/yui');

require('mocha-as-promised')();

describe('YUI', function() {
    var modulesPath = path.join(__dirname, '../spec_resources/yui'),
        yui = YUI.new(modulesPath);

    describe('#config()', function() {
        var config = yui.config();

        it('should return a promise for the config', function() {
            should.exist(config);
            config.should.have.property('then');
        });
        it('should successfully resolve', function() {
            return config;
        });
        it('should contain be an object', function() {
            return config.then(function(config) {
                config.should.be.an.Object;
            });
        });
        it('should contain modules called "a" and "b"', function() {
            return config.then(function(config) {
                config.should.have.keys('a', 'b');
            });
        });
        it('should contain a dependency of "app" for the module called "a"', function() {
            return config.then(function(config) {
                config['a'].should.have.property('requires')
                    .and.be.an.Array
                    .and.containEql('app')
                    .and.have.length(1);
            });
        });
        it('should contain languages of "en" and "de" for the module called "a"', function() {
            return config.then(function(config) {
                config['a'].should.have.property('lang')
                    .and.be.an.Array
                    .and.containEql('en')
                    .and.containEql('de')
                    .and.have.length(2);
            });
        });
        it('should contain strings for "root", "en" and "de" for the module called "a"', function() {
            return config.then(function(config) {
                config['a'].should.have.property('strings')
                    .and.be.an.Object
                    .and.have.properties('root', 'en', 'de')
            });
        });
        it('should contain dependencies of "a" and "view" for the module called "b"', function() {
            return config.then(function(config) {
                config['b'].should.have.property('requires')
                    .and.be.an.Array
                    .and.containEql('a')
                    .and.containEql('view')
                    .and.have.length(2);
            });
        });
        it('should contain no languages for the module called "b"', function() {
            return config.then(function(config) {
                config['b'].should.not.have.property('lang');
            });
        });
    });
    describe('#module', function() {
        describe('("a")', function() {
            var module = yui.module('a');
            it('should return a promise for the module', function() {
                should.exist(module);
                module.should.have.property('then');
            });
            it('should successfully resolve', function() {
                return module;
            });
            it('should have a name of "a"', function() {
                return module.then(function(module) {
                    module.should.have.property('name', 'a');
                });
            });
            it('should have a version of "1.0.0"', function() {
                return module.then(function(module) {
                    module.should.have.property('version', '1.0.0');
                });
            });
            it('should have dependencies of "app"', function() {
                return module.then(function(module) {
                    module.config.should.have.property('requires')
                        .and.be.an.Array
                        .and.containEql('app')
                        .and.have.length(1);
                });
            });
            it('should have the correct contents', function() {
                return module.then(function(module) {
                    module.should.have.property('contents');
                    module.contents.toString().should.eql('This is file A\n'); 
                });
            });
        });
        describe('("b")', function() {
            var module = yui.module('b');
            it('should return a promise for the module', function() {
                should.exist(module);
                module.should.have.property('then');
            });
            it('should successfully resolve', function() {
                return module;
            });
            it('should have a name of "b"', function() {
                return module.then(function(module) {
                    module.should.have.property('name', 'b');
                });
            });
            it('should have a version of "1.0.0"', function() {
                return module.then(function(module) {
                    module.should.have.property('version', '1.0.0');
                });
            });
            it('should have dependencies of "a" and "view"', function() {
                return module.then(function(module) {
                    module.config.should.have.property('requires')
                        .and.be.an.Array
                        .and.containEql('a')
                        .and.containEql('view')
                        .and.have.length(2);
                });
            });
            it('should have the correct contents', function() {
                return module.then(function(module) {
                    module.should.have.property('contents');
                    module.contents.toString().should.eql('This is file B\n'); 
                });
            });
        });
        describe('("c")', function() {
            var module = yui.module('c');
            it('should return a promise for the module', function() {
                should.exist(module);
                module.should.have.property('then');
            });
            it('should fail to resolve', function() {
                return module.then(function() {
                    throw Error('The module was resolved!');
                }, function() {
                    // Success
                });;
            });
        });
    });
});
