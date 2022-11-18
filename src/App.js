import React, { useEffect, useState } from "react";
import "./App.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "./Components/Library/Cookies";
import Login from "./Components/Pages/Login";
import Order_Summary from "./Components/Pages/Order_Summary";
import PlanTypes from "./Components/Pages/plantypes";
import Forgot_password from "./Components/Pages/Forgot_password";
import Register from "./Components/Pages/Register";
import "./global";
import { DATACONSTANT } from "./constants/data.constant";

function App() {
  const navigate = useNavigate();
  const [page, setPage] = useState(true);

  let x = getCookie(DATACONSTANT.SETCOOKIE);
  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      alert("hiiiii");
    });
    // console.log(x);
    if (!getCookie(DATACONSTANT.SETCOOKIE)) {
      setPage(false);
      return navigate("/");
    } else {
      setPage(true);
      return navigate("/");
    }
  }, [page, x]);
  return (
    <div>
      {page ? (
        <Routes>
          <Route exact path="/" element={<PlanTypes />} />
          <Route exact path="/Order_Summary" element={<Order_Summary />} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Forgot_password" element={<Forgot_password />} />
          <Route exact path="/Register" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
