"use strict";
/*
* A group of radio checkboxes represented as buttons.
* Will automatically handle event changes when a radio button is selected.
*
* Props: (* means required)
* name*: string, name of group for HTML purposes.
*      Precondition: must be HTML-valid (i.e. no whitespace)
* unitName: string, name of unit of values to be displayed
* label: string, text to appear on form label
* values*: array, values to be supplied to input group
* eventHandler: function, event handler to be run on radio selection.
*       In the context of the parent component, this usually means
*       updating a state value when a radio button is selected.
*/
exports.__esModule = true;
var React = require("react");
require("./RadioButtonGroup.scss");
var RadioButtonGroup = function (_a) {
    var name = _a.name, unitName = _a.unitName, label = _a.label, values = _a.values, handleChange = _a.handleChange;
    // @state active: the ID attribute of the currently active radio button
    var _b = React.useState(''), active = _b[0], setActive = _b[1];
    var formId = name + "-form";
    return (React.createElement("div", { className: "input-container" },
        React.createElement("label", { className: "input-label", htmlFor: formId, form: formId }, label),
        React.createElement("form", { className: "linear-group", id: formId, name: formId }, values.map(function (val) {
            var inputId = name + "-radio__" + val;
            return (React.createElement("div", { key: inputId },
                React.createElement("input", { type: "radio", className: "radio-button-input--neutralize", name: name, id: inputId, value: val, onChange: function (e) { return handleChange(e.target.value); } }),
                React.createElement("label", { className: "button button--outline " + (active === inputId ? 'button--outline--activated' : ''), htmlFor: inputId, onClick: function () { return setActive(inputId); } /* When current radio button is selected, sets it as the active one */ },
                    val,
                    " ",
                    unitName)));
        }))));
};
exports["default"] = RadioButtonGroup;
