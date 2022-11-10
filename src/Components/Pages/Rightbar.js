import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AVATAR1 from "../../assets/images/users/avatar-1.jpg";
import { DATACONSTANT } from "../../constants/data.constant";
import { postRequest } from "../../Services/API_service";
import delete_cookie, { getCookie } from "../Library/Cookies";

function Rightbar() {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(true);

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
  }, []);

  const [balance, setBalance] = useState([]);

  async function getBalance() {
    try {
      let __x = JSON.parse(x);
      var postResponse = await postRequest(DATACONSTANT.BALANCE_URL, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      // console.log("balance", postResponse?.bBalance);
      setBalance(postResponse?.bBalance);
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
  }

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
      // console.log(__x);
      var postResponse = await postRequest(DATACONSTANT.LOGOUT_URL, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      // console.log("options", postResponse);
      await delete_cookie(".plan_info");
      // console.log("Hii, cookies are here", getCookie(DATACONSTANT.SETCOOKIE));
      window.location.href = "http://checkmyplan.in";
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
  }

  return (
    <div>
      <div className="menu-extras topbar-custom">
        <ul className="list-unstyled float-right mb-0">
          {/* <!-- language--> */}

          {/* <!-- notification--> */}
          <li className="dropdown notification-list">
            <span
              style={{
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "sans-serif",
              }}
            >
              Rs. {balance}
            </span>
            <a
              className="mt-1 nav-link dropdown-toggle arrow-none waves-effect"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <i className="fas fa-wallet fa-2x"></i>
            </a>
          </li>
          {/* <!-- User--> */}
          <li
            onClick={() => setShow(!show)}
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
            {show && (
              <div
                class="dropdown-menu dropdown-menu-right profile-dropdown border-0 show"
                x-placement="top-end"
                style={{
                  position: "absolute",
                  transform: "translate3d(-104px, 5px, 0px)",
                  top: "0px",
                  left: "0px",
                  willChange: "transform",
                }}
              >
                <div class="dropdown-item noti-title">
                  <h5>Welcome</h5>
                </div>
                <a class="dropdown-item" href="#">
                  <i class="mdi mdi-account-circle m-r-8 text-muted"></i>
                  <div className="cus-id">
                    <p>
                      {" "}
                      <span>UserID:</span> {JSON.parse(x)?.userID},
                    </p>
                    <p>
                      <span>Name:</span> {JSON.parse(x)?.name},
                    </p>
                    <p>
                      <span>Email:</span>
                    </p>
                    <p>{JSON.parse(x)?.emailID}</p>
                  </div>
                </a>
                <div class="dropdown-divider"></div>
                {/* <a class="dropdown-item" href="http://checkmyplan.in/"> */}
                <a class="dropdown-item" onClick={logout}>
                  <i class="mdi mdi-logout m-r-5 text-muted"></i> Logout
                </a>
              </div>
            )}
          </li>
          <li className="menu-item">
            {/* <!-- Mobile menu toggle-->  */}
            <a className="navbar-toggle nav-link">
              <div className="lines">
                <span></span> <span></span> <span></span>
              </div>
            </a>
            {/* <!-- End mobile menu toggle--> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Rightbar;
