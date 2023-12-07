import {
  Chart as KendoChart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from "@progress/kendo-react-charts";

type PropsType = {
  seriesType: "bar" | "line" | "area" | "column" | "pie";
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
};
export default function Chart(props: PropsType) {
  const { seriesType, categories, series } = props;
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
