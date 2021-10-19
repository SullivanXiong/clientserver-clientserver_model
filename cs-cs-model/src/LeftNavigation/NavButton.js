import React from 'react';
import './NavButton.css';

export default function NavButton({ name, style, onClick}) {
    return (
        <>
            <div style={style} className="button" onClick={onClick}>
                {name}
            </div>
        </>
    )
}
