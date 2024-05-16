import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line as MuiLine,
} from "recharts";

interface TimeSeriesData {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
}

interface TimeSeries {
  [dateTime: string]: TimeSeriesData;
}

interface StockData {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Interval": string;
    "5. Output Size": string;
    "6. Time Zone": string;
  };
  "Time Series (5min)": TimeSeries;
}

const Stock: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartDate, setChartDate] = useState<string>("");

  useEffect(() => {
    getStockData("IBM");
  }, []);

  const getStockData = async (symbol: string) => {
    try {
      const response = await axios.get<StockData>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=demo`
      );
      prepareChartData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const prepareChartData = (data: StockData) => {
    const timeSeries = data["Time Series (5min)"];
    const chartData = Object.keys(timeSeries).map((dateTime) => ({
      time: dateTime,
      close: parseFloat(timeSeries[dateTime]["4. close"]),
    }));
    setChartData(chartData);

    // Extract the date from the first data point
    if (chartData.length > 0) {
      const firstDataPoint = new Date(chartData[0].time);
      const formattedDate = `${firstDataPoint.toDateString()} ${firstDataPoint.toLocaleTimeString()}`;
      setChartDate(formattedDate);
    }
  };

  const margin = 0.2;
  const minY = Math.min(...chartData.map((data) => data.close));
  const maxY = Math.max(...chartData.map((data) => data.close));

  const yMin = minY - margin * (maxY - minY);
  const yMax = maxY + margin * (maxY - minY);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <h2 style={{ textAlign: "center", color: "#333" }}>Stock Data</h2>
        {chartData.length > 0 && (
          <>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              {chartDate}
            </div>
            <LineChart
              width={window.innerWidth * 0.9}
              height={window.innerHeight * 0.8}
              data={chartData}
              margin={{ top: 20, right: 50, left: 20, bottom: 20 }}
            >
              <XAxis
                dataKey="time"
                tickFormatter={(time) => new Date(time).toLocaleTimeString()} // Format ticks to display only time
                tick={{ fontSize: 12, fill: "#555" }}
                interval={Math.round(chartData.length / 10)} // Adjust interval dynamically
              />
              <YAxis
                domain={[yMin, yMax]}
                tick={{ fontSize: 12, fill: "#555" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                }}
              />
              <Legend />
              <MuiLine
                type="monotone"
                dataKey="close"
                stroke="#007bff"
                strokeWidth={2}
                dot={{ fill: "#007bff", strokeWidth: 2 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </>
        )}
      </div>
    </div>
  );
};

export default Stock;
