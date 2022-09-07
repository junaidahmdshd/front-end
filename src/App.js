import React, { useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import TrackingPage from "./TrackingPage";

const App = () => {
  const trackingNumber = "BOXC09B8658ACB";

  const fetchTracking = () => {
    Promise.all([
      axios.get(`https://dev-backend.boxcheck.com/public-apis-service/api/v1/public/trackingHistory/${trackingNumber}`),
      axios.get(`https://dev-backend.boxcheck.com/public-apis-service/api/v1/public/currentTracking/${trackingNumber}`),
      axios.get(`https://dev-backend.boxcheck.com/public-apis-service/api/v1/public/trackingAppConfigurations/${trackingNumber}`),
    ])
      .then(response => {
        console.log("Response");
        console.log(response);
      })
      .catch(error => {
        console.log("error");
        console.log(error);
      })
  };

  useEffect(() => {
    fetchTracking();
  }, [])

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tracking">Tracking</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </div >
  )
};

export default App;
