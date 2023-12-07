import React, { useEffect, useRef } from "react";

const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
const DEFAULT_ZOOM = 15;

interface MapProp {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  mode: string;
}

export const addSingleMarkers = ({
  locations,
  map,
}: {
  locations: ReadonlyArray<google.maps.LatLngLiteral>;
  map: google.maps.Map | null | undefined;
}) => {
  map?.setZoom(6);
  locations.map(
    (position) =>
      new google.maps.Marker({
        position,
        map,
      })
  );
};

function codeAddress({
  map,
}: // address,
{
  map: google.maps.Map;
  // address: string;
}) {
  const infowindow = new google.maps.InfoWindow({
    content: "text",
    ariaLabel: "zzz",
  });
  const geocoder = new google.maps.Geocoder();
  // const address = document.getElementById("address").value;
  geocoder.geocode({ address: "서울 동작구 현충로 210" }, (results, status) => {
    if (status === "OK" && results !== null) {
      map.setCenter(results[0].geometry.location);
      const marker = new google.maps.Marker({
        map,
        position: results[0].geometry.location,
        icon: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png", // 마커 아이콘 변경 (생략가능)
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    } else {
      alert(`Geocode was not successful for the following reason: ${status}`);
    }
  });
}
function currentPosition({ map }: { map: google.maps.Map }) {
  const marker = new google.maps.Marker({
    map,
  });
  const infowindow = new google.maps.InfoWindow({
    ariaLabel: "zzz",
  });
  const geocoder = new google.maps.Geocoder();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        marker.setPosition(pos);
        map.setCenter(pos);

        geocoder
          .geocode({ location: pos })
          .then((response) => {
            if (response.results[0]) {
              infowindow.setContent(response.results[0].formatted_address);
              infowindow.open(map, marker);
            } else {
              window.alert("No results found");
            }
          })
          .catch((e) => window.alert(`Geocoder failed due to: ${e}`));
      },
      () => {}
    );
  }
}

export function GoogleMaps({ locations, mode }: MapProp) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Display the map
    if (ref.current) {
      const map = new google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        disableDefaultUI: true,
      });

      console.log("fwefwffe", mode);
      if (mode === "locations") {
        addSingleMarkers({ locations, map }); // 일반 마커 표시
      } else if (mode === "current") {
        currentPosition({ map }); // 내 현재 위치 표시
      } else {
        codeAddress({ map }); // 주소로 지도에 위치 표시
      }
    }
  }, [ref, locations, mode]);

  return <div ref={ref} style={{ width: "700px", height: "500px" }} />;
}
