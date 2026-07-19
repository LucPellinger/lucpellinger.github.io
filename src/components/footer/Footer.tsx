// components/common/Footer.jsx
import React from 'react';
import { FaDiscord, FaGithub, FaLinkedin } from 'react-icons/fa';
import hfLogo from '../../assets/Hero/hf-logo.svg'; // adjust path as needed
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">

        <div className="footer__info">
          <h1>Luc Marcel Pellinger</h1>
          <p>Data Science & ML Engineering Enthusiast</p>
        </div>

        <div className="footer__socials">
          <a href="https://www.linkedin.com/in/luc-pellinger/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/LucPellinger" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://huggingface.co/LucMarcelPellinger" target="_blank" rel="noopener noreferrer">
            <img src={hfLogo} alt="Hugging Face" />
          </a>
          {/*
          <a href="#">
            <FaDiscord />
          </a>
          */}
        </div>

        <div className="footer__copyright">
          © Luc Marcel Pellinger, All rights reserved 2025
        </div>

      </div>
    </footer>
  );
};

export default Footer;