import "./App.css";
import "./global";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCookie } from "./Services/Cookies";
import Login from "./Pages/Login";
import PlanTypes from "./Pages/plantypes";
import Forgot_password from "./Pages/Forgot_password";
import Register from "./Pages/Register";
import { IPMaster } from "./Pages/IPMaster";
import { Circlecode } from "./Pages/Circlecode";
import { Operatortype } from "./Pages/Operatortype";
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
          <Route exact path="/IPMaster" element={<IPMaster />} />
          <Route exact path="/Circlecode" element={<Circlecode />} />
          <Route exact path="/Operatortype" element={<Operatortype />} />
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
