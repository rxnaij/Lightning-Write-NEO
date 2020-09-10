import * as React from 'react'

import './DynamicLabel.scss'

import { mapValues } from "../../functions/mapValues"

interface CompProps {
    name: string,
    type: "counter" | "timer",
    value: number,
    target: number,
    display: (...args: any) => string
}

/** Displays information about the text being written.
    Props:
    @prop name: String: name of label
    @prop type: string literal: type of label to be displayed: can be of value "counter" or "timer"
    @prop value: String: current value of label
    @prop target: number: the maximum possible value of the value prop
    @prop display: function | string: an instruction on how to display the text in the component
    @prop className: template String: base class, plus a condition when the value hits a certain amount
*/
const DynamicLabel: React.FC<CompProps> = ({ name, value, target, display }: CompProps) => {

    return(
      <div className="dynamic-label">
        <div>
          <div className="dynamic-label__title">{name}</div>
          <div className={ `dynamic-label__value${value >= target ? `--success` : ``}` }>
            { display(value, target) }
          </div>
        </div>
        <div className="dynamic-label__progress-bar">
          <div className="dynamic-label__progress-bar-guide" ></div>
          <div className="dynamic-label__progress-bar-progress" style={{
            'width': `${mapValues(value, 0, target, 0, 100, true)}px`,
          }}></div>
        </div>
        
      </div>
      
    )
}

export default DynamicLabel