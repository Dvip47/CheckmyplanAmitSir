import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DATACONSTANT } from "../constants/data.constant";
import { postRequest } from "../Services/API_service";
import delete_cookie, { getCookie } from "../Services/Cookies";
import favicon3 from "../assets/images/favicon3.png";
import AVATAR1 from "../assets/images/users/avatar-1.jpg";
import ChangePasswordModal from "../Pages/ChangePasswordModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Rightbar({ show1, setShow1, getBalance, balance }) {
  const [data, setData] = useState(true);
  const [modal, setModal] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    toast.success("Copy to clipboard");
  };

  const navigate = useNavigate();

  let x = getCookie(DATACONSTANT.SETCOOKIE);
  useEffect(() => {
    if (!getCookie(DATACONSTANT.SETCOOKIE)) {
      setData(false);
    } else {
      setData(true);
    }
  }, [data, x]);

  useEffect(() => {
    getBalance();
    getToken();
  }, []);

  async function getRemoveCookies() {
    await delete_cookie(".plan_info"); 
    window.location.href = "http://checkmyplan.in";
    // navigate("http://checkmyplan.in");
  }

  async function logout() {
    try {
      let x = getCookie(DATACONSTANT.SETCOOKIE);
      let __x = JSON.parse(x);
      var postResponse = await postRequest(DATACONSTANT.LOGOUT_URL, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      await delete_cookie(".plan_info");
      window.location.href = "http://checkmyplan.in";
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
  }

  const [token, setToken] = useState(0);

  async function getToken() {
    try {
      let x = getCookie(DATACONSTANT.SETCOOKIE);
      let __x = JSON.parse(x);
      var postResponse = await postRequest(DATACONSTANT.GETTOKEN, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      setToken(postResponse.token);
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
  }

  return (
    <div>
      {show1 && (
        <div
          style={{
            display: "flex",
            height: "100vh",
            width: "100vw",
            position: "absolute",
          }}
          onClick={() => setShow1(false)}
        ></div>
      )}

      <div className="menu-extras topbar-custom">
        <ul className="list-unstyled float-right mb-0">
          <li className="fa dropdown notification-list">
            {/* <i className="fa fa-inr" aria-hidden="true"></i> */}
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "sans-serif",
              }}
            >
              ??? {balance}
            </span>
            <a
              className="mt-1 nav-link dropdown-toggle arrow-none waves-effect"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <img className="wallet" src={favicon3} alt="no image"></img>
              {/* <i className="fas fa-wallet fa-2x"></i> */}
            </a>
          </li>
          {/* <!-- User--> */}
          <li
            onClick={() => setShow1(true)}
            className="dropdown notification-list show"
          >
            <a
              className="nav-link dropdown-toggle arrow-none waves-effect nav-user"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="true"
            >
              <img src={AVATAR1} alt="user" className="rounded-circle" />
            </a>
            {show1 && (
              <div
                className={
                  !show1
                    ? "dropdown-menu dropdown-menu-right profile-dropdown border-0 dropdown-menu-right"
                    : " dropdown-menu dropdown-menu-right profile-dropdown border-0 dropdown-menu-right show"
                }
                x-placement="top-end"
              >
                <div className="dropdown-item noti-title cus-hover">
                  {JSON.parse(x).name ? (
                    <h5>
                      {JSON.parse(x)?.name} &nbsp; (UserID:{" "}
                      {JSON.parse(x)?.userID})
                    </h5>
                  ) : (
                    <h5>UserID: {JSON.parse(x)?.userID}</h5>
                  )}
                </div>
                <div className="dropdown-item noti-title">
                  <div className="d-flex justify-content-between">
                    <p
                      className="token"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                    >
                      {token}
                    </p>
                    <i
                      className="fa-solid fa fa-copy ml-3"
                      style={{ fontSize: "18px" }}
                      onClick={handleCopy}
                    ></i>
                  </div>
                              </div>
                              <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="">
                  {JSON.parse(x)?.emailID}
                </a>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <i className="fa fa-key iconfm m-r-5 text-muted"></i> Change
                  Password
                </a>

                {modal && (
                  <ChangePasswordModal modal={modal} setModal={setModal} />
                )}
                <div className="dropdown-divider"></div>
                <a
                  className="cursor-pointer"
                  href="https://checkmyplan.in/checkmyplan.pdf"
                  target="_blank"
                >
                  <i
                    className="fa fa-download m-r-5 text-muted "
                    style={{ marginLeft: "15px", fontSize: "20px" }}
                  ></i>
                  Download
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item cursor-pointer" onClick={logout}>
                  <i className="mdi mdi-logout m-r-5 text-muted"></i> Logout
                </a>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Rightbar;
{
  /* <a className="dropdown-item" href="http://checkmyplan.in/"> */
}
