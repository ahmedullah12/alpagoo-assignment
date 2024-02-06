import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-accent">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li ><Link to="/login">Sign In</Link></li>
                    <li><Link to="/register">Sign Up</Link></li> 
                </ul>
                </div>
                <a href='/' className="btn btn-ghost text-xl ms-1 lg:ms-14 text-orange-200">AlpagooTask</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li className='text-white text-base font-bold'><Link to="/login">Sign In</Link></li>
                    <li className='text-white text-base font-bold'><Link to="/register">Sign Up</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;