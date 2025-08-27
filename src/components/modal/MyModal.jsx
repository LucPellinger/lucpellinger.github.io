import React, { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';

import './MyModal.css';

function MyModal({ onClose }) {
    const modalRef = useRef();
    const isMobile = window.innerWidth < 400;

    // Close on background click
    const handleClickOutside = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    // Optional: Close on ESC key press
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // Prevent background scroll while modal is open
    useEffect(() => {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, []);    

    return (
        <div
            ref={modalRef}
            onClick={handleClickOutside}
            className="modal-overlay"
        >
            <div className="modal-content">
                <button
                    onClick={onClose}
                    className="modal-close-btn"
                    aria-label="Close modal"
                >
                    <X />
                </button>

                <h1 className="text-3xl font-extrabold text-center mb-4">View my Resume</h1>

                <div className="contact-row">
                  <a
                    href="https://www.linkedin.com/in/luc-pellinger/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-box"
                  >
                    This resume was created using LaTeX. <br />
                    If you want to get in touch, send me a DM.
                  </a>

                  <a
                    href="https://www.linkedin.com/in/luc-pellinger/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open LinkedIn"
                    className="contact-icon"
                  >
                    <FaLinkedin />
                  </a>
                </div>

                {/*// ignore this block */}
                {/*<iframe src="/Resume_LucPellinger.pdf" width="100%" height="600px"></iframe>
                <embed src="public/Resume_LucPellinger.pdf" width="100%" height="2rem" type="application/pdf" />
                <div className="pdf-container">
                  <embed src="public/Resume_LucPellinger.pdf" type="application/pdf" />
                </div>*/}

                {/*// Conditional rendering based on device type*/}
                {isMobile ? (
                    <a
                        href="/Resume_LucPellinger.pdf"
                        target="/Resume_LucPellinger.pdf"
                        rel="noopener noreferrer"
                        className="pdf-container"
                    >
                        <br />
                        <Download />
                        <br />
                        <p>Open Resume</p>
                        <br />
                    </a>
                ) : (
                    <object data="/Resume_LucPellinger.pdf" type="application/pdf" className="pdf-container">
                        <p>
                          Your browser doesn’t support PDF preview.
                          <a href="/Resume_LucPellinger.pdf" download>
                            <br />
                            <Download />
                            <br />
                            <p>Download Resume here</p>
                            <br />
                          </a>
                        </p>
                      
                    </object>
                )}
                
            </div>
        </div>
    );
}

export default MyModal;