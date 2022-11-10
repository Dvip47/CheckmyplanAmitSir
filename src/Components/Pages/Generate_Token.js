import React, { useState } from "react";
import "../Component/Login.css";
import { postRequest } from "../../Services/API_service";
import { setCookie } from "../Library/Cookies";
import { useNavigate } from "react-router";
import { DATACONSTANT } from "../../constants/data.constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color,
      backgroundColor: color,
      height: 5,
    }}
  />
);

export default function Generate_Token() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();

  async function getToken(e) {
    try {
      e.preventDefault();
      var postResponse = await postRequest(DATACONSTANT.LOGIN_URL, {
        domain: DATACONSTANT.DOMAIN_NAME,
        userID: formData.email,
        Password: formData.password,
      });
      // localStorage.setItem("item", "enter");
      // return navigate("/", { state: "tool" });
      // console.log("data_1:", postResponse.data);
      if (postResponse?.statuscode === 1) {
        toast.success(postResponse.msg);
        setCookie(
          DATACONSTANT.SETCOOKIE,
          JSON.stringify(postResponse.data),
          30
        );
        // localStorage.setItem("item", "enter");
        return navigate("/");
      } else {
        toast.error(postResponse.msg);
      }
    } catch (ex) {
      toast.error(ex.code);
      return {
        statuscode: -1,
        msg: ex.code,
      };
    }
  }

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <ToastContainer />
      {/* <div className="accountbg"></div> */}
      <div className="wrapper-page">
        <div className="card">
          <div className="card-body">
            <div className="text-center m-b-15">
              <a href="index.html" className="logo logo-admin">
                <img src="./logo2.png" style={{ width: "211px" }} alt="logo" />
              </a>
            </div>
            <div className="p-3">
              <form className="form-horizontal m-t-20" onSubmit={getToken}>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="text"
                      required=""
                      placeholder="Email Address"
                      name="email"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="password"
                      required=""
                      placeholder="Password"
                      name="password"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />{" "}
                      <label
                        className="custom-control-label"
                        for="customCheck1"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group text-center row m-t-20">
                  <div className="col-12">
                    <button
                      className="btn btn-danger btn-block waves-effect waves-light"
                      type="submit"
                      onClick={getToken}
                    >
                      Login
                      {/* Generate Token */}
                    </button>
                  </div>
                </div>
                <div className="form-group m-t-10 mb-0 row">
                  <div className="col-sm-7 m-t-20">
                    <NavLink to="/Forgot_password" className="text-muted">
                      <i className="mdi mdi-lock"></i>{" "}
                      <small>Forgot your password ?</small>
                    </NavLink>
                  </div>
                  <div className="col-sm-5 m-t-20">
                    <NavLink to="/Register" className="text-muted">
                      <i className="mdi mdi-account-circle"></i>{" "}
                      <small>Create account ?</small>
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// <NavLink to="/">
//   <i className="dripicons-device-desktop"></i>Plan Types
// </NavLink>;
