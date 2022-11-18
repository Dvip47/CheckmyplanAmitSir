import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AVATAR1 from "../../assets/images/users/avatar-1.jpg";
import { DATACONSTANT } from "../../constants/data.constant";
import { postRequest } from "../../Services/API_service";
import delete_cookie, { getCookie } from "../Library/Cookies";

function Rightbar({
  show1,
  setShow1,
  setShow,
  getBalance,
  balance,
  setBalance,
}) {
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
      // window.location.href = "http://localhost:4000";
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
          {/* <!-- language--> */}
          {/* <li className="mobile-on" onClick={() => setShow(true)}>
            <a
              className="mt-3 btn btn-info btn-sm mr-2"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded="false"
            >
              <span>
                <i className="fas fa-wallet"></i> &nbsp;Add Money
              </span>
            </a>
          </li> */}
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
                  <h5>Welcome</h5>
                </div>
                <a class="dropdown-item" href="#">
                  {" "}
                  <span>UserID:</span> {JSON.parse(x)?.userID},
                </a>
                <a class="dropdown-item" href="#">
                  {" "}
                  <span>Name:</span> {JSON.parse(x)?.name},
                </a>
                <a class="dropdown-item" href="#">
                  {" "}
                  <span>Email:</span> {JSON.parse(x)?.emailID}
                </a>
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
