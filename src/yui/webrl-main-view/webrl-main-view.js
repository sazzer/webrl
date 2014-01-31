Y.namespace("WebRL").MainView = Y.Base.create("webrl-main-view", Y.WebRL.TemplatedView, [
        // Extensions
    ], {
        // Prototype
        template: "<span>{{strings.title}}</span>"
    }, {
        // Statics
        ATTRS: {
            strings: {
                value: Y.Intl.get("webrl-main-view")
            }
        }
});
