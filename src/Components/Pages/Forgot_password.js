import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { postRequest } from "../../Services/API_service";
import { DATACONSTANT } from "../../constants/data.constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Forgot_password = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();

  const myStyle = {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    right: "0%",
    padding: "12px 16px",
    transform: "translate(0%, -50%)",
  };

  async function forgotPWD(e) {
    try {
      e.preventDefault();
      var postResponse = await postRequest(DATACONSTANT.FORGOTPASSWORD, {
        domain: DATACONSTANT.DOMAIN_NAME,
        Version: DATACONSTANT.Version,
        UserName: formData.userID,
      });
      console.log("Forgot password data", postResponse);
      if (postResponse.statuscode === 1) {
        toast.success("Please check whatsapp and email");
        return navigate("/");
      } else {
        toast.error("Invalid userID");
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

  async function cross() {
    var closebtns = document.getElementsByClassName("close");
    var i;

    for (i = 0; i < closebtns.length; i++) {
      closebtns[i].addEventListener("click", function () {
        this.parentElement.style.display = "none";
      });
    }
  }
  return (
    <div>
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
              <form className="form-horizontal" action="">
                <div className="alert alert-success alert-dismissible">
                  <span className="close" style={myStyle} onClick={cross}>
                    &times;
                  </span>
                  Enter your &nbsp;<strong>User ID</strong>&nbsp; and
                  instructions will be sent to you!
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="test"
                      required=""
                      placeholder="User ID"
                      name="userID"
                      onChange={inputHandler}
                    />
                  </div>
                </div>
                <div className="form-group text-center row m-t-20">
                  <div className="col-12">
                    <button
                      className="btn btn-danger btn-block waves-effect waves-light"
                      type="submit"
                      onClick={forgotPWD}
                    >
                      Get Password
                    </button>
                  </div>
                </div>

                <div class="form-group m-t-10 mb-0 row">
                  <div class="col-12 m-t-20 text-center">
                    <NavLink to="/" class="text-muted">
                      Back to Login
                    </NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
  );
};

export default Forgot_password;
