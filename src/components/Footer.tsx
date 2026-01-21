import { FaLinkedin, FaFacebook, FaInstagram, FaGlobe, FaPaperPlane, FaShieldAlt, FaExternalLinkAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function Footer() {
    return (
        <footer id="contact">
            <div className="container footer-content">
                <div className="footer-info">
                    <a href="#" className="logo">
                        <img src={logo} alt="ICONNECT Tech Solutions Logo" />
                        <span className="logo-text">ICONNECT</span>
                    </a>
                    <p>Empowering digital careers through world-class technical mentorship and real-world project delivery. Collaborating for excellence at an global scale.</p>
                    <div className="social-links">
                        <a href="https://linkedin.com/company/iconnect-tech-solutions/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        <a href="https://facebook.com/share/1Bbycadqmx" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                        <a href="https://www.instagram.com/iconnecttechsolutions?igsh=cm5uMnF1eXA3OW0w" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        <a href="https://www.theiconnect.org" target="_blank" rel="noopener noreferrer"><FaGlobe /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <h4>Core Solutions</h4>
                    <ul>
                        <li><a href="#services">Enterprise Software</a></li>
                        <li><a href="#services">Cloud Architecture</a></li>
                        <li><a href="#services">AI & Automation</a></li>
                        <li><a href="#programs">Professional Internships</a></li>
                        <li><a href="#programs">Skill Development</a></li>
                    </ul>
                </div>

                <div className="footer-links">
                    <h4>Organization</h4>
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#about">Our Governance</a></li>
                        <li><a href="#contact">Contact Global</a></li>
                        <li><a href="https://www.theiconnect.org" target="_blank" rel="noopener noreferrer">Official Portal <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} /></a></li>
                    </ul>
                </div>

                <div className="footer-contact">
                    <h4>Stay Connected</h4>
                    <p style={{ marginBottom: '12px' }}>Join our professional network for latest updates.</p>
                    <div className="newsletter-form">
                        <div className="newsletter-input">
                            <input type="email" placeholder="professional@email.com" />
                            <button className="newsletter-btn"><FaPaperPlane /></button>
                        </div>
                    </div>
                    <div style={{ marginTop: '24px' }}>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                            <FaShieldAlt style={{ color: 'var(--primary)' }} />
                            Industry Standard Security
                        </p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container" style={{ textAlign: 'center' }}>
                    <p className="footer-copyright">&copy; {new Date().getFullYear()} ICONNECT TECH SOLUTIONS PVT LTD. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Cookie Policy</a>
                        <a href="#">Security</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
