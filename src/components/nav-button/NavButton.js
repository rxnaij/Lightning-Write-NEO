"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var NavButton = function (props) {
    var validated = props.values.every(function (value) { return value === true; });
    return (react_1["default"].createElement(react_router_dom_1.Link, { className: "button" + (!(validated)
            ? "--disabled"
            : "") + " \n                align-end", to: "" + (validated ? "/writing" : ""), onClick: function (event) {
            !(validated) && event.preventDefault();
        } }, "Start writing"));
};
exports["default"] = NavButton;
