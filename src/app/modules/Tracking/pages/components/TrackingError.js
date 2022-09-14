import React from "react";

export const TrackingError = () => {
  return (
    <>
      <div>
        <div className="flex justify-center my-8">
          <div className="w-2/3  h-max border-2 border-[#00000021] items-center rounded flex justify-center shadow-lg sm:h-24">
            <div className="card-body text-center p-5 text-xl text-[#989595]">No tracking information found for this Tracking_Id.</div>
          </div>
        </div>
      </div>
    </>
  );
};
