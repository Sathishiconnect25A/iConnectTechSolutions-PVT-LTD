import React, { useState, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaUserGraduate, FaRocket, FaThumbsUp } from 'react-icons/fa';

interface InternshipPopupProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    preFillData?: Record<string, string>;
}

const InternshipPopup: React.FC<InternshipPopupProps> = ({ isOpen, onOpen, onClose, preFillData }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        parentName: '',
        cellPhone: '',
        presentAddress: '',
        highestQualification: '',
        yearOfPass: '',
        collegeName: '',
        employmentHistory: '',
        birthDate: '',
        permanentAddress: '',
        email: '',
        skills: '',
        gender: 'Male',
        referredBy: '',
        referrerMobile: '',
        interestedInInternship: 'Yes',
        canComeOffline: 'Yes',
        domainInterest: 'Web Development'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [showTeaser, setShowTeaser] = useState(false);
    const [teaserStep, setTeaserStep] = useState<'initial' | 'question'>('initial');

    // Auto-show teaser after 3 seconds if not already open
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) {
                setShowTeaser(true);
            }
        }, 3000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    // Sync pre-filled data from AI
    useEffect(() => {
        if (preFillData) {
            setFormData(prev => ({
                ...prev,
                fullName: preFillData.name || prev.fullName,
                email: preFillData.email || prev.email,
                cellPhone: preFillData.mobile || prev.cellPhone,
                highestQualification: preFillData.qualification || prev.highestQualification,
                yearOfPass: preFillData.year || prev.yearOfPass,
                domainInterest: preFillData.interest || prev.domainInterest
            }));
        }
    }, [preFillData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:8080/api/internship/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Application submitted successfully! 🚀');
                setTimeout(() => {
                    onClose();
                    setFormData({
                        fullName: '',
                        parentName: '',
                        cellPhone: '',
                        presentAddress: '',
                        highestQualification: '',
                        yearOfPass: '',
                        collegeName: '',
                        employmentHistory: '',
                        birthDate: '',
                        permanentAddress: '',
                        email: '',
                        skills: '',
                        gender: 'Male',
                        referredBy: '',
                        referrerMobile: '',
                        interestedInInternship: 'Yes',
                        canComeOffline: 'Yes',
                        domainInterest: 'Web Development'
                    });
                    setMessage(null);
                }, 3000);
            } else {
                const errorText = await response.text();
                setMessage(`Failed to submit: ${errorText}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setMessage('Error connecting to server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleTeaserClick = () => {
        setTeaserStep('question');
    };

    const handleInterestResponse = (interested: boolean) => {
        if (interested) {
            onOpen(); // Open the full modal
            setShowTeaser(false); // Hide teaser
            setTeaserStep('initial'); // Reset teaser
        } else {
            setShowTeaser(false); // Just hide if not interested
        }
    };

    return (
        <>
            {/* Floating Teaser Widget */}
            {!isOpen && showTeaser && (
                <div className={`teaser-widget ${teaserStep === 'question' ? 'expanded' : ''}`}>
                    <button className="teaser-close" onClick={() => setShowTeaser(false)}>
                        <FaTimes />
                    </button>

                    {teaserStep === 'initial' ? (
                        <div className="teaser-content" onClick={handleTeaserClick}>
                            <div className="teaser-icon-pulse">
                                <FaRocket />
                            </div>
                            <div className="teaser-text">
                                <span>Internship Opportunity!</span>
                                <span className="subtitle">Launch your career 🚀</span>
                            </div>
                        </div>
                    ) : (
                        <div className="teaser-question">
                            <p>Are you interested in a transformational internship?</p>
                            <div className="teaser-actions">
                                <button className="btn-yes" onClick={() => handleInterestResponse(true)}>
                                    <FaThumbsUp /> Yes, I 'm In!
                                </button>
                                <button className="btn-no" onClick={() => handleInterestResponse(false)}>
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Main Application Modal */}
            {isOpen && (
                <div className="popup-overlay">
                    <div className="popup-content glass-effect no-scrollbar">
                        <button className="popup-close" onClick={onClose}><FaTimes /></button>

                        <div className="popup-header">
                            <div className="header-icon">
                                <FaUserGraduate />
                            </div>
                            <h2>Applying for the Internship</h2>
                            <p>Turn your passion into a profession.</p>
                        </div>

                        {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

                        <form onSubmit={handleSubmit} className="modern-form">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="John Doe" />
                                </div>
                                <div className="form-group">
                                    <label>S/O | D/O</label>
                                    <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} required placeholder="Parent's Name" />
                                </div>
                                <div className="form-group">
                                    <label>Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} className="custom-select">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Birth Date</label>
                                    <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Cell Phone</label>
                                    <input type="tel" name="cellPhone" value={formData.cellPhone} onChange={handleChange} required placeholder="+91 00000 00000" />
                                </div>
                                <div className="form-group">
                                    <label>Present Address</label>
                                    <input type="text" name="presentAddress" value={formData.presentAddress} onChange={handleChange} required placeholder="Current City/Address" />
                                </div>
                                <div className="form-group">
                                    <label>Permanent Address</label>
                                    <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} required placeholder="Permanent City/Address" />
                                </div>
                                <div className="form-group">
                                    <label>Highest Qualification</label>
                                    <input type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} required placeholder="B.Tech, M.Tech, etc." />
                                </div>
                                <div className="form-group">
                                    <label>Year of Pass</label>
                                    <input type="number" name="yearOfPass" value={formData.yearOfPass} onChange={handleChange} required placeholder="2024" />
                                </div>
                                <div className="form-group">
                                    <label>College</label>
                                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} required placeholder="College / University Name" />
                                </div>
                                <div className="form-group">
                                    <label>Employment History (if any)</label>
                                    <input type="text" name="employmentHistory" value={formData.employmentHistory} onChange={handleChange} placeholder="Previous company/None" />
                                </div>
                                <div className="form-group full-width">
                                    <label>Skills (If Any)</label>
                                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="Java, React, SQL, etc." />
                                </div>
                                <div className="form-group">
                                    <label>Referred By</label>
                                    <input type="text" name="referredBy" value={formData.referredBy} onChange={handleChange} placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <label>Referrer Mobile</label>
                                    <input type="tel" name="referrerMobile" value={formData.referrerMobile} onChange={handleChange} placeholder="Referrer Mobile" />
                                </div>
                                <div className="form-group">
                                    <label>Interested in Internship?</label>
                                    <select name="interestedInInternship" value={formData.interestedInInternship} onChange={handleChange} className="custom-select">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Able to come offline (10AM - 6PM)?</label>
                                    <select name="canComeOffline" value={formData.canComeOffline} onChange={handleChange} className="custom-select">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Domain of Interest</label>
                                    <select name="domainInterest" value={formData.domainInterest} onChange={handleChange} className="custom-select">
                                        <option value="Web Development">Web Development</option>
                                        <option value="Data Science">Data Science</option>
                                        <option value="AI/ML">AI/ML</option>
                                        <option value="Cyber Security">Cyber Security</option>
                                        <option value="App Development">App Development</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    <>Submit Application <FaPaperPlane /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .no-scrollbar {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .form-group.full-width {
                    grid-column: span 2;
                }
                @media (max-width: 600px) {
                    .form-group.full-width {
                        grid-column: span 1;
                    }
                }
            `}</style>
        </>
    );
};

export default InternshipPopup;
