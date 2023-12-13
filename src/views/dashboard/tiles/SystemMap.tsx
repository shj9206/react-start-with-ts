import { Button } from "@progress/kendo-react-buttons";
import GoogleMapsWrapper from "@/components/map/GoogleMapsWrapper.tsx";
import { MapMarkers } from "@/components/map/MapMarkers.tsx";
import { MapAddress } from "@/components/map/MapAddress.tsx";
import { MapCurrent } from "@/components/map/MapCurrent.tsx";
import { LOCATIONS } from "@/views/sample/mapSample/MapComponent.tsx";

export default function SystemMap() {
  return (
    <>
      <GoogleMapsWrapper>
        <MapMarkers locations={LOCATIONS} />
        <MapAddress address="서울시" />
        <MapCurrent />
      </GoogleMapsWrapper>
      <Button>Alert</Button>
      <Button>Activated</Button>
      <Button>Alert</Button>
    </>
  );
}
