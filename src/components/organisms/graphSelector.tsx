import {
  ThermostatRounded,
  OpacityRounded,
  Co2Rounded,
  CompressRounded,
} from "@mui/icons-material";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { MetricsType } from "../../types/weather";

type GraphSelectorProps = {
  graphType: MetricsType;
  setGraphType: (v: MetricsType) => void;
};

export const GraphSelector = (props: GraphSelectorProps) => {
  const { graphType, setGraphType } = props;
  return (
    <ToggleButtonGroup
      value={graphType}
      exclusive
      onChange={(e, str) => setGraphType(str)}
      aria-label="text alignment"
    >
      <ToggleButton value="temperature" aria-label="left aligned">
        <ThermostatRounded />
      </ToggleButton>
      <ToggleButton value="humidity" aria-label="centered">
        <OpacityRounded />
      </ToggleButton>
      <ToggleButton value="atmosphere" aria-label="right aligned">
        <CompressRounded />
      </ToggleButton>
      <ToggleButton value="co2" aria-label="justified">
        <Co2Rounded />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
