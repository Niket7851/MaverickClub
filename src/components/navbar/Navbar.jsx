import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../photos/logo.png';

const Navbar = ({ type }) => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const userDetails = location.state?.userDetails;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setOpen(true);
      setIsAdmin(userDetails.isAdmin);
    }
  }, [userDetails]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigate = useNavigate();
  const navigateToPage = (path) => {
    navigate(path, { state: { userDetails: userDetails } });
  };

  const handleLogout = () => {
    setOpen(false);
    navigate('/', { replace: true });
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={type === 'pnavbar' ? 'pnavbar' : 'navBar'}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="its logo" />
        </Link>
      </div>
      {isMobile ? (
        <>
          <div className={`menu-icon ${open ? 'open' : ''}`} onClick={() => toggleMenu()}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div className={`list ${open ? 'open' : ''}`}>
            <ul>
              <li onClick={() => navigateToPage('/')}>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              {open && (
                <li onClick={() => navigateToPage('/profile')}>
                  <Link>Profile</Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="list">
            <ul>
              <li onClick={() => navigateToPage('/')}>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              {open && (
                <li onClick={() => navigateToPage('/profile')}>
                <Link>Profile</Link>
              </li>
              )}
              {isAdmin && (
               <li onClick={() => navigateToPage('/dashboard')}>
               <Link>Dashboard</Link>
             </li>
              )}
            </ul>
          </div>
          {!open ? (
            <div className="register">
              <Link to="/register">
                <button className="button">Register</button>
              </Link>
              <Link to="/login">
                <button className="button">Login</button>
              </Link>
            </div>
          ) : (
            <div className="register">
              <button className="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
