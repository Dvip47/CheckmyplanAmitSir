import React, { useEffect, useState } from "react";
import Leftbar from "./Leftbar";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IPMasterPOPUP } from "./IPMasterPOPUP";
import "../../assets/css/IP.css";
import { postRequest } from "../../Services/API_service";
import { DATACONSTANT } from "../../constants/data.constant";
import { getCookie } from "../Library/Cookies";
import swal from "sweetalert";

export const IPMaster = () => {
  useEffect(() => {
    getIP();
  }, []);

  const [IPPopup, setIPPopup] = useState(false);

  let sessionData = getCookie(DATACONSTANT.SETCOOKIE);
  const [data, setData] = useState([]);

  async function getIP() {
    try {
      let __x = JSON.parse(sessionData);
      var postResponse = await postRequest(DATACONSTANT.GETIP, {
        Version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      setData(postResponse?.data);
      // console.log("abcd meko test kra do", data);
    } catch (error) {
      return {
        statusCode: -1,
        msg: error.code,
      };
    }
  }

  async function deleteIP(id) {
    swal({
      title: "Delete This Plan?",
      text: "Are you sure to delete!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isDelete) => {
      if (isDelete) {
        del();
        async function del() {
          try {
            let __x = JSON.parse(sessionData);

            var postResponse = await postRequest(DATACONSTANT.DELETEIP, {
              Version: DATACONSTANT.Version,
              APPID: DATACONSTANT.APPID,
              UserID: __x?.userID,
              SessionID: __x?.sessionID,
              Session: __x?.session,
              ID: id ?? 0,
              IsWLAPIAllowed: false,
            });
            if (postResponse.statuscode === 1) {
              toast.success("Successfully Deleted");
              getIP();
            } else {
              toast.error("API Not respond");
            }
          } catch (error) {
            toast.error(error.code);
            return {
              statuscode: -1,
              msg: error.code,
            };
          }
        }
      } else {
        swal("Fail", "IP Delete Failed!", "error");
      }
    });
  }

  let x = getCookie(DATACONSTANT.SETCOOKIE);

  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState([]);
  const [input, setInput] = useState({
    amount: "",
    oid: 0,
  });

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
      // console.log("balance", postResponse?.bBalance);
      setBalance(postResponse?.bBalance);
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
  }

  return (
    <div>
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
                  <i class="fas fa-link"></i> IPAddress Master
                  <div class="float-right">
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

                      <div class="input-group-append">
                        <button
                          id="btnNew"
                          class="btn btn-default btn-sm"
                          style={{ borderRadius: "2px" }}
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
                  {/* <div class="form-inline float-right">
                    <div class="form-group has-search">
                      <span class="fa fa-search form-control-feedback"></span>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Search IP Address"
                      />
                    </div>

                    <button
                      id="btnNew"
                      class="btn btn-primary"
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
                  </div> */}
                </div>
                <div class="card-body p-1">
                  <div class="table-responsive calcHeight">
                    <table
                      class="table table-bordered table-striped table-responsive-sm fixedHeader"
                      id="tblIPAddress"
                    >
                      <thead class="bg-tableth" style={{ width: "10px" }}>
                        <tr>
                          <th>#</th>
                          {/* <th>User</th> */}
                          <th>Mobile Number</th>
                          <th>IPAddress</th>
                          {/* <th>Type</th> */}
                          <th>LastModified</th>
                          <th>Status</th>
                          <th>Action</th>
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
                                {/* <td>{item.outletName}</td> */}
                                <td>{item.mobileNo} </td>
                                <td>{item.ip}</td>
                                {/* <td>{item.ipType}</td> */}
                                <td>{item.lastModified}</td>

                                <td>
                                  {item.isActive ? (
                                    <label class="switch">
                                      <input type="checkbox" checked />
                                      <span class="slider round"></span>
                                    </label>
                                  ) : (
                                    <label class="switch">
                                      <input type="checkbox" />
                                      <span class="slider round"></span>
                                    </label>
                                  )}
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
