import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import TrackingPage from "./TrackingPage";

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
