import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Layout } from "./components/organisms/layout";
import { Graph } from "./components/organisms/graph";

function App() {
  return (
    <Layout>
      <div className="App">
        <Graph />
      </div>
    </Layout>
  );
}

export default App;
