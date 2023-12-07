import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export default function GoogleMapsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiKey = "AIzaSyCtlJ7pd1qHd5WxnB8J7BMbItUCWvKcsWo";

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
}
