/*
 * GET Yui3 Loader Configuration
 */
var fs = require('fs'),
    util = require('util'),
    Q = require('q'),
    path = require('path');

exports.config = function(req, res) {
    var modulesPath = path.join(__dirname, '../yui');

    console.log("Loading from " + modulesPath);
    Q.nfcall(fs.readdir, modulesPath)
        .then(function(modules) {
            return Q.all(modules.map(function(module) {
                var moduleData = path.join(modulesPath, module, module + ".json");

                return Q.nfcall(fs.readFile, moduleData)
                    .then(JSON.parse)
                    .then(function(config) {
                        config.name = module;
                        return config;
                    });
            }));
        }).then(function(modules) {
            var config = {};
            modules.forEach(function(module) {
                config[module.name] = module;
            });
            return config;
        }).then(function(modules) {
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
    var moduleName = req.params.module,
        modulePath = path.join(__dirname, '../yui', moduleName),
        moduleScript = path.join(modulePath, moduleName + '.js'),
        moduleData = path.join(modulePath, moduleName + '.json');
        
    Q.all([
        Q.nfcall(fs.readFile, moduleScript),
        Q.nfcall(fs.readFile, moduleData)
            .then(JSON.parse)
    ]).spread(function(moduleContents, moduleConfig) {
        res.type('text/javascript');
        res.render('yui/module', {
            name: moduleName,
            version: '1.0.0',
            contents: moduleContents,
            config: moduleConfig
        });
    }, function(error) {
        console.log(error);
        res.send(404, "Failed to load module: " + moduleName);
    });
};
