import { createContext, useContext, useState } from "react";
import { WeatherGraph, WeatherIndicator } from "../types/weather";

type WeatherContextProps = {
  indicator: WeatherIndicator | undefined;
  setIndicator: (weatherIndicator: WeatherIndicator) => void;
  graph: WeatherGraph | undefined;
  setGraph: (weatherGraph: WeatherGraph) => void;
};

const WeatherContext = createContext<WeatherContextProps>(
  {} as WeatherContextProps
);

export type { WeatherContextProps };
export { WeatherContext };
