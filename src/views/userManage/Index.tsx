import { useSelector } from "react-redux";

export default function Index() {
  const region = useSelector(({ auth }) => auth.region);
  return <div>{region}</div>;
}
