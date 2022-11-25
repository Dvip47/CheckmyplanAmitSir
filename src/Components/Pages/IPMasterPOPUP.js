import React, { useState } from "react";
import "../../assets/css/addMoney.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postRequest } from "../../Services/API_service";
import { DATACONSTANT } from "../../constants/data.constant";
import { getCookie } from "../Library/Cookies";

export const IPMasterPOPUP = ({ setIPPopup }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();
  const [show, setShow] = useState(false);

  let sessionData = getCookie(DATACONSTANT.SETCOOKIE);

  async function saveIP() {
    try {
      let __x = JSON.parse(sessionData);

      var postResponse = await postRequest(DATACONSTANT.SAVEIP, {
        Version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
        IPType: formData.IPType,
        OTP: formData.OTP,
        IP: formData.IP,
      });
      if (postResponse?.statuscode === 4) {
        toast.success("please enter your otp");
        setShow(true);
      } else if (postResponse?.statuscode === 1) {
        toast.success(postResponse.msg);
      } else {
        toast.error(postResponse.msg);
      }
      console.log(postResponse);
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
            <h3 class="modal-title">SAVE IPADDRESS</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              onClick={() => setIPPopup(false)}
            >
              ×
            </button>
          </div>
          {!show ? (
            <div class="modal-body">
              <div class="container">
                <div class="credit rounded mt-2 justify-content-between align-items-center">
                  <div class="mt-3">
                    <form>
                      <div class="form-group">
                        <label for="exampleInputPassword1">
                          Select IP Type{" "}
                        </label>
                        <select
                          aria-describedby="helpType"
                          class="form-control"
                          id="ddlIPType"
                          tabindex="2"
                          name="IPType"
                          onChange={inputHandler}
                        >
                          <option value="0">:: Select Type ::</option>
                          <option value="1">API IP</option>
                          <option value="2">Call Back IP</option>
                          <option value="3">Long Code IP</option>
                          <option value="4">Shopping IP</option>
                        </select>
                      </div>{" "}
                      <div class="form-group">
                        <label for="exampleInputPassword1">IP</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="xxxx-xxxx-xxxx-xxxx"
                          required=""
                          name="IP"
                          onChange={inputHandler}
                        />
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={saveIP}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary ml-2"
                        onClick={() => setIPPopup(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div class="modal-body">
              <div class="container">
                <div class="credit rounded mt-2 justify-content-between align-items-center">
                  <div class="mt-3">
                    <form>
                      <div class="form-group">
                        <label for="exampleInputPassword1">
                          Select IP Type{" "}
                        </label>
                        <select
                          aria-describedby="helpType"
                          class="form-control"
                          id="ddlIPType"
                          tabindex="2"
                          name="IPType"
                          onChange={inputHandler}
                        >
                          <option value="0">:: Select Type ::</option>
                          <option value="1">API IP</option>
                          <option value="2">Call Back IP</option>
                          <option value="3">Long Code IP</option>
                          <option value="4">Shopping IP</option>
                        </select>
                      </div>{" "}
                      <div class="form-group">
                        <label for="exampleInputPassword1">IP</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="xxxx-xxxx-xxxx-xxxx"
                          required=""
                          name="IP"
                          onChange={inputHandler}
                        />
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">OTP</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="please enter otp"
                          name="OTP"
                          onChange={inputHandler}
                        />
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={saveIP}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary ml-2"
                        onClick={() => setIPPopup(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
