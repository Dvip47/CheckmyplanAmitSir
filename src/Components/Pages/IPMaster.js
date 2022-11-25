import React, { useEffect, useState } from "react";
import Leftbar from "./Leftbar";
import Navbar from "./Navbar";
import Footer from "../Component/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { IPMasterPOPUP } from "./IPMasterPOPUP";
import "../../assets/css/IP.css";
import { postRequest } from "../../Services/API_service";
import { DATACONSTANT } from "../../constants/data.constant";
import { getCookie } from "../Library/Cookies";

export const IPMaster = () => {
  useEffect(() => {
    getIP();
  }, []);
  const [IPPopup, setIPPopup] = useState(false);

  let sessionData = getCookie(DATACONSTANT.SETCOOKIE);
  const [data, setData] = useState([]);
  const [delIP, setDeleteIP] = useState(false);

  async function getIP() {
    try {
      let __x = JSON.parse(sessionData);
      // e.preventDefault();

      var postResponse = await postRequest(DATACONSTANT.GETIP, {
        Version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      //console.log(postResponse?.data);
      setData(postResponse?.data);
      console.log(data);
    } catch (error) {
      return {
        statusCode: -1,
        msg: error.code,
      };
    }
  }

  async function deleteIP(id) {
    try {
      let __x = JSON.parse(sessionData);
      // e.preventDefault();

      var postResponse = await postRequest(DATACONSTANT.DELETEIP, {
        Version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
        ID: id ?? 0,
        IsWLAPIAllowed: false,
      });
      // setData(postResponse?.data);
      console.log(postResponse);
      // setDeleteIP(true);
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
            <Leftbar />
            <div className="clearfix"></div>
          </div>
        </div>{" "}
      </header>

      <div id="__p" class="main-temp-body mt-5">
        <div class="container-fluid">
          <div class="row">
            <input type="hidden" id="hdnIP" />
            <input type="hidden" id="hdnIPType" />
            <div class="col-md-12">
              <div class="card mt-5">
                <div
                  class="card-header cus-bg text-white"
                  style={{
                    backgroundColor: "#313197",
                  }}
                >
                  <i class="fas fa-link"></i> IPAddress Master
                  <div class="float-right">
                    <div class="input-group">
                      <input
                        id="txtSearch"
                        class="form-control text-left"
                        placeholder="Search IPAddress"
                      />
                      <div class="input-group-append">
                        <button
                          id="btnNew"
                          class="btn btn-default btn-sm"
                          onClick={() => {
                            setIPPopup(true);
                          }}
                        >
                          New
                        </button>
                        {IPPopup && (
                          <IPMasterPOPUP
                            IPPopup={IPPopup}
                            setIPPopup={setIPPopup}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body p-1">
                  <div class="table-responsive calcHeight">
                    <table
                      class="table table-bordered table-striped table-responsive-sm fixedHeader"
                      id="tblIPAddress"
                    >
                      <thead class="bg-tableth">
                        <tr>
                          <th>#</th>
                          <th>User</th>
                          <th>Mobile Number</th>
                          <th>IPAddress</th>
                          <th>Type</th>
                          <th>LastModified</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {data?.map((data, index) => { */}
                        {/* return ( */}
                        {data?.map((item, i) => {
                          return (
                            <tr data-item-id="6">
                              <td>{i + 1}</td>
                              <td>{item.outletName}</td>
                              <td>{item.mobileNo} </td>
                              <td>{item.ip}</td>
                              <td>{item.ipType}</td>
                              <td>{item.lastModified}</td>

                              <td>
                                <label class="switch">
                                  <input type="checkbox" />
                                  <span class="slider round"></span>
                                </label>
                              </td>
                              <td>
                                <i
                                  class="fa fa-trash"
                                  aria-hidden="true"
                                  style={{ color: "red" }}
                                  onClick={() => {
                                    deleteIP(item.id);
                                    getIP();
                                  }}
                                  // onClick={deleteIP(item.id)}
                                ></i>
                              </td>
                            </tr>
                          );
                        })}

                        {/* ); */}
                        {/* })} */}
                      </tbody>
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
