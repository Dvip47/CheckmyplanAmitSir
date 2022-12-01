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
      {/* <header id="topnav">
        <div className="topbar-main">*/}
          <div className="container-fluid"> 
          <div className="mob-version">
          <button class="navbar-toggler nav-btn" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="mdi mdi-menu"></span>
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
            {/* </div>*/}
          </div>
           
        </div>

        <div className="navbar-custom">
          
          <div className="container-fluid">
          <nav class="navbar navbar-expand-sm">
       

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
            <NavLink to="/">
                    <i className="dripicons-device-desktop"></i>Plan Types
                  </NavLink>
            </li>
            <li class="nav-item">
            <NavLink to="/IPMaster">
                    <i className="fa fa-server"></i>IPAddress Master
                  </NavLink>
            </li>
            {/* <li class="nav-item dropdown dmenu">
            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
              Our Service
            </a>
            <div class="dropdown-menu sm-menu">
              <a class="dropdown-item" href="#">service2</a>
              <a class="dropdown-item" href="#">service 2</a>
              <a class="dropdown-item" href="#">service 3</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Call</a>
          </li> */}
           
          </ul>
          <div class="social-part">
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

            {/* <div id="navigation">
              <ul className="navigation-menu">
                <li className="has-submenu">
                  <NavLink to="/">
                    <i className="dripicons-device-desktop"></i>Plan Types
                  </NavLink>
                </li>
                <li className="has-submenu">
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
            </div> */}
          </div>
        </div>
      {/* </header> */}
    </div>
  );
}

export default Navbar;
