import {
  ThermostatRounded,
  OpacityRounded,
  Co2Rounded,
  CompressRounded,
} from "@mui/icons-material";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { WeatherIndicator } from "../../types/weather";

type HeaderViewProps = {
  weatherIndicator: WeatherIndicator | undefined;
};

export const HeaderView = (props: HeaderViewProps) => {
  const { weatherIndicator } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Weather Room
        </Typography>
        <ThermostatRounded />
        <Typography mr={2}>
          {weatherIndicator && weatherIndicator.temperature.current.toFixed(1)}
        </Typography>
        <OpacityRounded />
        <Typography mr={2}>
          {weatherIndicator && weatherIndicator.humidity.current.toFixed(1)}
        </Typography>
        <CompressRounded />
        <Typography mr={2}>
          {weatherIndicator && weatherIndicator.atmosphere.current.toFixed(0)}
        </Typography>
        <Co2Rounded />
        <Typography>
          {weatherIndicator && weatherIndicator.co2.current.toFixed(0)}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
