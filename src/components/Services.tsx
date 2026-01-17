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
                    <div className="card">
                        <div className="icon-box"><FaCode /></div>
                        <h3>Full-Stack Solutions</h3>
                        <p>End-to-end development using .NET Core and modern frontend frameworks for scalable applications.</p>
                    </div>
                    <div className="card">
                        <div className="icon-box"><FaDatabase /></div>
                        <h3>Cloud & Architecture</h3>
                        <p>Modern cloud-native architectures with EF Core and SQL Server for enterprise-grade data management.</p>
                    </div>
                    <div className="card">
                        <div className="icon-box"><FaTasks /></div>
                        <h3>Agile Ecosystem</h3>
                        <p>Streamlined delivery with Agile Scrum, Azure DevOps, and professional project lifecycle management.</p>
                    </div>
                    <div className="card">
                        <div className="icon-box"><FaMobileAlt /></div>
                        <h3>Digital Innovation</h3>
                        <p>Transforming complex business requirements into high-performance web and mobile experiences.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
