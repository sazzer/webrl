Y.namespace("WebRL").App = Y.Base.create("webrl-app", Y.Base, [
        // Extensions
    ], {
        // Prototype
        initializer: function() {
            var strings = this.get("strings"),
                title = strings.title,
                body = Y.one("body");
            Y.log("Initializing the application: " + title);
            document.title = title;

            this._mainView = new Y.WebRL.MainView({
                boundingBox: body
            }).render();
        }
    }, {
        // Statics
        ATTRS: {
            strings: {
                value: Y.Intl.get("webrl-app")
            }
        }
});
