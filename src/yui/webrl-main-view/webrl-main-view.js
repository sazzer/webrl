Y.namespace("WebRL").MainView = Y.Base.create("webrl-main-view", Y.WebRL.TemplatedView, [
        // Extensions
    ], {
        // Prototype
        template: [
            "<div class='main-view'>",
                "<div class='map'></div>",
                "<div class='sidebar'></div>",
                "<div class='messages'></div>",
                "<div class='statusbar'></div>",
            "</div>"].join("")
    }, {
        // Statics
        ATTRS: {
        }
});
