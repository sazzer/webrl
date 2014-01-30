var fs = require('fs'),
    util = require('util'),
    Q = require('q'),
    path = require('path')
    Base = require('selfish').Base;

module.exports = Base.extend({
    /**
     * Initialize the object
     * @param base {Path} The base for the YUI Modules
     */
    initialize: function(base) {
        this._base = base;
        this._config = this._generateConfig(base);
    },
    /**
     * Get the YUI Configuration that we've generated
     * @return {Q} A Promise of the YUI Configuration to use
     */
    config: function() {
        return this._config;
    },
    /**
     * Get the actual module configuration for the module with the given name
     * @param moduleName {String} the name of the module to get
     * @return {Q} A Promise of the module details to use
     */
    module: function(moduleName) {
        var modulePath = path.join(this._base, moduleName),
            moduleScript = path.join(modulePath, moduleName + '.js'),
            moduleData = path.join(modulePath, moduleName + '.json');
        return Q.all([
            Q.nfcall(fs.readFile, moduleScript),
            Q.nfcall(fs.readFile, moduleData)
                .then(JSON.parse)
        ]).spread(function(moduleContents, moduleConfig) {
            return {
                name: moduleName,
                version: '1.0.0',
                contents: moduleContents,
                config: moduleConfig
            };
        });
    },
    /**
     * Generate the YUI Configuration
     * @param modulesPath {Path} The base path to the YUI modules
     * @return {Q} A Promise of the YUI Configuration to use
     */
    _generateConfig: function(modulesPath) {
        console.log("Loading YUI Modules from: " + modulesPath);
        return Q.nfcall(fs.readdir, modulesPath)
            .then(function(modules) {
                return Q.all(modules.map(function(module) {
                    console.log("Loading module: " + module);
                    var moduleData = path.join(modulesPath, module, module + ".json");

                    return Q.nfcall(fs.readFile, moduleData)
                        .then(JSON.parse)
                        .then(function(config) {
                            if (config.strings) {
                                config.lang = Object.keys(config.strings).filter(function(v) {
                                    return v != "root";
                                });
                            }
                            return config;
                        })
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
            });
    }
});

