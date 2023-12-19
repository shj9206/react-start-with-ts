const getRegionSeries = (obj: unknown, name: string) => {
  let EU = 0;
  let US = 0;
  let AU = 0;
  let total = 0;
  const array: number[] = [];
  const temp: { name: string; data: number[] } = {
    name,
    data: [],
  };

  // obj가 배열이고, 각 요소가 region 속성을 가지고 있는지 확인
  if (
    Array.isArray(obj) &&
    obj.every((el) => typeof el === "object" && "region" in el)
  ) {
    const euArray = obj.filter((el) => el.region === "eu");
    const usArray = obj.filter((el) => el.region === "us");
    const auArray = obj.filter((el) => el.region === "au");
    EU = euArray.length + 1;
    US = usArray.length + 1;
    AU = auArray.length + 1;
    total = EU + US + AU;
    array.push(total);
    array.push(EU);
    array.push(US);
    array.push(AU);
    temp.data = array;
  }
  return temp;
};

export { getRegionSeries };
