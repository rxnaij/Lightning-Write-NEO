"use strict";
exports.__esModule = true;
var React = require("react");
require("./button.scss");
var Button = function (props) {
    // Button disabled state. Evaluates to true if:
    // the `disabled` prop is supplied, OR
    // any of the elements in the `enableConditions` prop contains a falsy value
    var disabledState = props.disabled || (props.enableConditions && !props.enableConditions.every(function (condition) { return condition; }));
    return (React.createElement("button", { className: "\n                button\n                " + (disabledState ? 'button--disabled' : '') + "\n                " + (props.active ? 'button--activated' : '') + "\n                " + (props.secondary ? 'button--secondary' : '') + "\n                " + (props.outline ? 'button--outline' : '') + "\n                ", onClick: function (event) {
            if (props.onClick) {
                event.preventDefault();
                props.onClick(event);
            }
        } }, props.children));
};
exports["default"] = Button;
