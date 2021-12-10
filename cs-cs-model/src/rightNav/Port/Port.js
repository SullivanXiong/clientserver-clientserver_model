import React from 'react';
import './Port.css';

export default function Port() {


    return (
        <div style={{width: "60vw", height: "100vh"}}>
            <svg
                style={{width: "100%", height: "100%"}}>
                <circle
                    cx="50%"
                    cy="50%"
                    r="20"
                    style={{stroke: 'none', fill: '#000000'}}
                />
                <circle
                    cx="calc(50% + 20px)"
                    cy="calc(50% + 20px)"
                    r="20"
                    style={{stroke: 'none', fill: '#000000'}}
                />
            </svg>
        </div>
    )
}
