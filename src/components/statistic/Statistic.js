import React from 'react'

export default function Statistic ({title, value}) {
    return (
        <div>
            <h4 className="data-label">
                {title}
            </h4>
            <div className="counters__label">
                {value}
            </div>
        </div>
    )
}
