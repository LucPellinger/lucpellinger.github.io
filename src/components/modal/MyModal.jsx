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
                {/*<iframe src="/resume.pdf" width="100%" height="600px"></iframe>*/}
                {/*<embed src="/resume.pdf" width="100%" height="600px" type="application/pdf" />*/}
                {isMobile ? (
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-modal"
                    >
                        <Download />
                        Open PDF
                    </a>
                ) : (
                    <object
                        data="/resume.pdf"
                        type="application/pdf"
                        className="pdf-viewer"
                    >
                        <p>
                            Your browser doesn’t support PDFs. Please download it here:{" "}
                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                                Download PDF
                            </a>
                        </p>
                    </object>
                )}
                
            </div>
        </div>
    );
}

export default MyModal;