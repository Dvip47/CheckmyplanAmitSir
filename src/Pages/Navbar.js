import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Add_Money_model from "./Add_money_model";
import PaymentGatewayModal from "./PaymentGatewayModal";
import Leftbar from "./Leftbar";
import Rightbar from "../Components/Rightbar";

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
      <div className="container-fluid">
        <div className="mob-version">
          <button
            className="navbar-toggler nav-btn"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="mdi mdi-menu"></span>
          </button>
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
          <nav className="navbar navbar-expand-sm">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink to="/">
                    <i className="fa fa-tasks"></i>Plan Types
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/IPMaster">
                    <i className="fa fa-server"></i>IPAddress Master
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Circlecode">
                    <i className="fas fa-circle"></i>Circle Code
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/Operatortype">
                    <i className="fa fa-television"></i>Operator Type
                  </NavLink>
                </li>
              </ul>
              <div className="social-part">
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
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
