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
        console.log(modules);
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

exports.lang = function(req, res) {
    var moduleName = req.params[0],
        lang = req.params[1];
    console.log("Getting strings for module " + moduleName + " in language " + lang);
    yui.module(moduleName).then(function(module) {
        var strings = module.config.strings;
        if (strings) {
            var rootStrings = strings.root || {},
                langStrings = strings[lang] || {},
                merged = {};

            Object.keys(rootStrings).forEach(function(k) {
                merged[k] = rootStrings[k];
            });
            Object.keys(langStrings).forEach(function(k) {
                merged[k] = langStrings[k];
            });
            res.type('text/javascript');
            res.render('yui/lang', {
                name: moduleName, 
                language: lang, 
                lang: merged
            });
        } else {
            console.log("No strings available for module " + moduleName);
            res.send(404, "No strings available for module " + moduleName);
        }
    }, function(error) {
        console.log(error);
        res.send(404, "Failed to load module: " + moduleName);
    });
};
