import React, { useEffect, useState } from "react";
import "../../assets/css/addMoney.css";
import { getCookie } from "../Library/Cookies";
import { DATACONSTANT } from "../../constants/data.constant";
import { postRequest } from "../../Services/API_service";

function Add_Money_model({ setShow, setData }) {
  const [input, setInput] = useState({
    Enter_Amount: " ",
  });
  // const changeHandler = (event) => {
  //   const { name, value } = event.target;
  //   setInput((previous) => {
  //     return {
  //       ...previous,
  //       [name]: value,
  //     };
  //   });
  // };
  // const handleForm = () => {
  //   setData((data) => [...data, input]);
  // };

  useEffect(() => {
    getAddMoneyOptions();
  }, []);

  const [method, setMethod] = useState([]);

  async function getAddMoneyOptions() {
    try {
      let x = getCookie(DATACONSTANT.SETCOOKIE);
      // console.log("model page", x);
      let __x = JSON.parse(x);
      var postResponse = await postRequest(DATACONSTANT.ADD_MONEY_URL, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      // console.log("options", postResponse);
      setMethod(postResponse?.data);
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
  }

  return (
    <div class="modal show" style={{ display: "block" }} id="myModal">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">ADD MONEY TO WALLET</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              onClick={() => setShow(false)}
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="card p-3">
                <div class="pricing rounded d-flex justify-content-between">
                  <div class="images d-flex flex-row align-items-center p-3">
                    <img
                      src="siteadmin/img/wallet.png"
                      class="rounded"
                      width="60"
                    />
                    <div class="d-flex flex-column ml-4">
                      <span class="business">Small Business</span>
                      <span class="plan">Your wallet Ballance</span>
                    </div>
                  </div>
                </div>
                <h4 class="heading mt-3">Enter Amount</h4>
                <input
                  type="text"
                  id=""
                  name=""
                  value=""
                  placeholder="0"
                  className="form-control"
                />
                <span class="detail mt-3">Payment details</span>
                <div class="credit rounded mt-2 justify-content-between align-items-center">
                  {method?.map((data, index) => {
                    return (
                      <div class="d-flex flex-row align-items-center">
                        <img
                          src="https://i.imgur.com/qHX7vY1.png"
                          class="rounded"
                          width="70"
                          className="mr-2"
                        />
                        <div class="form-check my-badge">
                          <input
                            class="form-check-input cus-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            checked
                            style={{ width: "13px" }}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            {data.name}
                          </label>
                          <span class="badge badge-danger">Changes 3%</span>
                        </div>
                      </div>
                    );
                  })}

                  <div class="mt-3">
                    <button
                      type="button"
                      class="btn btn-primary btn- btn-block btn-lg"
                    >
                      PAY WITH QR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add_Money_model;
