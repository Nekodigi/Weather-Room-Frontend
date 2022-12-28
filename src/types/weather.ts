type MetricsType = "temperature" | "humidity" | "atmosphere" | "co2";

type WeatherData = {
  temperature: number;
  humidity: number;
  atmosphere: number;
  co2: number;
};

type WeatherGraph = {
  temperature: DateValue[] | DateValueXY[];
  humidity: DateValue[] | DateValueXY[];
  atmosphere: DateValue[] | DateValueXY[];
  co2: DateValue[] | DateValueXY[];
};

type DateValue = {
  date: Date;
  value: number;
};

type DateValueXY = {
  x: Date;
  y: number;
};

type WeatherIndicator = {
  date: Date;
  temperature: Indicator;
  humidity: Indicator;
  atmosphere: Indicator;
  co2: Indicator;
};

type Indicator = {
  current: number;
  warnL: number;
  goodL: number;
  goodH: number;
  warnH: number;
  status: number;
};

export type {
  WeatherData,
  DateValue,
  DateValueXY,
  WeatherGraph,
  MetricsType,
  WeatherIndicator,
  Indicator,
};
