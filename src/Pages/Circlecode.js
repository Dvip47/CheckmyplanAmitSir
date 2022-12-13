import React, { useState } from "react";
import { DATACONSTANT } from "../constants/data.constant";
import { useEffect } from "react";
import { getRequest, postRequest } from "../Services/API_service";
import Navbar from "./Navbar";
import { getCookie } from "../Services/Cookies";

export const Circlecode = () => {
  useEffect(() => {
    getCircleCode();
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

  async function getCircleCode() {
    try {
      var getResponse = await getRequest(DATACONSTANT.GETCIRCLECODE);
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
                  <i className="fas fa-link"></i> Circle Code
                </div>
                <div className="card-body p-1">
                  <div className="table-responsive calcHeight">
                    <table
                      className="table table-bordered table-striped table-responsive-sm fixedHeader"
                      id="tblIPAddress"
                    >
                      <thead className="bg-tableth" style={{ width: "10px" }}>
                        <tr>
                          <th>#</th>
                          <th>Circle</th>
                          <th>Circle Code</th>
                        </tr>
                      </thead>
                      {data.length !== 0 ? (
                        <tbody>
                          {data?.map((item, i) => {
                            return (
                              <tr data-item-id="6">
                                <td>{i + 1}</td>
                                <td>{item.circle} </td>
                                <td>{item.code}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      ) : (
                        <tbody>
                          <tr>
                            <td colSpan="8">
                              <h3 className="text-center">Data Not Found</h3>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
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
