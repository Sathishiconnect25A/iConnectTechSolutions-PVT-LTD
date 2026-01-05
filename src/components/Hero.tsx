export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-background-effects">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="particle" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${5 + Math.random() * 10}s`
                        }}></div>
                    ))}
                </div>
            </div>
            <div className="container hero-content">
                <h1>Collaborating for <span className="text-gradient">Excellence</span></h1>
                <p>Empowering careers and building realtime projects from scratch. Your partner in digital transformation
                    and professional growth.</p>
                <div className="hero-btns">
                    <a href="#programs" className="btn-primary">View Internships</a>
                    <a href="#contact" className="btn-secondary">Get in Touch</a>
                </div>
            </div>
        </section>
    );
}
