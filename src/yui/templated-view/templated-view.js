Y.namespace("WebRL").TemplatedView = Y.Base.create("webrl-main-view", Y.View, [
        // Extensions
    ], {
        // Prototype
        template: "<div></div>",

        render: function() {
            var container = this.get("container"),
                model = this.get("model"),
                strings = this.get("strings"),
                html = Y.Handlebars.compile(this.template);

            container.setHTML(html({
                model: model,
                strings: strings
            }));
            if (!container.inDoc()) {
                this.get("boundingBox").append(container);
            }
            return this;
        }
    }, {
        // Statics
        ATTRS: {
            boundingBox: {
            }
        }
});

