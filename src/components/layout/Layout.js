"use strict";
exports.__esModule = true;
var React = require("react");
require("./layout.scss");
var Layout = function (_a) {
    var children = _a.children;
    return (React.createElement("div", { className: "layout" },
        children,
        React.createElement("footer", { className: "footer" },
            React.createElement("p", null,
                React.createElement("a", { href: "https://github.com/rxnaij/lightning-write-NEO" }, "github"),
                " \u00B7 made with <3 by ",
                React.createElement("a", { href: "https://github.com/rxnaij" }, "@rxnaij"),
                "  \u00A9 2020"))));
};
exports["default"] = Layout;
