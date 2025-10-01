import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coinRes = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoin(coinRes.data);

      const historyRes = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: { vs_currency: "usd", days: 7 },
        }
      );

      setHistory(historyRes.data.prices);
    };

    fetchData();
  }, [id]);

  if (!coin) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
        <div>
          <h1 className="text-3xl font-bold">{coin.name}</h1>
          <p className="text-gray-400">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold">
          Current Price: ${coin.market_data.current_price.usd.toLocaleString()}
        </p>
        <p
          className={`font-semibold ${
            coin.market_data.price_change_percentage_24h >= 0
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          24h Change:{" "}
          {coin.market_data.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      <Line
        data={{
          labels: history.map((h) =>
            new Date(h[0]).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          ),
          datasets: [
            {
              label: `${coin.name} Price (7d)`,
              data: history.map((h) => h[1]),
              borderColor: "rgb(234,179,8)", // yellow-400
              backgroundColor: "rgba(234,179,8,0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  );
}

export default CoinDetail;
