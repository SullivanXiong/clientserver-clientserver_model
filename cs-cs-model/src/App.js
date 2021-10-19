import './App.css';
import React, { useState } from 'react';
import LeftNavigation from './LeftNavigation/LeftNavigation';
import Doc from './rightNav/Doc/Doc';
import Net from './rightNav/Net/Net';
import Port from './rightNav/Port/Port';
import Sim from './rightNav/Sim/Sim';

function App() {
    let [navState, setNavState] = useState('Net');

    let navigations = [
        {
            name: 'Entire Network',
            redirect: 'Net'
        },
        {
            name: 'Port 3000',
            redirect: '3000'
        },
        {
            name: 'Port 3001',
            redirect: '3001'
        },
        {
            name: 'Port 3002',
            redirect: '3002'
        },
        {
            name: 'Google Docs',
            redirect: 'Docs'
        },
        {
            name: 'Network Attack Simulations',
            redirect: 'Sim'
        }
    ];

    return (
        <>
            <div className="App">
                <LeftNavigation setNavState={setNavState} navigations={navigations}/>
                <div className="rightNavWrapper">
                    {navState === 'Net' && (
                        <Net></Net>
                    )}
                    {navState === '3000' && (
                        <Port port={3000}></Port>
                    )}
                    {navState === '3001' && (
                        <Port port={3001}></Port>
                    )}
                    {navState === '3002' && (
                        <Port port={3002}></Port>
                    )}
                    {navState === 'Docs' && (
                        <Doc></Doc>
                    )}
                    {navState === 'Sim' && (
                        <Sim></Sim>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
