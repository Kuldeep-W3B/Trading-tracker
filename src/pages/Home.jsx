import React, { useEffect, useState } from "react";
import CryptoCard from "../components/crycard";
import SearchBar from "../components/Searchbar";
import axios from "axios";

function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );

      setCoins(
        res.data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          image: coin.image,
          current_price: coin.current_price,
          price_change_percentage_24h: coin.price_change_percentage_24h,
        }))
      );

      const streams = res.data.map((c) => `${c.symbol}usdt@ticker`).join("/");
      const socket = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${streams}`
      );

      socket.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        const coinData = parsed.data;

        const updatedCoin = {
          symbol: coinData.s.replace("USDT", ""),
          current_price: parseFloat(coinData.c),
          price_change_percentage_24h: parseFloat(coinData.P),
        };

        setCoins((prev) =>
          prev.map((coin) =>
            coin.symbol === updatedCoin.symbol
              ? { ...coin, ...updatedCoin }
              : coin
          )
        );
      };

      return () => socket.close();
    };

    fetchCoins();
  }, []);

  // 1. Filter coins by search
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // 2. Pagination logic
  const indexOfLastCoin = currentPage * coinsPerPage;
  const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin);
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">
        Live Crypto Prices (Top {coins.length})
      </h2>

      <SearchBar search={search} setSearch={setSearch} />

      {/* Coins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCoins.map((coin) => (
          <CryptoCard key={coin.id} coin={coin} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-black-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-black-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-black-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
