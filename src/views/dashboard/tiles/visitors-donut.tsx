import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
} from "@progress/kendo-react-charts";
import { TilelayoutType } from "@/utils/resources/tileLayout-data.ts";

type VisitoDonutProps = {
  data: TilelayoutType[];
};
function VisitorsDonut({ data }: VisitoDonutProps) {
  return (
    <Chart style={{ height: "100%" }}>
      <ChartSeries>
        <ChartSeriesItem
          type="donut"
          data={data}
          categoryField="type"
          field="value"
        />
      </ChartSeries>
      <ChartLegend position="bottom" visible />
    </Chart>
  );
}

export default VisitorsDonut;
