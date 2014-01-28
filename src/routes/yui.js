/*
 * GET Yui3 Loader Configuration
 */
var path = require('path');

exports.config = function(req, res) {
    res.send('YUI Config Here');
};

exports.module = function(req, res) {
    var moduleName = req.params.module,
        modulePath = path.join(__dirname, '../yui', moduleName),
        moduleScript = path.join(modulePath, moduleName + '.js'),
        moduleData = path.join(modulePath, moduleName + '.json');
        
    var moduleContents = 'Hello, World',
        moduleConfig = {
            requires: ['base', 'node']
        };

    res.type("text/javascript");
    res.render('yui/module', {
        name: moduleName,
        version: "1.0.0",
        contents: moduleContents,
        config: moduleConfig
    });
};
