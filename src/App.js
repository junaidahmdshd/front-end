import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import TrackingPage from "./TrackingPage";
import Home from "./Home";

const App = () => {
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
