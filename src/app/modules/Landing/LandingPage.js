import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Spinner from "../../components/Spinner";
import BoxCheckIcon from "../../../assets/icons/box-check.svg";
import OrderTracking from "../../../assets/icons/order-tracking.png";
import ArrowRight from "../../../assets/icons/arrow-right-icon.svg";
import ErrorNotification from "../../../assets/icons/errornotification.svg";
import ErrorSymbol from "../../../assets/icons/error-symbol.png";
import axios from "axios";

const LandingPage = () => {

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [isFeildError, setIsFeiildError] = useState("");

  const confirmTrackingId = () => {
    if (trackingId === "") {
      setIsFeiildError(true);
      return;
    }
    setIsError(false);
    setLoading(true);
    axios.get(`${process.env.REACT_APP_PUBLIC_SERVICE_API_URL}/public/currentTracking/${trackingId}`)
      .then((response) => {
        if (response?.data?.statusCode === 200 && response?.data?.data) {
          setIsError(false);
          setLoading(false);
          history.push(`tracking/${trackingId}`);
        } else {
          setIsError(true);
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return <>
    <div className="relative">
      {loading && <Spinner />}
    </div>
    <div className="mt-6">
      <div>
        <img className="mx-auto p-6 w-1/2 sm:w-auto" src={BoxCheckIcon} alt="Logo" />
      </div>

      <div className="flex justify-center my-24">
        <div className="card drop-shadow-xl shadow-lg rounded-none w-3/4 md:w-1/2">
          {isError ?
            <>
              <div className="flex items-center">
                <img className="w-10 my-3" src={ErrorNotification} alt="Logo" />
                <h3 className="text-md text-[#c91a13] mx-6">Please correct the following errors</h3>
              </div>
              <ul className="list-disc pl-12 pb-4">
                <li className="text-sm text-[#c91a13] font-medium">The tracking number you entered is not valid. Please review or contact the sender to check the number.</li>
              </ul>
            </> : null
          }
          <div className="flex items-center">
            <img className="w-12" src={OrderTracking} alt="Logo" />
            <h3 className="mx-2.5 font-medium">TRACK</h3>
          </div>
          <div className="py-1">
            <p className="text-sm italic">Enter tracking number.</p>
          </div>
          <div className="relative block">
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              {isError ?
                <img className="" src={ErrorSymbol} alt="Logo" />
                : null
              }
            </span>
            <textarea
              required
              type="text"
              rows="2"
              value={trackingId}
              onChange={(e) => {
                setTrackingId(e.target.value.trim());
                if (e.target.value && isError) {
                  setIsError(false);
                }
                if (e.target.value && isFeildError) {
                  setIsFeiildError(false);
                }
              }}
              className={`border text-gray-900 text-sm rounded-none  block w-full p-2.5 focus:ring-transparent ${isError ? "border-[#c91a13]" : "border-primary"}`}
            />
          </div>
          {
            isFeildError ?
              <p className="text-sm text-[#6e2321]">Please provide a tracking number</p>
              : null
          }
          <div className="float-right">
            <button onClick={confirmTrackingId} className="flex items-center justify-center bg-[#1482BA] hover:bg-[#357EC7] hover:shadow-lg text-white py-2 mt-3 px-4 rounded-full w-full sm:w-36 ">
              Track
              <img className="ml-4 w-2" src={ArrowRight} alt="Logo" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-6 space-x-4">
        <p className="text-[#C6C7C4] text-sm">Powered by</p>
        <img className="w-32 " src={BoxCheckIcon} alt="Logo" />
      </div>
      <div className="flex flex-row justify-center">
        <p className="text-[#C6C7C4] text-sm my-3">Copyright @2022</p>
      </div>
    </div>
  </>
}

export default LandingPage;