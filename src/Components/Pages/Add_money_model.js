import React, { useEffect, useState } from "react";
import "../../assets/css/addMoney.css";
import { getCookie } from "../Library/Cookies";
import { DATACONSTANT } from "../../constants/data.constant";
import { postRequest } from "../../Services/API_service";
import wallet from "../../assets/images/wallet.png";

function Add_Money_model({
  setShow,
  setData,
  setPaymentGatewayState,
  input,
  setInput,
}) {
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
    console.log("input bu user", input);
  }, []);

  const [method, setMethod] = useState([]);
  const [balance, setBalance] = useState(0);
  const [loader, setLoader] = useState(false);
  let change = (e) => {
    let reg = new RegExp("[0-9]");
    const { name, value } = e.target;
    if (
      reg.test(value[value.length - 1]) ||
      value[value.length - 1] == undefined
    ) {
      setInput((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };
  async function getAddMoneyOptions() {
    setLoader(true);
    try {
      let x = getCookie(DATACONSTANT.SETCOOKIE);
      let __x = JSON.parse(x);
      var postResponse = await postRequest(DATACONSTANT.ADD_MONEY_URL, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      setBalance(postResponse.userBalance);
      setMethod(postResponse?.data);
      console.log("add money options", postResponse);
      setInput((prev) => {
        return { ...prev, oid: postResponse?.data[4]?.oid };
      });
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
    setLoader(false);
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
              <div class="">
                <div class="pricing rounded d-flex justify-content-between">
                  <div class="images d-flex flex-row align-items-center p-3">
                    <img src={wallet} class="rounded" width="60" />
                    <div class="d-flex flex-column ml-4">
                      <span class="business" style={{ fontWeight: "bold" }}>
                        Current Balance
                      </span>
                      <span
                        class="plan"
                        style={{ color: "grey", fontWeight: "bold" }}
                      >
                        Rs: {balance}
                      </span>
                    </div>
                  </div>
                </div>
                <h4 class="heading mt-3">Enter Amount</h4>
                <input
                  type="text"
                  id=""
                  name="amount"
                  placeholder="0"
                  className="form-control"
                  onChange={change}
                  value={input.amount}
                />
                <h6 class="detail mt-3">Payment details</h6>
                <div class="credit rounded mt-2 justify-content-between align-items-center">
                  {loader && "Loading..."}
                  {method?.map((data, index) => {
                    return (
                      <div
                        class="d-flex flex-row align-items-center"
                        onClick={() =>
                          setInput((prev) => {
                            return { ...prev, oid: data.oid };
                          })
                        }
                      >
                        <img
                          src="https://i.imgur.com/qHX7vY1.png"
                          class="rounded"
                          width="70"
                          className="mr-2 pt-2"
                        />
                        <div class="form-check my-badge">
                          <input
                            class="form-check-input cus-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
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

                  <div class="mt-3 text-right">
                    <button
                      className="btn btn-danger"
                      type="button"
                      // class="btn btn-primary btn- btn-block btn-lg"
                      onClick={() => {
                        setPaymentGatewayState(true);
                        setShow(false);
                      }}
                      disabled={input.amount == 0}
                    >
                      Proceed
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
