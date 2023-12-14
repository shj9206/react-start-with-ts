import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import GoogleMapsWrapper from "@/components/map/GoogleMapsWrapper.tsx";
import { MapMarkers } from "@/components/map/MapMarkers.tsx";

type LocationType = {
  lat: number;
  lng: number;
  stat: string;
};
export default function SystemMap() {
  const data: LocationType[] = [
    { lat: 48.8566, lng: 2.3522, stat: "alert" },
    { lat: 47.1533, lng: 2.9123, stat: "alert" },
    { lat: 37.5665, lng: 30.978, stat: "progress" },
    { lat: 35.5665, lng: 50.978, stat: "progress" },
    { lat: 36.5665, lng: 70.978, stat: "activate" },
    { lat: 37.5665, lng: 40.978, stat: "activate" },
  ];
  const [location, setLocation] = useState<LocationType[]>(data);
  const filterLocation = (stat: string) => {
    const filterArray = data.filter((el) => el.stat === stat);
    setLocation(filterArray);
  };
  return (
    <>
      <GoogleMapsWrapper>
        <MapMarkers locations={location} />
        {/* <MapAddress address="서울시" /> */}
        {/* <MapCurrent /> */}
      </GoogleMapsWrapper>
      <Button onClick={() => filterLocation("alert")}>Alert</Button>
      <Button onClick={() => filterLocation("activate")}>Activated</Button>
      <Button onClick={() => filterLocation("progress")}>In Progress</Button>
    </>
  );
}
