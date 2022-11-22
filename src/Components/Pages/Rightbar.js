import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AVATAR1 from "../../assets/images/users/avatar-1.jpg";
import { DATACONSTANT } from "../../constants/data.constant";
import { postRequest } from "../../Services/API_service";
import delete_cookie, { getCookie } from "../Library/Cookies";
import favicon3 from "../../assets/images/favicon3.png";
import ChangePasswordModal from "./ChangePasswordModal";
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
    // console.log("Hii, cookies are here", getCookie(DATACONSTANT.SETCOOKIE));
    // setTimeout(() => {
    window.location.href = "http://checkmyplan.in";
    // }, 1000);
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
      // window.location.href = "http://localhost:4000";
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
          <li className="fa fa-inr dropdown notification-list">
            <i class="fa fa-inr" aria-hidden="true"></i>
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "sans-serif",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Indian_Rupee_symbol.svg/1200px-Indian_Rupee_symbol.svg.png"
                style={{
                  width: "10px",
                  position: "relative",
                  left: "-2px",
                  bottom: "2px",
                }}
              />
              {balance}
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
            class="dropdown notification-list show"
          >
            <a
              class="nav-link dropdown-toggle arrow-none waves-effect nav-user"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="true"
            >
              <img src={AVATAR1} alt="user" class="rounded-circle" />
            </a>
            {show1 && (
              <div
                class={
                  !show1
                    ? "dropdown-menu dropdown-menu-right profile-dropdown border-0 dropdown-menu-right"
                    : " dropdown-menu dropdown-menu-right profile-dropdown border-0 dropdown-menu-right show"
                }
                x-placement="top-end"
              >
                <div class="dropdown-item noti-title">
                  <h5>
                    {JSON.parse(x)?.name}(UserID: {JSON.parse(x)?.userID})
                  </h5>
                </div>
                <div class="dropdown-item noti-title">
                  <h5>
                    <div className="d-flex justify-content-between">
                      <p
                        className="token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                      >
                        {token}
                      </p>
                      <i
                        className="fa-solid fa fa-copy"
                        style={{ fontSize: "18px" }}
                        onClick={handleCopy}
                      ></i>
                    </div>
                  </h5>
                </div>
                <a class="dropdown-item" href="">
                  {JSON.parse(x)?.emailID}
                </a>
                <div class="dropdown-divider"></div>
                <a
                  class="dropdown-item"
                  href="#"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <i class="fa fa-key iconfm m-r-5 text-muted"></i> Change
                  Password
                </a>
                {modal && (
                  <ChangePasswordModal modal={modal} setModal={setModal} />
                )}
                <div class="dropdown-divider"></div>
                <a
                  class="dropdown-item"
                  href="https://admin.checkmyplan.in/swagger/index.html"
                >
                  <i class="fa fa-file iconfm m-r-5 text-muted"></i> API
                  Documentation
                </a>{" "}
                <div class="dropdown-divider"></div>
                {/* <a class="dropdown-item" href="http://checkmyplan.in/"> */}
                <a class="dropdown-item" onClick={logout}>
                  <i class="mdi mdi-logout m-r-5 text-muted"></i> Logout
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
