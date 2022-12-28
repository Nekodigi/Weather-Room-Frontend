import "chartjs-adapter-moment";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ElementChartOptions,
  CoreChartOptions,
  PluginChartOptions,
  DatasetChartOptions,
  ScaleChartOptions,
  LineControllerChartOptions,
  TimeScale,
  ChartData,
  ChartDatasetProperties,
  ChartArea,
  CoreScaleOptions,
  Scale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { DateValueXY } from "../../types/weather";
import { green, lightGreen, red, yellow } from "@mui/material/colors";
import { MapRange } from "../../utils/math";

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
//   | undefined
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
      time: {
        unit: "hour",
      },
    },
  },
};

type GraphViewProps = {
  datas: DateValueXY[];
};

export const GraphView = (props: GraphViewProps) => {
  const { datas } = props;

  let width = 0,
    height = 0,
    gradient: any;
  function getGradient(
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea,
    Yscales: Scale<CoreScaleOptions>
  ) {
    if (!gradient || width !== chartArea.width || height !== chartArea.height) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      width = chartArea.width;
      height = chartArea.height;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      console.log(MapRange(18, Yscales.min, Yscales.max, 0, 1));
      gradient.addColorStop(0.2, red["500"]);
      gradient.addColorStop(0.8, lightGreen["A700"]);
    }

    return gradient;
  }

  const data: ChartData<"line"> = {
    // labels,
    datasets: [
      {
        label: "Today",
        data: datas as any,
        borderColor: "rgb(255, 99, 132)",
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};
