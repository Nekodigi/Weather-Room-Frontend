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
  Plugin,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { DateValueXY, Indicator } from "../../types/weather";
import { green, lightGreen, red, yellow } from "@mui/material/colors";
import { MapRange } from "../../utils/math";
import { alpha } from "@mui/material";
import { useEffect, useRef } from "react";

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
  criteria: Indicator;
};

export const GraphView = (props: GraphViewProps) => {
  const { datas, criteria } = props;
  const criteriaRef = useRef(criteria);
  useEffect(() => {
    criteriaRef.current = criteria;
  }, [criteria]);

  //https://www.youtube.com/watch?v=-CDz5OcXU2U&ab_channel=ChartJS
  const criteriaLines: Plugin<"line"> = {
    id: "criteriaLines",
    beforeDraw(chart, args, options) {
      const {
        ctx,
        chartArea: { top, bottom, left, right, width, height },
        scales: { x, y },
      } = chart;
      ctx.save();

      var t1 = chart.getDatasetMeta(0).yScale?.min;
      var t2 = chart.getDatasetMeta(0).yScale?.max;
      var ymin = t1 ? t1 : 0;
      var ymax = t2 ? t2 : 0;
      const clampY = (value: number) => {
        return Math.min(ymax, Math.max(ymin, value));
      };

      var pixelMax = y.getPixelForValue(ymin);
      var pixelMin = y.getPixelForValue(ymax);
      var ywl = y.getPixelForValue(clampY(criteriaRef.current.warnL));
      var ygl = y.getPixelForValue(clampY(criteriaRef.current.goodL));
      var ygh = y.getPixelForValue(clampY(criteriaRef.current.goodH));
      var ywh = y.getPixelForValue(clampY(criteriaRef.current.warnH));

      ctx.fillStyle = alpha(red["700"], 0.1);
      ctx.fillRect(left, ywl, width, pixelMax - ywl);
      ctx.fillStyle = alpha(yellow["500"], 0.1);
      ctx.fillRect(left, ygl, width, ywl - ygl);
      ctx.fillStyle = alpha(lightGreen["A700"], 0.1);
      ctx.fillRect(left, ygl, width, ygh - ygl);
      ctx.fillStyle = alpha(yellow["500"], 0.1);
      ctx.fillRect(left, ygh, width, ywh - ygh);
      ctx.fillStyle = alpha(red["700"], 0.1);
      ctx.fillRect(left, ywh, width, pixelMin - ywh);
    },
  };

  const data: ChartData<"line"> = {
    // labels,
    datasets: [
      {
        label: "Today",
        data: datas as any,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} plugins={[criteriaLines]} />;
};
