import React, { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';
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

                <p className="text-lg font-medium text-center mb-6">
                    If you want to get more information about me, dm me via LinkedIn!
                </p>

                {/*// ignore this block */}
                {/*<iframe src="/Resume_LucPellinger.pdf" width="100%" height="600px"></iframe>
                <embed src="public/Resume_LucPellinger.pdf" width="100%" height="2rem" type="application/pdf" />
                <div className="pdf-container">
                  <embed src="public/Resume_LucPellinger.pdf" type="application/pdf" />
                </div>*/}

                {/*// Conditional rendering based on device type*/}
                {isMobile ? (
                    <a
                        href="/luc-portfolio/Resume_LucPellinger.pdf"
                        target="/luc-portfolio/Resume_LucPellinger.pdf"
                        rel="noopener noreferrer"
                        className="pdf-container"
                    >
                        <Download />
                        Open PDF
                    </a>
                ) : (
                    <object data="/luc-portfolio/Resume_LucPellinger.pdf" type="application/pdf" className="pdf-container">
                        <p>
                          Your browser doesn’t support PDF preview.
                          <a href="/luc-portfolio/Resume_LucPellinger.pdf" download>
                            <br />
                            <Download />
                            <br />
                            Download Resume here
                          </a>
                        </p>
                      
                    </object>
                )}
                
            </div>
        </div>
    );
}

export default MyModal;