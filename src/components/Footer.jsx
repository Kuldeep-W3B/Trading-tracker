import React from "react";

function Footer() {
  return (
    <div className="bg-gray-800 p-4 text-center text-sm text-gray-400">
      <p>© {new Date().getFullYear()} CryptoTracker. Built with ❤️ using React & Tailwind.</p>
    </div>
  );
}

export default Footer;
