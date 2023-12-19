import {
  Chart as KendoChart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  SeriesStack,
} from "@progress/kendo-react-charts";

type PropsType = {
  seriesType: "bar" | "line" | "area" | "column" | "pie";
  stack?: SeriesStack;
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
};
export default function Chart(props: PropsType) {
  const { seriesType, categories, series, stack } = props;
  return (
    <KendoChart style={{ height: 450 }}>
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
            stack={stack}
          />
        ))}
      </ChartSeries>
    </KendoChart>
  );
}
Chart.defaultProps = {
  stack: null, // 또는 적절한 기본 스택 설정
};
