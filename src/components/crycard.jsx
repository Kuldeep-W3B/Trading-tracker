import React from "react";
import { Link } from "react-router-dom";

function CryptoCard({ coin }) {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="bg-gray-800 p-5 rounded-xl shadow-md hover:scale-105 transition cursor-pointer">
        <div className="flex items-center space-x-4">
          <img src={coin.image} alt={coin.name} className="w-12 h-12" />
          <div>
            <h2 className="text-lg font-semibold">{coin.name}</h2>
            <p className="text-sm text-gray-400">{coin.symbol}</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xl font-bold">
            ${coin.current_price?.toLocaleString()}
          </p>
          <p
            className={`text-sm font-semibold ${
              coin.price_change_percentage_24h >= 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {coin.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CryptoCard;
