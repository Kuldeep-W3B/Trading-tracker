import React from "react";

function Header() {
  return (
    <header className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-400">CryptoTracker</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-yellow-400">Home</a></li>
            <li><a href="/" className="hover:text-yellow-400">Markets</a></li>
            <li><a href="/" className="hover:text-yellow-400">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
