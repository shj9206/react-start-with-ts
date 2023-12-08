import { useState } from "react";
import GoogleMapsWrapper from "@/views/sample/mapSample/GoogleMapsWrapper";
// import { GoogleMaps, geocode } from "@/views/sample/mapSample/GoogleMaps";
import { GoogleMaps } from "@/views/sample/mapSample/GoogleMaps";

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
        add marker
      </button>
      <br />
      <br />
      {text && (
        <GoogleMapsWrapper>
          <GoogleMaps locations={count} mode="locations" />
          <GoogleMaps locations={[]} mode="address" />
          <GoogleMaps locations={[]} mode="current" />
        </GoogleMapsWrapper>
      )}
      {/* <br />
      <button type="button" onClick={() => geocode({ address: " 서울" })}>
        add marker
      </button> */}
    </div>
  );
}
