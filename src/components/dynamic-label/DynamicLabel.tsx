import * as React from 'react'

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
const DynamicLabel: React.FC<CompProps> = (props: CompProps) => {

    const { name, value, target, display } = props

    return(
      <div className="dynamic-label">
        <div className="title">{name}</div>
        <div className={ `value` + ( value >= target ? `--success` : `` ) }>
          { display(value, target) }
        </div>
        <div style={{
          'borderBottom': '2px solid black',
          'width': `${mapValues(value, 0, target, 0, 100, true)}px`,
        }}></div>
      </div>
      
    )
}

export default DynamicLabel