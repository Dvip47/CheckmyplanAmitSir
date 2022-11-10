import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Add_Money_model from "./Add_money_model";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";

function Navbar() {
  const [show, setShow] = useState(false);
  // console.log(show);
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
        <div className="navbar-custom">
          <div className="container-fluid">
            <div id="navigation">
              <ul className="navigation-menu">
                <li className="has-submenu">
                  <NavLink to="/">
                    <i className="dripicons-device-desktop"></i>Plan Types
                  </NavLink>
                </li>
              </ul>
              <button
                className="btn btn-danger mt-2 mb-2"
                onClick={() => setShow(true)}
              >
                ADD MONEY
              </button>
              {show && <Add_Money_model show={show} setShow={setShow} />}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
