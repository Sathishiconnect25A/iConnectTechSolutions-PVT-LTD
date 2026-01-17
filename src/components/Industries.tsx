import { FaDatabase, FaServer, FaCloud, FaLayerGroup } from 'react-icons/fa';
import { SiSharp, SiDotnet, SiReact, SiDocker, SiTypescript } from 'react-icons/si';

const technologies = [
    { icon: <SiSharp />, name: 'C# Programming' },
    { icon: <SiDotnet />, name: '.NET Core 8' },
    { icon: <FaServer />, name: 'ASP.NET Web API' },
    { icon: <FaDatabase />, name: 'SQL Server' },
    { icon: <FaDatabase />, name: 'Entity Framework' },
    { icon: <SiReact />, name: 'React.js' },
    { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <FaCloud />, name: 'Azure Cloud' },
    { icon: <SiDocker />, name: 'Docker' },
    { icon: <FaLayerGroup />, name: 'Microservices' },
];

const Industries = () => {
    return (
        <section className="trusted-section">
            <div className="container">
                <h4 className="trusted-title">Master the Complete .NET Fullstack Arsenal</h4>

                <div className="logos-slider">
                    <div className="logos-slide">
                        {/* First set of logos */}
                        {technologies.map((item, index) => (
                            <div className="logo-item" key={`first-${index}`}>
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}
                        {/* Second set of logos for seamless loop */}
                        {technologies.map((item, index) => (
                            <div className="logo-item" key={`second-${index}`}>
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}
                        {/* Third set of logos for extra smoothness on wide screens */}
                        {technologies.map((item, index) => (
                            <div className="logo-item" key={`third-${index}`}>
                                {item.icon}
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Industries;
