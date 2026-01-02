import { FaCode, FaDatabase, FaTasks, FaMobileAlt } from 'react-icons/fa';

export default function Services() {
    return (
        <section id="services" className="section">
            <div className="container">
                <div className="section-header">
                    <h2>Our Expertise</h2>
                    <p>Comprehensive technology solutions tailored to your business needs.</p>
                </div>
                <div className="services-grid">
                    <div className="card service-card">
                        <div className="icon-box"><FaCode /></div>
                        <h3>Software Development</h3>
                        <p>Building Realtime Projects from scratch using C#, .NET Core, ASP.NET Core MVC.</p>
                    </div>
                    <div className="card service-card">
                        <div className="icon-box"><FaDatabase /></div>
                        <h3>Data Management</h3>
                        <p>Robust database solutions using ADO.NET, EF Core, and SQL Server.</p>
                    </div>
                    <div className="card service-card">
                        <div className="icon-box"><FaTasks /></div>
                        <h3>Project Management</h3>
                        <p>Agile Scrum methodologies and Azure DevOps for efficient project delivery.</p>
                    </div>
                    <div className="card service-card">
                        <div className="icon-box"><FaMobileAlt /></div>
                        <h3>Mobile & Web Apps</h3>
                        <p>Full Stack Web Development tailored for modern business requirements.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
