import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-100 border-t-2 border-green-300 mt-[5%] relative">
      <div className="container mx-auto text-center">
        <p className="text-sm text-green-800">&copy; 2025 Jana Sewa. All rights reserved.</p>
        <nav className="">
          <a href="#" className="text-green-800 hover:underline mx-3 text-sm">
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
