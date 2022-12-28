import { useContext, useEffect, useRef, useState } from "react";
import { WeatherContext, WeatherContextProps } from "../../contexts/weather";
import { WeatherData, WeatherIndicator } from "../../types/weather";
import { HeaderView } from "./headerView";

export const Header = () => {
  const calledOnce = useRef(false);
  const { indicator, setIndicator } = useContext(WeatherContext);

  const fetchUpdate = async () => {
    console.log(`${process.env.REACT_APP_API_URL}/indicator`);
    const indicator: WeatherIndicator = await (
      await fetch(`${process.env.REACT_APP_API_URL}/indicator`)
    ).json();
    console.log(indicator);
    setIndicator(indicator);
  };

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;
    fetchUpdate();
    setInterval(fetchUpdate, 60 * 1000);
    return;
  }, []);

  return <HeaderView weatherIndicator={indicator} />;
};
