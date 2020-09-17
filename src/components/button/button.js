"use strict";
exports.__esModule = true;
var React = require("react");
var classnames_1 = require("classnames");
require("./button.scss");
var Button = function (_a) {
    var children = _a.children, state = _a.state, variant = _a.variant, onClick = _a.onClick, enableConditions = _a.enableConditions, icon = _a.icon, collapse = _a.collapse;
    return (React.createElement("button", { className: classnames_1["default"]({
            'button': true,
            // Button disabled state. Evaluates to true if:
            // the `disabled` prop is supplied, OR
            // any of the elements in the `enableConditions` prop contains a falsy value
            'button--disabled': state === 'disabled' || (enableConditions && !enableConditions.every(function (condition) { return condition; })),
            'button--activated': state === 'active',
            'button--secondary': variant === 'secondary',
            'button--outline': variant === 'outline'
        }), onClick: function (event) {
            if (onClick) {
                event.preventDefault();
                onClick(event);
            }
        } },
        icon &&
            React.createElement("span", { className: "icon\n                        " + (collapse ? 'collapse--' + collapse : '') + "\n                    ", role: "img" }, icon),
        children));
};
exports["default"] = Button;
