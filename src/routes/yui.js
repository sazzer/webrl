/*
 * GET Yui3 Loader Configuration
 */
var fs = require('fs'),
    Q = require('q'),
    path = require('path');

exports.config = function(req, res) {
    var modules = {
        'webrl-app': {
            requires: [
                'app',
                'webrl-main-view'
            ],
            lang: ['en']
        },
        'webrl-main-view': {
            requires: [
                'view'
            ],
            lang: ['en']
        }
    };
    res.render('yui/config', {
        group: 'webrl',
        modules: modules
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
