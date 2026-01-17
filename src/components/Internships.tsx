import { FaGraduationCap, FaCheck, FaUsers } from 'react-icons/fa';

export default function Internships() {
    return (
        <section id="programs" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>Internship Programs</h2>
                    <p>Offline Internship Program: Full Stack Web Development</p>
                </div>
                <div className="services-grid">
                    <div className="card featured-program">
                        <span className="featured-badge">Active</span>
                        <div className="icon-box"><FaGraduationCap /></div>
                        <h3>Full Stack Development</h3>
                        <p>Immersive offline training focused on C#, .NET Core, and Enterprise SQL Server.</p>
                        <ul className="feature-list">
                            <li><FaCheck /> Professional Mentorship</li>
                            <li><FaCheck /> 4 to 6 Months Duration</li>
                            <li><FaCheck /> Real-time Project Delivery</li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="icon-box"><FaUsers /></div>
                        <h3>Career Readiness</h3>
                        <p>Preparing the next generation of engineers for the global software industry.</p>
                        <ul className="feature-list">
                            <li><FaCheck /> Fresh Graduates Welcome</li>
                            <li><FaCheck /> Placement-Driven Training</li>
                            <li><FaCheck /> Industry-Standard Best Practices</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
