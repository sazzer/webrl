
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render("index", {
        title: "Web RL",
        yui: "http://yui.yahooapis.com/3.14.1/build/yui/yui-min.js"
    });
};

