import { useState, useCallback } from "react";

import {
  DateRangePicker,
  DateRangePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import Chart from "@/components/kendo/chart/Chart.tsx";

export default function KendoChart() {
  const [range, setRange] = useState({
    start: new Date("2020-01-01T21:00:00.000Z"),
    end: new Date("2020-04-29T21:00:00.000Z"),
  });
  const onRangeChange = useCallback(
    (event: DateRangePickerChangeEvent) => {
      setRange({
        start: new Date(event.value.start!),
        end: new Date(event.value.end!),
      });
    },
    [setRange],
  );

  return (
    <div id="Dashboard" className="dashboard-page main-content">
      <div className="card-container grid">
        <h3 className="card-title">Team Efficiency</h3>
        {/* <div className="card-buttons"> */}
        {/*   <ButtonGroup> */}
        {/*     <Button togglable selected={isTrend} onClick={trendOnClick}> */}
        {/*       Trend */}
        {/*     </Button> */}
        {/*     <Button togglable selected={!isTrend} onClick={volumeOnClick}> */}
        {/*       Volume */}
        {/*     </Button> */}
        {/*   </ButtonGroup> */}
        {/* </div> */}
        <div className="card-ranges">
          <DateRangePicker value={range} onChange={onRangeChange} />
        </div>
        <div className="card-component">
          <div className="row mb-3">
            <div className="col-6">
              <Chart seriesType="line" />
            </div>
            <div className="col-6">
              <Chart seriesType="column" />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Chart seriesType="pie" />
            </div>
            <div className="col-6">
              <Chart seriesType="bar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
