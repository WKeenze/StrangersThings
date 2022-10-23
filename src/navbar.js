import React from "react";
import { Link } from "react-router-dom"; 

const Navbar = () => {
    return (
        <nav id='navbar'>
           <button id='navbutton'> <Link to="/">Home</Link></button>
           <button id='navbutton'> <Link to="/posts">Posts</Link></button>
           <button id='navbutton'> <Link to="/profile">Profile</Link></button>
           <button id='navbutton'> <Link to="/createPosts">Create</Link></button>
           <button id='navbutton'> <Link to="/login">Login</Link></button>
           
        </nav>
    )
};

export default Navbar; 