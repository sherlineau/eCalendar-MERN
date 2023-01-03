import React from "react";
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <p>Designed & Developed by Sherline Au</p>
        <p>&copy; 2021 - {new Date().getFullYear()}</p>
        <ul className="footer-link">
          <li>
            <a
              href="https://www.linkedin.com/in/sherlineau/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <BsLinkedin className="social-icon" />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/sherlineau"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <BsGithub className="social-icon" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/sherlineau"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <BsInstagram className="social-icon" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;