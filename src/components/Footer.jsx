import React from 'react';
import { Hammer } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-logo">
        <Hammer size={18} className="logo-icon" />
        <span className="logo-forge">Stream<span className="logo-stream">Forge</span></span>
      </div>
      <div className="footer-links">
        <a href="#about" className="footer-link">About</a>
        <a href="#press" className="footer-link">Press</a>
        <a href="#copyright" className="footer-link">Copyright</a>
        <a href="#creators" className="footer-link">Creators</a>
        <a href="#advertise" className="footer-link">Advertise</a>
        <a href="#developers" className="footer-link">Developers</a>
        <a href="#terms" className="footer-link">Terms</a>
        <a href="#privacy" className="footer-link">Privacy</a>
        <a href="#policy" className="footer-link">Policy & Safety</a>
        <a href="#test" className="footer-link">Test New Features</a>
      </div>
      <p className="footer-copyright">
        &copy; {year} StreamForge LLC. Built as a high-performance React streaming platform.
      </p>
    </footer>
  );
};

export default Footer;
