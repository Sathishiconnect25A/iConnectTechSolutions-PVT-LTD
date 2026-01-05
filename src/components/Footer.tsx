import { FaLinkedin, FaFacebook, FaTwitter, FaInstagram, FaGlobe, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';

export default function Footer() {
    return (
        <footer id="contact">
            <div className="container footer-content">
                <div className="footer-info">
                    <a href="#" className="logo">
                        <img src={logo} alt="ICONNECT Tech Solutions Logo"
                            style={{ height: '40px', marginRight: '10px', verticalAlign: 'middle' }} />
                        <span>ICONNECT</span>
                    </a>
                    <p>Empowering careers - Collaborating for Excellence</p>
                    <div className="social-links">
                        <a href="https://linkedin.com/company/iconnect-tech-solutions/" target="_blank"><FaLinkedin /></a>
                        <a href="https://facebook.com/share/1Bbycadqmx" target="_blank"><FaFacebook /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="https://www.instagram.com/iconnecttechsolutions?igsh=cm5uMnF1eXA3OW0w" target="_blank"><FaInstagram /></a>
                        <a href="https://www.theiconnect.org"><FaGlobe /></a>
                    </div>
                </div>
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#programs">Internships</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h4>Contact Us</h4>
                    <p><FaMapMarkerAlt /> <a href="https://maps.app.goo.gl/QaJqTkbbic5HeCaK8" target="_blank" rel="noopener noreferrer">7-1-401/A, near Bahar Cafe, Srinivasa Nagar, Ameerpet,
                        Hyderabad, Telangana 500038.</a></p>
                    <p><FaEnvelope /> theiconnect.org@gmail.com</p>
                    <p><FaPhoneAlt /> 040-31564877 / 9052592492</p>
                    <p><FaGlobe /> www.theiconnect.org</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 ICONNECT TECH SOLUTIONS. All rights reserved.</p>
            </div>
        </footer>
    );
}
