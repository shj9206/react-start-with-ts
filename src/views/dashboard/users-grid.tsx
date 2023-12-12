import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { TilelayoutType } from "@/utils/resources/tileLayout-data.ts";

type UsersChartProps = {
  data: TilelayoutType[];
};

function UsersChart({ data }: UsersChartProps) {
  return (
    <Grid style={{ height: "100%" }} data={data} scrollable="scrollable">
      <Column field="channel" title="Channel" />
      <Column field="users" title="Number Of Users" />
    </Grid>
  );
}

export default UsersChart;
