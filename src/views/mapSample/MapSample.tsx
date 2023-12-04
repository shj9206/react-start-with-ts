interface Aprops {
  latitude: number;
  longitude: number;
}

function Map({ latitude, longitude }: Aprops) {
  const generateMapUrl = (lat: number, lng: number): string => {
    const baseUrl = "https://www.google.com/maps/embed/v1/view";
    const apiKey = "AIzaSyCtlJ7pd1qHd5WxnB8J7BMbItUCWvKcsWo";
    const location = `${lat},${lng}`;
    const zoom = 15;
    return `${baseUrl}?key=${apiKey}&center=${location}&zoom=${zoom}`;
  };

  return (
    <iframe
      title="Google Maps"
      width="600"
      height="450"
      // frameBorder="0"
      style={{ border: 0 }}
      src={generateMapUrl(latitude, longitude)}
      allowFullScreen
    />
  );
}

export default Map;
