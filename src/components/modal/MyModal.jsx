import React, { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';
import './MyModal.css';

function MyModal({ onClose }) {
    const modalRef = useRef();
    const isMobile = window.innerWidth < 768;

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

                <p className="text-lg font-medium text-center mb-6">
                    If you want to get more information about me, dm me via LinkedIn!
                </p>

                {/*// ignore this block */}
                {/*<iframe src="/resume.pdf" width="100%" height="600px"></iframe>
                <embed src="public/resume.pdf" width="100%" height="2rem" type="application/pdf" />
                <div className="pdf-container">
                  <embed src="public/resume.pdf" type="application/pdf" />
                </div>*/}

                {/*// Conditional rendering based on device type*/}
                {isMobile ? (
                    <a
                        href="/resume.pdf"
                        target="/resume.pdf"
                        rel="noopener noreferrer"
                        className="resume-modal"
                    >
                        <Download />
                        Open PDF
                    </a>
                ) : (
                    <object data="/luc-portfolio/resume.pdf" type="application/pdf" className="pdf-container">
                      <iframe
                        src="/resume.pdf"
                        className="pdf-container"
                        title="PDF Preview"
                      >
                        <p>
                          Your browser doesn’t support PDF preview.
                          <a href="/resume.pdf" download>
                            <br />
                            <Download />
                            <br />
                            Download Resume here
                          </a>
                        </p>
                      </iframe>
                    </object>
                )}
                
            </div>
        </div>
    );
}

export default MyModal;