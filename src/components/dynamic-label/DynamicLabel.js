"use strict";
exports.__esModule = true;
var React = require("react");
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
var DynamicLabel = function (props) {
    var name = props.name, value = props.value, target = props.target, display = props.display;
    return (React.createElement("div", { className: "dynamic-label" },
        React.createElement("div", { className: "title" }, name),
        React.createElement("div", { className: "value" + (value >= target ? "--success" : "") }, display(value, target)),
        React.createElement("div", { style: {
                'borderBottom': '2px solid black',
                'width': mapValues_1.mapValues(value, 0, target, 0, 100, true) + "px"
            } })));
};
exports["default"] = DynamicLabel;
