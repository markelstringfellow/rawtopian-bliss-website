import React from "react";

/*
  Reference the image from the public/ folder so the Vite build won't fail
  if the asset is missing from src/assets or has a case mismatch on CI.
  Place the actual image at public/images/Food11.JPG (exact case)
  or update the path below if you choose a different location/filename.
*/

export default function GetDelivered() {
  const imageSrc = "/images/Food11.JPG"; // expected at public/images/Food11.JPG

  return (
    <section className="get-delivered">
      <h2>Get Delivered</h2>
      <img src={imageSrc} alt="Food dish" />
      {/* other component content */}
    </section>
  );
}