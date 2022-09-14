import React from "react";

export default function Spinner() {
  return (
    <div className="flex z-50 inset-0 m-auto h-full w-full items-center justify-center fixed">
      <div className="lds-dual-ring"></div>
    </div>
  );
}
