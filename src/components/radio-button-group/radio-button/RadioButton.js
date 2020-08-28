"use strict";
exports.__esModule = true;
var React = require("react");
var RadioButton = function (_a) {
    var name = _a.name, id = _a.id, value = _a.value, handleChange = _a.handleChange, isActive = _a.isActive, setActive = _a.setActive;
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { type: "radio", className: "radio-button-input--neutralize", name: name, id: id, value: value, onChange: function (e) { return handleChange(e.currentTarget.value); }, required: true }),
        React.createElement("label", { className: "button button--outline " + (isActive === id ? 'button--outline--activated' : ''), htmlFor: id, onClick: function () { return setActive(id); } /* When current radio button is selected, sets it as the active one */ }, value)));
};
exports["default"] = RadioButton;
