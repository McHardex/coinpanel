import React from "react";
import { TVChartContainer } from "./components/TVChartContainer";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">TradingView Charting CoinPanel</h1>
      </header>
      <TVChartContainer />
    </div>
  );
};

export default App;
