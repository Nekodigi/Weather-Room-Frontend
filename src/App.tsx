import React, { createContext, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./components/organisms/layout";
import { Graph } from "./components/organisms/graph";
import { WeatherGraph, WeatherIndicator } from "./types/weather";
import { WeatherContext, WeatherContextProps } from "./contexts/weather";

function App() {
  const [indicator, setIndicator] = useState<WeatherIndicator>();
  const [graph, setGraph] = useState<WeatherGraph>();
  const IndicatorContextValue = { indicator, setIndicator, graph, setGraph };

  return (
    <WeatherContext.Provider value={IndicatorContextValue}>
      <Layout>
        <div className="App">
          <Graph />
        </div>
      </Layout>
    </WeatherContext.Provider>
  );
}

export default App;
