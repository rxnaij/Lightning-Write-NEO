"use strict";
/*
 * A specific Button use case for internal links around the app
 * without explicitly being a part of the header navigation.
 *
 */
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("../button/button");
var NavButton = function (props) {
    var isDisabled = !(props.enableConditions && !props.enableConditions.every(function (condition) { return condition; }));
    return (react_1["default"].createElement(react_router_dom_1.Link, { to: props.to, onClick: function (event) {
            isDisabled && event.preventDefault();
        } },
        react_1["default"].createElement(button_1["default"], { state: isDisabled ? 'disabled' : null }, props.children)));
};
exports["default"] = NavButton;
