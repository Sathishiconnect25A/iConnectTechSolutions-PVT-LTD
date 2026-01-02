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
                        <span className="featured-badge">Registrations Started!</span>
                        <div className="icon-box"><FaGraduationCap /></div>
                        <h3>Full Stack Development</h3>
                        <p><strong>Tech Stack:</strong> C#, .NET Core, ASP.NET MVC, SQL Server.</p>
                        <p style={{ marginTop: '10px', color: '#fff' }}><strong>Duration:</strong> 4 to 6 Months</p>
                        <ul className="feature-list" style={{ marginTop: '20px', fontSize: '0.9rem' }}>
                            <li><FaCheck /> Office-Like Culture (10 AM - 6 PM)</li>
                            <li><FaCheck /> Mentorship from Professionals</li>
                            <li><FaCheck /> Gain 2 Years Hands-on Experience</li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="icon-box"><FaUsers /></div>
                        <h3>Who Can Apply?</h3>
                        <ul className="feature-list" style={{ marginTop: '20px', fontSize: '0.9rem' }}>
                            <li><FaCheck /> Fresh Graduates</li>
                            <li><FaCheck /> Final Year Students</li>
                            <li><FaCheck /> Aspiring Fullstack Developers</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
