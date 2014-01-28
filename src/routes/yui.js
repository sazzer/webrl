/*
 * GET Yui3 Loader Configuration
 */
var fs = require('fs'),
    path = require('path');

exports.config = function(req, res) {
    res.send('YUI Config Here');
};

exports.module = function(req, res) {
    var moduleName = req.params.module,
        modulePath = path.join(__dirname, '../yui', moduleName),
        moduleScript = path.join(modulePath, moduleName + '.js'),
        moduleData = path.join(modulePath, moduleName + '.json');
        
    var moduleConfig = {
            requires: ['base', 'node']
        };

    fs.readFile(moduleScript, function(error, moduleContents) {
        if (error) {
            res.send(404, 'Script file for module ' + moduleName + ' could not be loaded');
        } else {
            fs.readFile(moduleData, function(error, moduleConfig) {
                if (error) {
                    res.send(404, 'Config file for module ' + moduleName + ' could not be loaded');
                } else {
                    res.type('text/javascript');
                    res.render('yui/module', {
                        name: moduleName,
                        version: '1.0.0',
                        contents: moduleContents,
                        config: JSON.parse(moduleConfig)
                    });
                }
            });
        }
    });
};
