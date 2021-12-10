import React from 'react';
import NavButton from './NavButton';
import './LeftNavigation.css';

export default function leftNavigation({ setNavState, navigations }) {
    console.log(navigations.length);
    return (
        <div className="leftNavWrapper">
            {navigations.map(navigation => <NavButton style={{border: 'solid white 1px', 'verticalAlign': 'middle', 'textAlign': 'center'}} name={navigation.name} onClick={() => { setNavState(navigation.redirect) }}/> )}
        </div>
    )
}
