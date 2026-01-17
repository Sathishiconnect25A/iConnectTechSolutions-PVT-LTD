import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';

interface HeaderProps {
    onOpenInternship: () => void;
}

export default function Header({ onOpenInternship }: HeaderProps) {
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

    const handleInternshipClick = (e: React.MouseEvent) => {
        e.preventDefault();
        closeMenu();
        onOpenInternship();
    };

    return (
        <header className={isScrolled ? 'scrolled' : ''}>
            <div className="container nav-container">
                <a href="#" className="logo" onClick={closeMenu}>
                    <img src={logo} alt="ICONNECT Tech Solutions Logo" />
                    <span className="logo-text">ICONNECT <span className="highlight">TECH SOLUTIONS</span></span>
                </a>
                <nav>
                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <li><a href="#home" onClick={closeMenu}>Home</a></li>
                        <li><a href="#services" onClick={closeMenu}>Services</a></li>
                        <li><a href="#programs" onClick={handleInternshipClick}>Internships</a></li>
                        <li><a href="#about" onClick={closeMenu}>About</a></li>
                        <li><a href="#gallery" onClick={closeMenu}>Gallery</a></li>
                        <li><a href="#contact" className="btn-secondary" onClick={closeMenu}>Contact Us</a></li>
                        <li><button className="btn-primary" onClick={handleInternshipClick}>Apply Now</button></li>
                    </ul>
                    <div className="menu-toggle" onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </nav>
            </div>
        </header>
    );
}
