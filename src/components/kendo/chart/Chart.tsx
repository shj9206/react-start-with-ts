import {
  Chart as KendoChart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";

const categories = [2002, 2003, 2004];
const series = [
  {
    name: "India",
    data: [3.907, 7.943, 7.848],
  },
  {
    name: "Russian Federation",
    data: [4.743, 7.295, 7.175],
  },
  {
    name: "Germany",
    data: [0.21, 0.375, 1.161],
  },
  {
    name: "World",
    data: [1.988, 2.733, 3.994],
  },
];

type PropsType = {
  seriesType: "bar" | "line" | "area" | "column" | "pie";
};
export default function Chart(props: PropsType) {
  const { seriesType } = props;
  return (
    <div className="k-card">
      <KendoChart style={{ height: 350 }}>
        <ChartTitle text="Column Chart" />
        <ChartLegend position="bottom" orientation="horizontal" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={categories} startAngle={45} />
        </ChartCategoryAxis>
        <ChartSeries>
          {series.map((item) => (
            <ChartSeriesItem
              key={item.name}
              type={seriesType}
              tooltip={{ visible: true }}
              data={item.data}
              name={item.name}
            />
          ))}
        </ChartSeries>
      </KendoChart>
    </div>
  );
}
