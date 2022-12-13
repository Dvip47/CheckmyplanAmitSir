import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { postRequest } from "../Services/API_service";
import { DATACONSTANT } from "../constants/data.constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCookie } from "../Services/Cookies";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [checkboxValidation, setCheckboxValidation] = useState(false);

  async function Signup(e) {
    e.preventDefault();
    if (checkboxValidation == true) {
      try {
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

        console.log("Signup data", postResponse);
        if (postResponse?.statusCode === 1) {
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
      } catch (error) {
        return {
          statuscode: -1,
          msg: error.code,
        };
      }
    } else {
      toast.error("please accept terms and condition");
    }
  }

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* <ToastContainer /> */}
      <div className="wrapper-page">
        <div className="card">
          <div className="card-body">
            <div className="text-center m-b-15">
              <a href="index.html" className="logo logo-admin">
                <img src="/logo2.png" style={{ width: "211px" }} alt="logo" />
              </a>
            </div>
            <div className="p-3">
              <form className="form-horizontal" action="">
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="text"
                      required=""
                      placeholder="Name"
                      name="name"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="number"
                      required=""
                      placeholder="Mobile Number"
                      name="mobileNumber"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="email"
                      required=""
                      placeholder="Email"
                      name="email"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="text"
                      required=""
                      placeholder="Address"
                      name="address"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="number"
                      required=""
                      placeholder="Pincode"
                      name="pincode"
                      onChange={inputHandler}
                      maxLength={6}
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
                        onClick={() => {
                          setCheckboxValidation(!checkboxValidation);
                        }}
                      />{" "}
                      <label
                        className="custom-control-label font-weight-normal"
                        for="customCheck1"
                      >
                        I accept{" "}
                        <a href="#" className="text-muted">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group text-center row m-t-20">
                  <div className="col-12">
                    <button
                      className="btn btn-danger btn-block waves-effect waves-light"
                      type="submit"
                      onClick={Signup}
                    >
                      Register
                    </button>
                  </div>
                </div>
                <div className="form-group m-t-10 mb-0 row">
                  <div className="col-12 m-t-20 text-center">
                    <NavLink to="/" className="text-muted">
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
