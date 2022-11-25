import React, { useEffect, useState } from "react";
import "../../assets/css/addMoney.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { postRequest } from "../../Services/API_service";
import { DATACONSTANT } from "../../constants/data.constant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../Library/Cookies";

function ChangePasswordModal({ setModal }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passwordOld: "",
    passwordNew: "",
    passwordNe: "",
  });
  console.log("............", formData);

  let sessionData = getCookie(DATACONSTANT.SETCOOKIE);
  let msg = "";

  async function checkValidation() {
    if (formData?.passwordNe === "") {
      msg = " ";
    } else if (formData?.passwordNew !== formData?.passwordNe) {
      msg = "Password did not match with confirm password";
    } else {
      msg = " ";
    }
  }
  checkValidation();
  async function changePWD() {
    try {
      let __x = JSON.parse(sessionData);
      // e.preventDefault();
      var postResponse = await postRequest(DATACONSTANT.CHANGEPASSWORD, {
        Version: DATACONSTANT.VERSION2,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
        OldPassword: formData.passwordOld,
        NewPassword: formData.passwordNew,
      });
      if (postResponse?.statusCode === 1) {
        toast.success("password change successfully");
        setModal(false);
      } else {
        toast.error(postResponse.msg);
      }
    } catch (error) {
      return {
        statusCode: -1,
        msg: error.code,
      };
    }
  }

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div class="modal show" style={{ display: "block" }} id="myModal">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">CHANGE PASSWORD</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              onClick={() => setModal(false)}
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="credit rounded mt-2 justify-content-between align-items-center">
                <div class="mt-3">
                  <form>
                    <div class="form-group">
                      <label for="exampleInputPassword1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password"
                        required=""
                        name="passwordOld"
                        onChange={inputHandler}
                      />
                    </div>{" "}
                    <div class="form-group">
                      <label for="exampleInputPassword1">New Password</label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="New Password"
                        required=""
                        name="passwordNew"
                        onChange={inputHandler}
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Confirm Password"
                        required=""
                        name="passwordNe"
                        onChange={inputHandler}
                      />
                      <p style={{ color: "red" }}>{msg}</p>
                    </div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={changePWD}
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary ml-2"
                      onClick={() => setModal(false)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
