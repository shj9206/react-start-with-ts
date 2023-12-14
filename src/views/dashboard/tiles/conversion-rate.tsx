import { TilelayoutType } from "@/utils/resources/tileLayout-data.ts";

type ConversionRateProps = {
  data: TilelayoutType[];
};

function ConversionRate({ data }: ConversionRateProps) {
  let conversions = 0;
  let users = 0;
  data.forEach((item: TilelayoutType) => {
    if (item.conversion && item.users) {
      conversions += item.conversion;
      users += item.users;
    }
  });

  return (
    <div>
      <h3>{Math.round(users / conversions)}%</h3>
      <p> Visitor to customer </p>
    </div>
  );
}

export default ConversionRate;
