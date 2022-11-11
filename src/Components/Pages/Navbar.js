import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Add_Money_model from "./Add_money_model";
import PaymentGatewayModal from "./PaymentGatewayModal";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";

function Navbar() {
  const [show1, setShow1] = useState(false);
  const [show, setShow] = useState(false);
  const [paymentGatewayState, setPaymentGatewayState] = useState(false);
  const [input, setInput] = useState({
    amount: "",
    oid: 0,
  });
  // console.log(show);
  return (
    <div>
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            <Leftbar />
            <Rightbar show1={show1} setShow1={setShow1} />
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
              {show && (
                <Add_Money_model
                  show={show}
                  setShow={setShow}
                  setPaymentGatewayState={setPaymentGatewayState}
                  input={input}
                  setInput={setInput}
                />
              )}
              {paymentGatewayState && (
                <PaymentGatewayModal
                  paymentGatewayState={paymentGatewayState}
                  setPaymentGatewayState={setPaymentGatewayState}
                  input={input}
                  setInput={setInput}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
