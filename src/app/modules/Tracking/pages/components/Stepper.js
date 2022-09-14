import React from "react";

const Stepper = ({ activeStep }) => {
  const commonClasses = "rounded-full h-5 w-5 sm:h-6 sm:w-6 ";

  const activeStepClasses = " border-4 bg-[#E4ECEF] active border-[#1482BA]";
  const completedStepClasses = " border-4 bg-[#1482BA] fulfilled border-[#1482BA]";
  const pendingStepClasses = " border-4 bg-[#E4ECEF] pending";
  return (
    <div className="mx-auto container mt-0 sm:mt-6">
      <div className="mx-12  p-4 flex flex-row justify-start overflow-x-scroll sm:justify-center sm:mx-auto">
        <div className=" h-12 w-auto sm:w-3/4 ">
          <div className="flex float-left items-center flex-row  w-[700px] sm:w-auto  sm:float-none">
            <div className="flex items-center text-gray-400 relative">
              <div className={`${commonClasses} ${activeStep === 1 ? activeStepClasses : completedStepClasses}`}></div>
              <div className="absolute  -ml-4  w-auto lg:w-max   text-center  text-xs font-medium capitalize mt-16  text-[#707070]  ">Pending</div>
            </div>
            <div className="  flex-auto bg-gray-200 border-4 "></div>
            <div className="flex items-center relative">
              <div className={`${commonClasses} ${activeStep === 2 ? activeStepClasses : activeStep < 2 ? pendingStepClasses : completedStepClasses}`}></div>
              <div
                className={`absolute   -ml-4   w-auto lg:w-max   text-center  text-xs font-medium capitalize mt-16    lg:-ml-8 ${activeStep === 2 ? "text-normalfont-semibold text-gray-900 dark:text-white" : activeStep < 2 ? "text-[#7070707D]" : "text-[#707070]"
                  }`}>
                Info Received
              </div>
            </div>
            <div className="  flex-auto bg-gray-200 border-4  border-[#E4ECEF]"></div>
            <div className="flex items-center text-gray-400 relative">
              <div className={`${commonClasses} ${activeStep === 3 ? activeStepClasses : activeStep < 3 ? pendingStepClasses : completedStepClasses}`}></div>
              <div
                className={`absolute   ml-[-8px]   w-auto lg:w-max   text-center  text-xs font-medium capitalize mt-16   lg:-ml-4  ${activeStep === 3 ? "text-normalfont-semibold text-gray-900 dark:text-white" : activeStep < 3 ? "text-[#7070707D]" : "text-[#707070]"
                  }`}>
                In Transit
              </div>
            </div>
            <div className="  flex-auto bg-gray-200 border-4  border-[#E4ECEF]"></div>
            <div className="flex items-center text-gray-400 relative">
              <div className={`${commonClasses} ${activeStep === 4 ? activeStepClasses : activeStep < 4 ? pendingStepClasses : completedStepClasses}`}></div>
              <div
                className={`absolute   -ml-4    w-auto lg:w-max  text-center  text-xs font-medium capitalize mt-16  lg:-ml-8 ${activeStep === 4 ? "text-normalfont-semibold text-gray-900 dark:text-white" : activeStep < 4 ? "text-[#7070707D]" : "text-[#707070]"
                  }`}>
                Out for Delivery
              </div>
            </div>
            <div className="  flex-auto bg-gray-200 border-4  border-[#E4ECEF]"></div>
            <div className="flex items-center text-gray-400 relative">
              <div className={`${commonClasses} ${activeStep === 5 ? activeStepClasses : activeStep < 5 ? pendingStepClasses : completedStepClasses}`}></div>
              <div
                className={`absolute   -ml-4   w-auto lg:w-max   text-center  text-xs font-medium capitalize mt-16  ${activeStep === 5 ? "text-normalfont-semibold text-gray-900 dark:text-white" : activeStep < 5 ? "text-[#7070707D]" : "text-[#707070]"
                  }`}>
                Exception
              </div>
            </div>
            <div className="  flex-auto bg-gray-200 border-4  border-[#E4ECEF]"></div>
            <div className="flex items-center text-gray-400 relative">
              <div className={`${commonClasses} ${activeStep === 6 ? activeStepClasses : activeStep < 6 ? pendingStepClasses : completedStepClasses}`}></div>
              <div
                className={`absolute   -ml-4   w-auto lg:w-max   text-center  text-xs font-medium capitalize mt-16  ${activeStep === 6 ? "text-normalfont-semibold text-gray-900 dark:text-white" : activeStep < 6 ? "text-[#7070707D]" : "text-[#707070]"
                  }`}>
                Delivered
              </div>
            </div>
            <div className="  flex-auto bg-gray-200 border-4  border-[#E4ECEF]"></div>
            <div className="flex items-center text-gray-400 relative">
              <div className={`${commonClasses} ${activeStep === 7 ? activeStepClasses : activeStep < 7 ? pendingStepClasses : completedStepClasses}`}></div>
              <div
                className={`absolute   -ml-4   w-auto lg:w-max   text-center  text-xs font-medium capitalize mt-16  ${activeStep === 7 ? "text-normalfont-semibold text-gray-900 dark:text-white" : activeStep < 7 ? "text-[#7070707D]" : "text-[#707070]"
                  }`}>
                Returned
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
