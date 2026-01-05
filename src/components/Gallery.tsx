import office1 from '../assets/office-1.jpg';
import office2 from '../assets/office-2.jpg';
import office3 from '../assets/office-3.jpg';
import office4 from '../assets/office-4.jpg';

const images = [
    { src: office1, alt: "ICONNECT Office - Workspace" },
    { src: office2, alt: "Interns Working at ICONNECT" },
    { src: office3, alt: "Collaboration and Mentorship" },
    { src: office4, alt: "Modern Tech Environment" }
];

export default function Gallery() {
    return (
        <section id="gallery" className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="text-gradient">Life at ICONNECT</h2>
                    <p>Experience our professional workspace and collaborative culture.</p>
                </div>
                <div className="gallery-grid">
                    {images.map((img, index) => (
                        <div key={index} className="gallery-item">
                            <img src={img.src} alt={img.alt} />
                            <div className="gallery-overlay">
                                <span>{img.alt}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
