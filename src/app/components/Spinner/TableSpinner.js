import React from "react";

export default function Spinner({marginTop}) {
  return (
    <div className={`text-center max-w-xs absolute  ${marginTop ? marginTop : "top-[40%]"}  bottom-1/2 left-[46%]`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
}
