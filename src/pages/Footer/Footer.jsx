import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
     
      <div className="gradient-border">
        <div className="bg-black  px-6 py-4 flex flex-col items-center">
      
          <p className="gradient-text text-lg font-bold typing-effect">
            &copy; {currentYear} Made with <span className="">❤️</span> Essa Ehaan
          </p>

          {/* Social Links */}
          <div className="flex gap-6 mt-3">
            <a
              href="https://www.github.com/essaehaan"
              target="_blank"
              rel="noreferrer"
              className="nav-link text-gray-300 hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/essehaan"
              target="_blank"
              rel="noreferrer"
              className="nav-link text-gray-300 hover:text-white transition"
            >
              LinkedIn
            </a>
            <a
              href="mailto:developeressaehaan@gmail.com"
              className="nav-link text-gray-300 hover:text-white transition"
            >
              Email
            </a>
          </div>
        </div>
      </div>

 
    </footer>
  );
};

export default Footer;
