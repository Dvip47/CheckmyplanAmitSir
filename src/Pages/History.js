import React, { useEffect, useState } from "react";
import { DATACONSTANT } from "../constants/data.constant";
import { getCookie } from "../Services/Cookies";
import { postRequest } from "../Services/API_service";

const History = () => {
  useEffect(() => {
    getHitLimit();
  }, []);

  const [data, setData] = useState([]);
  let sessionData = getCookie(DATACONSTANT.SETCOOKIE);
  async function getHitLimit() {
    try {
      let __x = JSON.parse(sessionData);
      var postResponse = await postRequest(DATACONSTANT.GETAPILIMIT, {
        Version: DATACONSTANT.VERSION2,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      setData(postResponse?.data);
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
      <div id="__p" className="main-temp-body " style={{ marginTop: "100px" }}>
        <div className="container">
          <div className="row">
            <input type="hidden" id="hdnIP" />
            <input type="hidden" id="hdnIPType" />
            <div className="col-md-12" style={{ marginTop: "-110px" }}>
              <div className="card cus-card mt-5">
                <div
                  className="card-header cus-bg text-white"
                  style={{
                    backgroundColor: "rgb(96 93 175)",
                  }}
                >
                  <i className="fa fa-history" aria-hidden="true"></i> History
                  <div className="float-right"></div>
                </div>
                <div className="card-body p-1">
                  <div>
                    <table
                      className="table table-bordered table-striped table-responsive-sm "
                      id="tblIPAddress"
                    >
                      <thead className="bg-tableth" style={{ width: "10px" }}>
                        <tr>
                          <th>#</th>
                          <th>Package Name</th>
                          <th>Daily Hit Limit</th>
                          <th>Today Hit</th>
                        </tr>
                      </thead>
                      {data.length !== 0 ? (
                        <tbody>
                          {data?.map((item, i) => {
                            return (
                              <tr data-item-id="6">
                                <td>{i + 1}</td>
                                <td>{item.packageName} </td>
                                <td>{item.dailyHitLimit}</td>
                                <td>{item.todayHit}</td>
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

export default History;
