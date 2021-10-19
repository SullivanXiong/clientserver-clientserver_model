import React from 'react';
import NavButton from './NavButton';
import './LeftNavigation.css';

export default function leftNavigation({ setNavState, navigations }) {
    console.log(navigations.length);
    return (
        <div className="leftNavWrapper">
            {navigations.map(navigation => <NavButton style={{height: `calc((100vh/${navigations.length}) - 2px)`, width:'calc(20vw - 2px)', border: 'solid white 1px', 'verticalAlign': 'middle', 'lineHeight': `calc((100vh/${navigations.length}) - 2px)`, 'textAlign': 'center'}} name={navigation.name} onClick={() => { setNavState(navigation.redirect) }}/> )}
        </div>
    )
}
