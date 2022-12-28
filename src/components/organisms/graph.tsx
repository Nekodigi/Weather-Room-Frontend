import { useContext, useEffect, useRef, useState } from "react";
import {
  DateValue,
  DateValueXY,
  MetricsType,
  WeatherData,
  WeatherGraph,
} from "../../types/weather";
import { HeaderView } from "./headerView";

import React from "react";
import { GraphView } from "./graphView";
import { Box, Container } from "@mui/material";
import { GraphSelector } from "./graphSelector";
import { WeatherContext } from "../../contexts/weather";

export const Graph = () => {
  const { graph, setGraph, indicator } = useContext(WeatherContext);
  const [graphType, setGraphType] = useState<MetricsType>("temperature");
  const calledOnce = useRef(false);

  const fetchUpdate = async () => {
    console.log(
      `${process.env.REACT_APP_API_URL}/graph?getAll=true&pastDays=2`
    );
    const graph: WeatherGraph = await (
      await fetch(
        `${process.env.REACT_APP_API_URL}/graph?getAll=true&pastDays=1`
      )
    ).json();
    graph.temperature = convertToXY(graph.temperature as DateValue[]);
    graph.humidity = convertToXY(graph.humidity as DateValue[]);
    graph.atmosphere = convertToXY(graph.atmosphere as DateValue[]);
    graph.co2 = convertToXY(graph.co2 as DateValue[]);
    console.log(graph);
    setGraph(graph);
  };

  const convertToXY = (dvList: DateValue[]): DateValueXY[] => {
    return dvList.map((dv) => {
      return { x: dv.date, y: dv.value };
    });
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    fetchUpdate();
    setInterval(fetchUpdate, 60 * 1000);
    return;
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <GraphSelector graphType={graphType} setGraphType={setGraphType} />
      {graph && indicator ? (
        <GraphView
          datas={graph[graphType] as DateValueXY[]}
          criteria={indicator[graphType]}
        />
      ) : undefined}
    </Container>
  );
};
