import React, { useEffect, useState } from "react";
import "../assets/css/addMoney.css";
import { getCookie } from "../Services/Cookies";
import { DATACONSTANT } from "../constants/data.constant";
import { postRequest } from "../Services/API_service";
import wallet from "../assets/images/wallet.png";

function Add_Money_model({
  setShow, //from plantypes.js
  setData,
  setPaymentGatewayState, // from add money modal
  input, //from plantype.js
  setInput, //from plantype.js
}) {
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
    <div className="modal show" style={{ display: "block" }} id="myModal">
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">ADD MONEY TO WALLET</h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={() => setShow(false)}
            >
              ×
            </button>
          </div>
          <div className="modal-body">
            
                <div className="pricing rounded d-flex justify-content-between">
                  <div className="images d-flex flex-row align-items-center p-3">
                    <img src={wallet} className="rounded" width="60" />
                    <div className="d-flex flex-column ml-4">
                      <span className="business" style={{ fontWeight: "bold" }}>
                        Current Balance
                      </span>
                      <span
                        className="plan"
                        style={{
                          color: "grey",
                          fontWeight: "bold",
                          fontFamily: "serif",
                        }}
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Indian_Rupee_symbol.svg/1200px-Indian_Rupee_symbol.svg.png"
                          style={{
                            width: "8px",
                            position: "relative",
                            left: "-2px",
                            bottom: "2px",
                          }}
                        />
                        {balance}
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className="heading mt-3">Enter Amount</h4>
                <input
                  type="text"
                  id=""
                  name="amount"
                  placeholder="0"
                  className="form-control"
                  onChange={change}
                  value={input.amount}
                />
                <h6 className="detail mt-3">Payment details</h6>
                <div className="credit rounded mt-2 justify-content-between align-items-center">
                  {loader && "Loading..."}
                  {method?.map((data, index) => {
                    return (
                      <div
                        className="d-flex flex-row align-items-center"
                        onClick={() =>
                          setInput((prev) => {
                            return { ...prev, oid: data.oid };
                          })
                        }
                      >
                        <img
                          src="https://i.imgur.com/qHX7vY1.png"
                          className="rounded"
                          width="70"
                          className="mr-2 pt-2"
                        />
                        <div className="form-check my-badge">
                          <input
                            className="form-check-input cus-input"
                            type="radio"
                            name="flexRadioDefault"
                            id={data.oid}
                            style={{ width: "13px" }}
                          />
                          <label className="form-check-label" for={data.oid}>
                            {data.name}
                          </label>

                          <span className="badge badge-danger">Changes 3%</span>
                        </div>
                      </div>
                    );
                  })}

                  <div className="mt-3 text-right">
                    <button
                      className="btn btn-danger"
                      type="button"
                      // className="btn btn-primary btn- btn-block btn-lg"
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
      
  );
}

export default Add_Money_model;
