Y.namespace("WebRL").App = Y.Base.create("webrl-app", Y.Base, [
        // Extensions
    ], {
        // Prototype
        initializer: function() {
            var strings = this.get("strings"),
                title = strings.title;
            Y.log("Initializing the application: " + title);
            document.title = title;
        }
    }, {
        // Statics
        ATTRS: {
            strings: {
                value: Y.Intl.get("webrl-app")
            }
        }
});
