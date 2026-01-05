import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Dynamic styles based on scroll state to match original script behavior
    const headerStyle = isScrolled ? {
        height: '70px',
        boxShadow: '0 10px 30px -10px rgba(2, 12, 27, 0.7)'
    } : {}; // Default styles from CSS are fine for non-scrolled state (height: 90px)

    return (
        <header style={headerStyle}>
            <div className="container nav-container">
                <a href="#" className="logo" onClick={closeMenu}>
                    <img src={logo} alt="ICONNECT Tech Solutions Logo" />
                    <span className="logo-text">ICONNECT <span className="highlight">TECH SOLUTIONS</span></span>
                </a>
                <nav>
                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <li><a href="#home" onClick={closeMenu}>Home</a></li>
                        <li><a href="#services" onClick={closeMenu}>Services</a></li>
                        <li><a href="#programs" onClick={closeMenu}>Internships</a></li>
                        <li><a href="#about" onClick={closeMenu}>About</a></li>
                        <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
                        <li><a href="#contact" className="btn-secondary" onClick={closeMenu}>Contact Us</a></li>
                    </ul>
                    <div className="menu-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </nav>
            </div>
        </header>
    );
}
