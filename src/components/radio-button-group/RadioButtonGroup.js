"use strict";
/**
* A group of radio checkboxes represented as buttons.
* Will automatically handle event changes when a radio button is selected.
*
* Props: (* means required)
* @prop name*: string           name of group for HTML purposes.
*      Precondition: must be HTML-valid (i.e. no whitespace)
* @prop unitName: string        name of unit of values to be displayed
* @prop label: string           text to appear on form label
* @prop values*: array          values to be supplied to input group
* @prop eventHandler            function, event handler to be run on radio selection.
*       In the context of the parent component, this usually means
*       updating a state value when a radio button is selected.
*/
exports.__esModule = true;
var React = require("react");
var RadioButton_1 = require("./radio-button/RadioButton");
require("./RadioButtonGroup.scss");
/**
 *
 * @todo fully build out "custom" option in radio buttons
 * @todo create radio button component
 * @todo consider turning the div .input-container into a <fieldset>
 *
 */
var RadioButtonGroup = function (_a) {
    var name = _a.name, label = _a.label, values = _a.values, handleChange = _a.handleChange;
    // @state active: the ID attribute of the currently active radio button
    var _b = React.useState(''), active = _b[0], setActive = _b[1];
    var formId = name + "-form";
    return (React.createElement("fieldset", { className: "radio-button-group", id: formId, name: formId },
        React.createElement("legend", { className: "input-label" }, label),
        !active &&
            React.createElement("div", null, "Please select a value."),
        values.map(function (val) {
            var inputId = name + "-radio__" + val;
            return (React.createElement(RadioButton_1["default"], { key: inputId, name: name, id: inputId, value: val, handleChange: handleChange, isActive: active, setActive: function () { return setActive(inputId); } }));
        }),
        React.createElement("div", null,
            React.createElement("label", { htmlFor: formId + '-custom-value-input' }, "or enter a custom value..."),
            React.createElement("input", { id: formId + '-custom-value-input', type: "text", className: "text-input", placeholder: "custom value..." }))));
};
exports["default"] = RadioButtonGroup;
