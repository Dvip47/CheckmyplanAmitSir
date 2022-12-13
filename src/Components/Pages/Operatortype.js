import React, { useState } from "react";
import { DATACONSTANT } from "../../constants/data.constant";
import { useEffect } from "react";
import { getRequest, postRequest } from "../../Services/API_service";
import Navbar from "./Navbar";
import { getCookie } from "../Library/Cookies";

export const Operatortype = () => {
  useEffect(() => {
    getOperatorCode();
  }, []);

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState([]);
  const [input, setInput] = useState({
    amount: "",
    oid: 0,
  });

  let x = getCookie(DATACONSTANT.SETCOOKIE);

  async function getBalance() {
    try {
      let __x = JSON.parse(x);
      var postResponse = await postRequest(DATACONSTANT.BALANCE_URL, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      setBalance(postResponse?.bBalance);
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
  }

  async function getOperatorCode() {
    try {
      var getResponse = await getRequest(DATACONSTANT.GETOPERATORCODE);
      setData(getResponse?.data);
      console.log("....", getResponse);
    } catch (error) {
      return {
        statusCode: -1,
        msg: error.code,
      };
    }
  }

  return (
    <div>
      {" "}
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            {/* <Leftbar /> */}
            <div className="clearfix"></div>
          </div>
          <Navbar
            show={show}
            setShow={setShow}
            input={input}
            setInput={setInput}
            getBalance={getBalance}
            balance={balance}
            setBalance={setBalance}
          />
        </div>{" "}
      </header>
      <div id="__p" class="main-temp-body " style={{ marginTop: "100px" }}>
        <div class="container-fluid">
          <div class="row">
            <input type="hidden" id="hdnIP" />
            <input type="hidden" id="hdnIPType" />
            <div class="col-md-12">
              <div class="card cus-card mt-5">
                <div
                  class="card-header cus-bg text-white"
                  style={{
                    backgroundColor: "rgb(96 93 175)",
                  }}
                >
                  <i class="fas fa-link"></i> Operator Type's
                  {/* <div class="float-right">
                    <div
                      class="input-group"
                      style={{
                        borderBottom: "1px solid",
                        background: "#605dafb",
                      }}
                    >
                      <input
                        id="txtSearch"
                        class="form-control text-left"
                        placeholder="Search IPAddress"
                        style={{
                          marginRight: "10px",
                          border: "none",
                          color: "#fff",
                          background: "#605daf",
                        }}
                      />
                      <i
                        class="fa fa-search"
                        aria-hidden="true"
                        style={{
                          margin: "auto",
                          marginRight: "5px",
                          color: "#fff",
                          background: "none",
                          border: "none",
                        }}
                      ></i>
                    </div>
                  </div> */}
                </div>
                <div class="card-body p-1">
                  <div class="table-responsive calcHeight">
                    {data.length !== 0 ? (
                      <>
                        {data?.map((item, i) => {
                          return (
                            <>
                              {/* <tr data-item-id="6">
                                  <td>
                                    <span className="btn btn-sm btn-outline-success mr-2">
                                      <i className="fa fa-plus"></i>
                                    </span>
                                    {i + 1}
                                  </td>
                                  <td>{item.optype} </td>
                                </tr> */}

                              <table className="table">
                                <thead>
                                  <tr>
                                    <th colSpan={3}>{item.optype}</th>
                                  </tr>
                                  <tr>
                                    <th>#</th>
                                    <th>Operator</th>
                                    <th>Sp Key</th>
                                  </tr>
                                </thead>
                                {item.operators?.map((op, j) => {
                                  return (
                                    <tr>
                                      <td>{j + 1}</td>
                                      <td>{op.operatorName}</td>
                                      <td>{op.spkey}</td>
                                    </tr>
                                  );
                                })}
                              </table>
                            </>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
