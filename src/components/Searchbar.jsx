import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="my-6 flex justify-center">
      <input
        type="text"
        placeholder="Search crypto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-80 p-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
    </div>
  );
}

export default SearchBar;
