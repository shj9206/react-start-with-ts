import {
  Chart,
  ChartArea,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
} from "@progress/kendo-react-charts";

function PopularPagesChart() {
  const pages = ["Home", "Price", "Sign-up", "Product", "Blog"];
  const visits = [
    {
      page: "Page",
      visits: [80000, 60000, 30000, 20000, 2000],
    },
  ];

  return (
    <Chart style={{ height: "100%" }}>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem categories={pages} startAngle={45} />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem
          majorUnit={10000}
          max={100000}
          labels={{ step: 5 }}
        />
      </ChartValueAxis>
      <ChartArea background="white" />
      <ChartSeries>
        {visits.map((item) => (
          <ChartSeriesItem key={item.page} type="column" data={item.visits} />
        ))}
      </ChartSeries>
    </Chart>
  );
}

export default PopularPagesChart;
