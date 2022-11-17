import React from "react";
import Leftbar from "../Pages/Leftbar";
import Rightbar from "../Pages/Rightbar";
import Navbar from "../Pages/Navbar";

function Topbar() {
  return (
    <div>
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            <Leftbar />
            <Rightbar />
            <div className="clearfix"></div>
          </div>
        </div>
        <Navbar />
      </header>
    </div>
  );
}

export default Topbar;
