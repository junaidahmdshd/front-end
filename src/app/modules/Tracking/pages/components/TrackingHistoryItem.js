import React from "react";
import moment from "moment";
import dateIcon from "../../../../../assets/icons/date-icon.svg";

export const TrackingHistoryItem = ({ checkPointTime, location, message, tag }) => {
  return (
    <li className="py-2 px-4  flex flex-col items-start border-gray-200 sm:flex-row sm:items-center">
      <div className="py-2 px-1 md:px-4 flex flex-col">
        <span className="text-[#989595] w-28 text-left md:text-right">{moment(checkPointTime).format("MMMM DD, YYYY")}</span>
        <span className="text-left text-[#989595] md:text-right">{moment(checkPointTime).format("HH:mm")}</span>
      </div>
      <span className="   p-2 rounded-full bg-[#51BBF04D]">
        {" "}
        <img className="  bg-blue-200" src={dateIcon} alt="Logo" />
      </span>
      <div className="py-2 px-1 flex flex-col sm:px-4">
        <span>
          <p className="text-normalfont-semibold text-gray-900 dark:text-white">{tag}</p>
        </span>
        <span>
          <p className="text-[#707070C2] text-normal">{location}</p>
        </span>
        <span>
          <p className="text-[#707070C2] text-normal">{message}</p>
        </span>
      </div>
    </li>
  );
};
