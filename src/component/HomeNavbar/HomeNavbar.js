import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './homenavbar.css';

export const HomeNavbar = () => {
    return (
        <div className='id1'>
            <nav className='id'>
                <ul>
                    <li>
                        <Link to="/recents">Recent</Link>
                    </li>
                    <li>
                        <Link to="/Live">Live</Link>
                    </li>
                    <li>
                        <Link to="/Upcoming">Upcoming</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};


export default HomeNavbar;