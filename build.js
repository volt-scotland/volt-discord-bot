var nodesass = require("node-sass");
var path = require("path");
var fs = require("fs");

var result = nodesass.renderSync({
    file: path.join(__dirname, "src", "style.scss"),
    importer: require("node-sass-package-importer")()
});

var css = result.css.toString().replace("../webfonts", "/webfonts");

fs.writeFileSync(path.join(__dirname, "public", "stylesheets", "style.css"), css);

return new Promise((res, error) => {
    require("ncp").ncp(path.join(__dirname, "node_modules", "@fortawesome", "fontawesome-free", "webfonts"), path.join(__dirname, "public", "webfonts"), err => {
        if (err) {
            console.error(err);
            error(err);
        } else res(true);
    });
});