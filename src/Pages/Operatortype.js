import React, { useState } from "react";
import { DATACONSTANT } from "../constants/data.constant";
import { useEffect } from "react";
import { getRequest, postRequest } from "../Services/API_service";
import Navbar from "./Navbar";
import { getCookie } from "../Services/Cookies";

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
        </div>
      </header>
      <div id="__p" className="main-temp-body " style={{ marginTop: "100px" }}>
        <div className="container-fluid">
          <div className="row">
            <input type="hidden" id="hdnIP" />
            <input type="hidden" id="hdnIPType" />
            <div className="col-md-12">
              <div className="card cus-card mt-5">
                <div
                  className="card-header cus-bg text-white"
                  style={{
                    backgroundColor: "rgb(96 93 175)",
                  }}
                >
                  <i className="fas fa-link"></i> Operator Type's
                </div>
                <div className="card-body p-1">
                  <div className="table-responsive calcHeight">
                    {data.length !== 0 ? (
                      <>
                        {data?.map((item, i) => {
                          return (
                            <>
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
