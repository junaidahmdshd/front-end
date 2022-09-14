import React, { useEffect, useState } from "react";
import { TrackingHistoryItem } from "./components/TrackingHistoryItem";
import { TrackingError } from "./components/TrackingError";
import { useParams } from "react-router";
import { Switch } from "@headlessui/react";
import useIsFirstMount from "../../../hooks/useIsFirstMount";
import BoxCheckIcon from "../../../../assets/icons/box-check.svg";
import Spinner from "../../../components/Spinner";
import Stepper from "./components/Stepper";
import moment from "moment";
import axios from "axios";

const possibleSteps = ["pending", "inforeceived", "intransit", "outfordelivery", "exception", "delivered", "returned"];

const TrackingPage = () => {
  const isFirstMount = useIsFirstMount();
  const { trackingNumber } = useParams();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [textOptIn, setTextOptionIn] = useState(false);
  const [emailOptIn, setEmailOptionIn] = useState(false);
  const [carrierIconLink, setCarrierIconLink] = useState("");
  const [lastUpdatedTime, setLastUpdatedTime] = useState("");
  const [currentTracking, setCurrentTracking] = useState(null);
  const [trackingHistory, setTrackingHistory] = useState(null);
  const [actualDeliveryDate, setActualDeliveryDate] = useState("");
  const [shouldUpdateStatus, setShouldUpdateStatus] = useState(false);
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [displayCarrierLogo, setDisplayCarrierLogo] = useState(true);
  const [displaySMSNotifications, setDisplaySMSNotifications] = useState(false);
  const [displayEmailNotifications, setDisplayEmailNotifications] = useState(false);
  const [displayEstimatedDeliveryDate, setDisplayEstimatedDeliveryDate] = useState(true);

  useEffect(() => {
    if (trackingNumber) {
      fetchTracking();
    } else {
      setError(true);
    }
  }, [trackingNumber]);

  useEffect(() => {
    if (isFirstMount) {
      return;
    }
    if (shouldUpdateStatus) {
      toogleNotification();
    }
  }, [shouldUpdateStatus]);

  const toogleNotification = () => {
    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_PUBLIC_SERVICE_API_URL}/public/notifications/${trackingNumber}`, {
        textOptIn: textOptIn ? "true" : "false",
        emailOptIn: emailOptIn ? "true" : "false",
      })
      .finally(() => {
        setLoading(false);
        setShouldUpdateStatus(false);
      });
  };

  const fetchTracking = () => {
    setLoading(true);
    Promise.all([
      axios.get(`${process.env.REACT_APP_PUBLIC_SERVICE_API_URL}/public/trackingHistory/${trackingNumber}`),
      axios.get(`${process.env.REACT_APP_PUBLIC_SERVICE_API_URL}/public/currentTracking/${trackingNumber}`),
      axios.get(`${process.env.REACT_APP_PUBLIC_SERVICE_API_URL}/public/trackingAppConfigurations/${trackingNumber}`),
    ])
      .then((response) => {
        setTrackingHistory(response[0]?.data?.data);
        setCurrentTracking(response[1]?.data?.data);
        if (response[1]?.data?.statusCode === 200 && response[1]?.data?.data) {
          const data = response[1]?.data?.data;
          setLastUpdatedTime(data?.receivedDate || "");
          const currentStatus = data?.tag?.toLowerCase()?.replace(/\s/g, "");
          const index = possibleSteps.indexOf(currentStatus);
          if (index >= 0) {
            setActiveStep(index + 1);
          }
        }
        if (response[2]?.data?.statusCode === 200 && response[2]?.data?.data) {
          const data = response[2]?.data?.data;
          let estDeleiveryDate = data?.estimatedDeliveryDate || "";
          if (estDeleiveryDate) {
            var new_date = moment(estDeleiveryDate).add(+data?.daysToAddInEstimatedDeliveryDate || 0, "days");
            estDeleiveryDate = new_date._d;
          }
          setEstimatedDeliveryDate(estDeleiveryDate);
          if (response[0]?.data?.data) {
            const shipmentHistory = response[0]?.data?.data;
            if (shipmentHistory && shipmentHistory.length) {
              const deliveredItem = shipmentHistory.find((item) => item.tag === "Delivered");
              if (deliveredItem) {
                setActualDeliveryDate(deliveredItem?.checkPointTime);
              }
            }
          }
          setCarrierIconLink(data?.iconLink || "");
          setTextOptionIn(data?.textOptIn === "true" ? true : false);
          setEmailOptionIn(data?.emailOptIn === "true" ? true : false);
          setDisplayCarrierLogo(data?.displayCarrierLogo === null ? true : data?.displayCarrierLogo);
          setDisplaySMSNotifications(data?.displaySMSNotifications === null ? false : data?.displaySMSNotifications);
          setDisplayEmailNotifications(data?.displayEmailNotifications === null ? false : data?.displayEmailNotifications);
          setDisplayEstimatedDeliveryDate(data?.displayEstimatedDeliveryDate === null ? true : data?.displayEstimatedDeliveryDate);
        }
        setError(false);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="">
      {loading && <Spinner />}
      <div>
        <img className="mx-auto p-6 w-1/2 sm:w-auto" src={BoxCheckIcon} alt="Logo" />
      </div>
      {!error ? (
        <>
          <Stepper activeStep={activeStep} />
          <div className="container   mx-auto">
            <div className="w-3/4 flex flex-col-reverse md:flex-row items-center mx-auto mt-10 md:mt-6 space-y-0 md:space-y-0">
              {/* Left item */}
              <div className="flex flex-col items-center w-full  space-y-2 md:w-1/2 md:items-start mb-8">
                {
                  displayEstimatedDeliveryDate ?
                    actualDeliveryDate === "" ?
                      <>
                        <p className="text-left   text-sm  max-w-sm text-[#7070707D]">Estimated Delivery Date</p>
                        <h1 className="mx-w-md text-xl font-bold text-left md:text-3xl "> {estimatedDeliveryDate ? moment(estimatedDeliveryDate).format("MMMM DD, YYYY") : ""}</h1>
                      </>
                      : <>
                        <p className="text-left   text-sm  max-w-sm text-[#7070707D]">Delivered Date</p>
                        <h1 className="mx-w-md text-xl font-bold text-left md:text-3xl "> {actualDeliveryDate ? moment(actualDeliveryDate).format("MMMM DD, YYYY") : ""}</h1>
                      </>
                    : null
                }
                <div className="flex flex-col lg:flex-row">

                  {
                    displayEmailNotifications ? <div className="flex mt-6 items-center mr-4 ml-6 md:ml-0">
                      <Switch.Group>
                        <Switch.Label passive className="text-GeminiGray  text-sm ">
                          Send Email Alerts
                        </Switch.Label>
                        <Switch name="emailAlert" checked={emailOptIn} onChange={val => {
                          setEmailOptionIn(val);
                          setShouldUpdateStatus(true);
                        }} className={`${emailOptIn ? "bg-primary" : "bg-gray-200"}  relative inline-flex items-center h-6 rounded-full w-11  ml-2`}>
                          <span className="sr-only">Enable notifications</span>
                          <span className={`${emailOptIn ? "translate-x-6" : "translate-x-1"}  inline-block w-4 h-4 transform bg-white rounded-full`} />
                        </Switch>
                      </Switch.Group>
                    </div> : null
                  }

                  {
                    displaySMSNotifications ? <div className="flex mt-6 items-center mr-4 ml-6 md:ml-0">
                      <Switch.Group>
                        <Switch.Label passive className="text-GeminiGray  text-sm ">
                          Send SMS Alerts
                        </Switch.Label>
                        <Switch name="phoneAlert" checked={textOptIn} onChange={val => {
                          setTextOptionIn(val);
                          setShouldUpdateStatus(true);
                        }} className={`${textOptIn ? "bg-primary" : "bg-gray-200"}  relative inline-flex items-center h-6 rounded-full w-11  ml-2`}>
                          <span className="sr-only">Enable notifications</span>
                          <span className={`${textOptIn ? "translate-x-6" : "translate-x-1"}  inline-block w-4 h-4 transform bg-white rounded-full`} />
                        </Switch>
                      </Switch.Group>
                    </div> : null
                  }

                </div>
              </div>
              {/* Right item  */}
              <div className="flex flex-col w-full md:w-1/2">
                <div className="self-center md:self-auto">
                  {displayCarrierLogo && carrierIconLink ? (
                    <img
                      className="float-none  md:float-right"
                      src={carrierIconLink}
                      alt="Logo"
                      width="auto"
                      height="auto"
                      style={{ width: "180px", height: "90px", objectFit: "contain" }}
                    />
                  ) : null}
                </div>
                <div className=" font-semibold text-center md:text-right">
                  <span className="text-lg md:text-xl">Tracking#</span>
                  <span> </span>
                  <span className="break-words text-md md:text-xl">{currentTracking?.trackingNumber}</span>
                </div>

                <div className=" flex flex-col justify-center  mt-0 md:mt-10 my-3 space-x-2 sm:flex-row md:justify-end">
                  <p className="float-right text-[#7070707D] text-sm  self-center text-gray-300">Last Updated:</p>
                  <p className="  text-sm text-center ">{lastUpdatedTime ? moment(lastUpdatedTime).format("MMMM DD, YYYY") : ""}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="w-3/4  mx-auto bg-white border border-[#70707054]">
              <div className="bg-[#EEEEEE] border border-b-1 border-[#70707054] h-12 flex items-center">
                <h1 className="text-xl   align-middle mx-8">Tracking Events</h1>
              </div>
              <ul className="w-3/4 text-sm font-medium text-gray-900 space-y-3">
                {trackingHistory &&
                  trackingHistory.length &&
                  trackingHistory.map((history, index) => {
                    return <TrackingHistoryItem key={index} {...history} />;
                  })}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <TrackingError />
      )}
      <div className="flex flex-row justify-center mt-6 space-x-4">
        <p className="text-[#C6C7C4] text-sm">Powered by</p>
        <img className="w-32 " src={BoxCheckIcon} alt="Logo" />
      </div>
      <div className="flex flex-row justify-center">
        <p className="text-[#C6C7C4] text-sm my-3">Copyright @ {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default TrackingPage;
