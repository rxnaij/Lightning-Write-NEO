"use strict";
exports.__esModule = true;
var React = require("react");
require("./DynamicLabel.scss");
var mapValues_1 = require("../../functions/mapValues");
/** Displays information about the text being written.
    Props:
    @prop name: String: name of label
    @prop type: string literal: type of label to be displayed: can be of value "counter" or "timer"
    @prop value: String: current value of label
    @prop target: number: the maximum possible value of the value prop
    @prop display: function | string: an instruction on how to display the text in the component
    @prop className: template String: base class, plus a condition when the value hits a certain amount
*/
var DynamicLabel = function (_a) {
    var name = _a.name, value = _a.value, target = _a.target, display = _a.display;
    return (React.createElement("div", { className: "dynamic-label" },
        React.createElement("div", null,
            React.createElement("div", { className: "dynamic-label__title" }, name),
            React.createElement("div", { className: "dynamic-label__value" + (value >= target ? "--success" : "") }, display(value, target))),
        React.createElement("div", { className: "dynamic-label__progress-bar" },
            React.createElement("div", { className: "dynamic-label__progress-bar-guide" }),
            React.createElement("div", { className: "dynamic-label__progress-bar-progress", style: {
                    'width': mapValues_1.mapValues(value, 0, target, 0, 100, true) + "px"
                } }))));
};
exports["default"] = DynamicLabel;
