import { useEffect, useRef, useState } from "react";
import { WeatherData, WeatherIndicator } from "../../types/weather";
import { HeaderView } from "./headerView";

export const Header = () => {
  const calledOnce = useRef(false);
  const [weatherIndicator, setWeatherIndicator] = useState<WeatherIndicator>();

  const fetchUpdate = async () => {
    console.log(`${process.env.REACT_APP_API_URL}/indicator`);
    const indicator: WeatherIndicator = await (
      await fetch(`${process.env.REACT_APP_API_URL}/indicator`)
    ).json();
    console.log(indicator);
    setWeatherIndicator(indicator);
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    fetchUpdate();
    setInterval(fetchUpdate, 60 * 1000);
    return;
  }, []);

  return <HeaderView weatherIndicator={weatherIndicator} />;
};
