import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { postRequest } from "../../Services/API_service";
import { DATACONSTANT } from "../../constants/data.constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "../Library/Cookies";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();

  async function Signup(e) {
    try {
      e.preventDefault();
      var postResponse = await postRequest(DATACONSTANT.CREATEACCOUNT, {
        domain: DATACONSTANT.DOMAIN_NAME,
        usercreate: {
          generateotp: "",
          otp: "",
          address: formData.address,
          emailid: formData.email,
          mobileNo: formData.mobileNumber,
          name: formData.Name,
          pincode: formData.pincode,
        },
      });

      console.log("data", postResponse);
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
        return navigate("/");
      }
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
  }

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <ToastContainer />
      <div class="wrapper-page">
        <div class="card">
          <div class="card-body">
            <div class="text-center m-b-15">
              <a href="index.html" class="logo logo-admin">
                <img src="/logo2.png" style={{ width: "211px" }} alt="logo" />
              </a>
            </div>
            <div class="p-3">
              <form
                class="form-horizontal"
                action="https://mannatthemes.com/zoogler/horizontal/index.html"
              >
                <div class="form-group row">
                  <div class="col-12">
                    <input
                      class="form-control"
                      type="text"
                      required=""
                      placeholder="Name"
                      name="Name"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <input
                      class="form-control"
                      type="number"
                      required=""
                      placeholder="Mobile Number"
                      name="mobileNumber"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <input
                      class="form-control"
                      type="email"
                      required=""
                      placeholder="Email"
                      name="email"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <input
                      class="form-control"
                      type="text"
                      required=""
                      placeholder="Address"
                      name="address"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <input
                      class="form-control"
                      type="number"
                      required=""
                      placeholder="Pincode"
                      name="pincode"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-12">
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="customCheck1"
                      />{" "}
                      <label
                        class="custom-control-label font-weight-normal"
                        for="customCheck1"
                      >
                        I accept{" "}
                        <a href="#" class="text-muted">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group text-center row m-t-20">
                  <div class="col-12">
                    <button
                      class="btn btn-danger btn-block waves-effect waves-light"
                      type="submit"
                      onClick={Signup}
                    >
                      Register
                    </button>
                  </div>
                </div>
                <div class="form-group m-t-10 mb-0 row">
                  <div class="col-12 m-t-20 text-center">
                    <NavLink to="/" class="text-muted">
                      Already have account?
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
};

export default Register;
