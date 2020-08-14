"use strict";
exports.__esModule = true;
var React = require("react");
require("./button.scss");
var Button = function (props) {
    return (React.createElement("button", { className: "\n            button\n            " + (props.disabled ? 'button--disabled' : '') + "\n            " + (props.secondary ? 'button--secondary' : ''), onClick: props.onClick }, props.children));
};
exports["default"] = Button;
