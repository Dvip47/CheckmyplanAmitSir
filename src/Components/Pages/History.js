import React, { useEffect, useState } from "react";
import { DATACONSTANT } from "../../constants/data.constant";
import { getCookie } from "../Library/Cookies";
import { postRequest } from "../../Services/API_service";

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
      console.log(".........", postResponse);
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
      <div id="__p" class="main-temp-body " style={{ marginTop: "100px" }}>
        <div class="container">
          <div class="row">
            <input type="hidden" id="hdnIP" />
            <input type="hidden" id="hdnIPType" />
            <div class="col-md-12" style={{ marginTop: "-110px" }}>
              <div class="card cus-card mt-5">
                <div
                  class="card-header cus-bg text-white"
                  style={{
                    backgroundColor: "rgb(96 93 175)",
                  }}
                >
                  <i class="fa fa-history" aria-hidden="true"></i> History
                  <div class="float-right"></div>
                </div>
                <div class="card-body p-1">
                  <div>
                    <table
                      class="table table-bordered table-striped table-responsive-sm "
                      id="tblIPAddress"
                    >
                      <thead class="bg-tableth" style={{ width: "10px" }}>
                        <tr>
                          <th>#</th>
                          <th>Package Name</th>
                          <th>Daily Hit Limit</th>
                          <th>Today Hit</th>
                        </tr>
                      </thead>
                      {data.length !== 0 ? (
                        <tbody>
                          {/* {data?.map((data, index) => { */}
                          {/* return ( */}
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
                            <td colspan="8">
                              <h3 class="text-center">Data Not Found</h3>
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
