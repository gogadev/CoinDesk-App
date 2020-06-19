import React, { useState, useEffect } from "react";

import Chart from "react-apexcharts";

import Header from "./components/header/Header";

import { Select } from "semantic-ui-react";

import spinner from "./assets/spinner.gif";

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [series, setSeries] = useState(null);
  const [disclaimer, setDisclaimer] = useState(null);

  const options = [
    { value: "USD", text: "USD" },
    { value: "EUR", text: "EUR" },
    { value: "GBP", text: "GBP" },
  ];

  useEffect(() => {
    async function fetchPrices() {
      const res = await fetch(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      const data = await res.json();
      setCurrency(data.bpi.USD.code);
      setPriceData(data.bpi);
      setDisclaimer(data.disclaimer);
      getChartData();
    }
    fetchPrices();
  }, []);

  const getChartData = async () => {
    const res = await fetch(
      `https://api.coindesk.com/v1/bpi/historical/close.json?`
    );
    const data = await res.json();
    const categories = Object.keys(data.bpi);
    const series = Object.values(data.bpi);
    setChartData({
      xaxis: {
        categories: categories,
      },
    });
    setSeries([{ name: "Bitcoin Price", data: series }]);
    setLoading(false);
  };

  const handleSelect = (e, data) => {
    setCurrency(data.value);
  };

  return (
    <React.Fragment>
      <Header />
      {loading ? (
        <div className="loading">
          <img src={spinner} alt="" />
        </div>
      ) : (
        <div className="container">
          <div className="form">
            <Select
              id="select"
              placeholder="Select Your Currency"
              onChange={handleSelect}
              options={options}
            />
          </div>
          <div className="card">
            <div className="info">
              <h2 className="subtitle">{currency} Price</h2>
              <h3 className="rate">{priceData[currency].rate}</h3>
            </div>
            <div className="chart">
              <Chart options={chartData} series={series} type="line" />
            </div>
          </div>
          <div className="disclaimer">
            <h5 className="disclaimer-title"> *{disclaimer}*</h5>
            <h5 className="disclaimer-subtitle">
              <a href="https://www.coindesk.com/price/bitcoin" target="blank">
                Powered by CoinDesk
              </a>
            </h5>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default App;
