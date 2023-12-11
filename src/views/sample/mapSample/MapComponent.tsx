import { useState } from "react";
import GoogleMapsWrapper from "@/components/map/GoogleMapsWrapper";
import { MapMarkers } from "@/components/map/MapMarkers";
import { MapAddress } from "@/components/map/MapAddress";
import { MapCurrent } from "@/components/map/MapCurrent";

export const LOCATIONS = [
  { lat: 48.8566, lng: 2.3522 },
  { lat: 47.1533, lng: 2.9123 },
  { lat: 37.5665, lng: 126.978 },
];

export default function MapComponent() {
  const [count, setCount] = useState(LOCATIONS);
  const [text, setText] = useState(false);
  const check = text;
  return (
    <div>
      <button type="button" onClick={() => setText(!check)}>
        {/* <button
        type="button"
        onClick={() => setCount(count.concat([{ lat: 48.1533, lng: 2.7023 }]))}
      > */}
        show map
      </button>
      <br />
      <br />
      {text && (
        <GoogleMapsWrapper>
          <MapMarkers locations={count} />
          <MapAddress address="서울시" />
          <MapCurrent />
        </GoogleMapsWrapper>
      )}
      {/* <br />
      <button type="button" onClick={() => geocode({ address: " 서울" })}>
        add marker
      </button> */}
    </div>
  );
}
