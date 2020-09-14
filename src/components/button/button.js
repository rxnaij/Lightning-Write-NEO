"use strict";
exports.__esModule = true;
var React = require("react");
require("./button.scss");
var Button = function (_a) {
    var disabled = _a.disabled, enableConditions = _a.enableConditions, active = _a.active, secondary = _a.secondary, outline = _a.outline, onClick = _a.onClick, icon = _a.icon, collapse = _a.collapse, children = _a.children;
    // Button disabled state. Evaluates to true if:
    // the `disabled` prop is supplied, OR
    // any of the elements in the `enableConditions` prop contains a falsy value
    var disabledState = disabled || (enableConditions && !enableConditions.every(function (condition) { return condition; }));
    return (React.createElement("button", { className: "\n                button\n                " + (disabledState ? 'button--disabled' : '') + "\n                " + (active ? 'button--activated' : '') + "\n                " + (secondary ? 'button--secondary' : '') + "\n                " + (outline ? 'button--outline' : '') + "\n                ", onClick: function (event) {
            if (onClick) {
                event.preventDefault();
                onClick(event);
            }
        } },
        icon &&
            React.createElement("span", { className: "\n                        icon\n                        " + (collapse ? 'collapse--' + collapse : '') + "\n                    ", role: "img" }, icon),
        children));
};
exports["default"] = Button;
