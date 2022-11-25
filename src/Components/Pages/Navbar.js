import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Add_Money_model from "./Add_money_model";
import PaymentGatewayModal from "./PaymentGatewayModal";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";

function Navbar({
  show,
  setShow,
  input,
  setInput,
  getBalance,
  balance,
  setBalance,
  getPlan,
}) {
  const [show1, setShow1] = useState(false);

  const [paymentGatewayState, setPaymentGatewayState] = useState(false);

  // console.log(show);
  return (
    <div>
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            <Leftbar />
            <Rightbar
              show1={show1}
              setShow1={setShow1}
              setShow={setShow}
              getBalance={getBalance}
              balance={balance}
              setBalance={setBalance}
            />
            <div className="clearfix"></div>
          </div>
        </div>

        <div className="navbar-custom">
          <div className="container-fluid">
            <div id="navigation">
              <ul className="navigation-menu">
                <li className="has-submenu mob-off">
                  <NavLink to="/">
                    <i className="dripicons-device-desktop"></i>Plan Types
                  </NavLink>
                </li>
                <li className="has-submenu mob-off">
                  <NavLink to="/IPMaster">
                    <i className="fa fa-server"></i>IPAddress Master
                  </NavLink>
                </li>
              </ul>

              <button
                className="add-btn btn btn-danger mt-2 mb-2"
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
                  getBalance={getBalance}
                  paymentGatewayState={paymentGatewayState}
                  setPaymentGatewayState={setPaymentGatewayState}
                  input={input}
                  setInput={setInput}
                  getPlan={getPlan}
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
