import React, { useEffect, useState } from "react";
import "../../assets/css/addMoney.css";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postRequest } from "../../Services/API_service";
import { DATACONSTANT } from "../../constants/data.constant";
import { getCookie } from "../Library/Cookies";

export const IPMasterPOPUP = ({ setIPPopup }) => {
  const [formData, setFormData] = useState();
  const [show, setShow] = useState(false);
  const [disabled, setdisabled] = useState(false);

  let sessionData = getCookie(DATACONSTANT.SETCOOKIE);

  const [button, setButton] = useState(false);

  const [msg, setMsg] = useState("");
  const [preventtype, setPreventtype] = useState(15);
  function checkIfValidIP(ipAdd) {
    const regexExp =
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    let a = ipAdd.slice(3, 4);

    if (ipAdd.length >= 4) {
      if (a == ".") {
        if (ipAdd.length == 13) {
          if (regexExp.test(ipAdd)) {
            setMsg("1");
            setButton(true);
            console.log("ip is ok");
            return true;
          } else {
            setMsg("You have entered an invalid IP address!");
            return false;
          }
        }
      } else {
        setPreventtype(5);
        setMsg("You have entered an invalid IP address!");
      }
    } else {
      setPreventtype(15);
      setMsg(" ");
    }
  }

  async function saveIP() {
    try {
      setdisabled(true);
      let __x = JSON.parse(sessionData);

      var postResponse = await postRequest(DATACONSTANT.SAVEIP, {
        Version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
        IPType: 1,
        OTP: formData.OTP,
        IP: formData.IP,
      });
      if (postResponse?.statuscode === 4) {
        toast.success("please enter your otp");
        setShow(true);
      } else if (postResponse?.statuscode === 1) {
        toast.success(postResponse.msg);
        setIPPopup(false);
        //
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

  let a = "/IPMaster";

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [btnDisable, setBtnDisable] = useState(false);
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
                        <label for="exampleInputPassword1">IP Type</label>
                        <text
                          aria-describedby="helpType"
                          class="form-control"
                          id="ddlIPType"
                          tabindex="2"
                        >
                          API IP
                        </text>
                      </div>{" "}
                      <div class="form-group">
                        <label for="exampleInputPassword1">IP</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="xxx-xxx-xxx-xxx"
                          required=""
                          name="IP"
                          maxLength={preventtype}
                          onChange={(e) => {
                            inputHandler(e);
                            setBtnDisable(true);
                            checkIfValidIP(formData["IP"]);
                          }}
                        />
                        {msg == "1" ? (
                          <p style={{ color: "green" }}>IP Address is Valid</p>
                        ) : (
                          <p style={{ color: "red" }}>{msg}</p>
                        )}
                      </div>
                      {btnDisable ? (
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={saveIP}
                        >
                          {disabled ? "Requesting..." : "Save"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={saveIP}
                          disabled
                        >
                          {disabled ? "Requesting..." : "Save"}
                        </button>
                      )}
                      <button
                        type="button"
                        class="btn btn-primary ml-2"
                        onClick={() => {
                          setIPPopup(false);
                        }}
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
                        <label for="exampleInputPassword1">IP Type</label>
                        <text
                          aria-describedby="helpType"
                          class="form-control"
                          id="ddlIPType"
                          tabindex="2"
                        >
                          API IP
                        </text>
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
                        onClick={() => {
                          saveIP();
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary ml-2"
                        onClick={() => {}}
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
