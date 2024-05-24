import React, { useState } from 'react';
import { MdOutlineDarkMode, MdOutlineSportsCricket, MdLogin } from 'react-icons/md';
import './Navbar.css';
import { Link, useLocation } from 'react-router-dom';
import { TbCricket } from "react-icons/tb";

const Navbar = () => {
    const [showNavLinks, setShowNavLinks] = useState(false);
    const location = useLocation();

    const { state } = location;
    const { isLoggedin, username} = state || { isLoggedin: false, username: '' };
    const toggleNav = () => {
        setShowNavLinks(!showNavLinks);
    };

    const closeNav = () => {
        setShowNavLinks(false);
    };
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <>
            <nav className="navbar">
                <div className="container1">
                    <div className="logo">
                        {/* <Logo /> */}
                        &nbsp;&nbsp;Play Tracker
                    </div>
                    <li className='mainfile'>
                        <TbCricket />
                    </li>
                    <ul className={`nav-links ${showNavLinks ? 'show' : ''}`}>
                        <li><Link to="/" onClick={closeNav}>Home</Link></li>
                        <li><Link to="/schedule" onClick={closeNav}>Schedule</Link></li>
                        {/* Add onClick handler to all other links */}
                        <li><Link to="/rankings" onClick={closeNav}>News</Link></li>

                        <li className="login-btn">
                            <Link to="/login" onClick={closeNav}>
                                <MdLogin /> Login
                            </Link>
                        </li>
                        {isLoggedin && <li><Link to="admin" onClick={closeNav}>Create Match</Link></li>}
                        {isLoggedin && <li><Link to="admin" onClick={handleRefresh}>LogOut</Link></li>}
                    </ul>
                    <div className="burger" onClick={toggleNav}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </nav>
            <hr className="navbar-line" />
        </>
    );
};

export default Navbar;
