/*
 * GET Yui3 Loader Configuration
 */

var YUI = require('../main/yui'),
    path = require('path'),
    modulesPath = path.join(__dirname, '../yui'),
    yui = YUI.new(modulesPath);

exports.config = function(req, res) {
    yui.config().then(function(modules) {
        res.type('text/javascript');
        res.render('yui/config', {
            group: 'webrl',
            modules: modules
        });
    }, function(error) {
        console.log(error);
        res.send(404, "Failed to load module: " + moduleName);
    });
};

exports.module = function(req, res) {
    yui.module(req.params.module).then(function(module) {
        res.type('text/javascript');
        res.render('yui/module', module);
    }, function(error) {
        console.log(error);
        res.send(404, "Failed to load module: " + moduleName);
    });
};
