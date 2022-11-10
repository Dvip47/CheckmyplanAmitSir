import React from "react";
import Leftbar from "../Pages/Leftbar";
import Rightbar from "../Pages/Rightbar";
import Navbar from "../Pages/Navbar";
import Body from "./Body";
import Footer from "./Footer";

function Topbar() {
  return (
    <div>
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            {/* <!-- Logo container--> */}
            <Leftbar />
            {/* <!-- End Logo container--> */}
            <Rightbar />
            {/* <!-- end menu-extras --> */}
            <div className="clearfix"></div>
          </div>
          {/* <!-- end container --> */}
        </div>
        {/* <!-- end topbar-main --> */}
        {/* <!-- MENU Start --> */}
        <Navbar />
        {/* <!-- end navbar-custom --> */}
      </header>
      {/* <Body />
      <Footer /> */}
    </div>
  );
}

export default Topbar;
