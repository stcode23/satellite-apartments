import React from "react";

function Map() {
  // Properly encode the address for Google Maps URL
  const address =
    "Satellite Apartment, Awori Street, Satellite Town, Lagos, Nigeria";
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        title="Google Map"
        src={mapSrc}
        style={{ border: 0, width: "100%", height: "100%" }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default Map;
