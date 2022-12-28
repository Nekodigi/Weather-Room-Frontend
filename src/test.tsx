import React from "react";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ScaleChartOptions,
  LineControllerChartOptions,
} from "chart.js";
import { _DeepPartialObject } from "chart.js/dist/types/utils";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options:
  | _DeepPartialObject<
      CoreChartOptions<"line"> &
        ElementChartOptions<"line"> &
        PluginChartOptions<"line"> &
        DatasetChartOptions<"line"> &
        ScaleChartOptions<"line"> &
        LineControllerChartOptions
    >
  | undefined = {
  scales: {
    x: {
      type: "time",
    },
  },
};

const values = [
  {
    x: new Date("2022-12-26T15:07:34.054261Z"),
    y: 100.2,
  },
  {
    x: new Date("2022-12-26T15:17:38.38878Z"),
    y: 102.2,
  },
  {
    x: new Date("2022-12-26T15:27:42.632598Z"),
    y: 105.3,
  },
  {
    x: new Date("2022-12-26T15:37:47.849345Z"),
    y: 104.4,
  },
];

export const data = {
  datasets: [
    {
      data: values,
    },
  ],
};

export default function App2() {
  return <Line options={options} data={data} />;
}
