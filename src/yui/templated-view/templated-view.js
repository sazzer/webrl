Y.namespace("WebRL").TemplatedView = Y.Base.create("webrl-main-view", Y.View, [
        // Extensions
    ], {
        // Prototype
        template: "<div></div>",

        render: function() {
            var container = this.get("container"),
                html = this.template;

            container.setHTML(html);
            if (!container.inDoc()) {
                this.get("boundingBox").append(container);
            }
            return this;
        }
    }, {
        // Statics
        ATTRS: {
            boundingBox: {}
        }
});

