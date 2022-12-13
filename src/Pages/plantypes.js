import React from "react";
import Navbar from "./Navbar";
import History from "./History";
import "../assets/css/plantype.css";
import { DATACONSTANT } from "../constants/data.constant";
import { postRequest } from "../Services/API_service";
import { getCookie } from "../Services/Cookies";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "../assets/images/greenInrIcon.png";
import swal from "sweetalert";

export default function PlanTypes() {
  useEffect(() => {
    getPlan();
  }, []);

  const [input, setInput] = useState({
    amount: "",
    oid: 0,
  });
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [balance, setBalance] = useState([]);

  async function getPlan() {
    setLoader(true);
    try {
      let __x = JSON.parse(x);
      var postResponse = await postRequest(DATACONSTANT.GET_PLAN_URL, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      setData(postResponse?.data);
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
    setLoader(false);
  }

  const [info, setInfo] = useState(true);
  let x = getCookie(DATACONSTANT.SETCOOKIE);

  useEffect(() => {
    if (!getCookie(DATACONSTANT.SETCOOKIE)) {
      setInfo(false);
    } else {
      setInfo(true);
    }
  }, [info, x]);

  <p id="demo"></p>;

  async function buyPlan2(pId, amt) {
    swal({
      title: "Buy This Plan?",
      text: "Are you sure to proceed!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isBuy) => {
      if (isBuy) {
        buy();
        async function buy() {
          try {
            let __x = JSON.parse(x);
            var postResponse = await postRequest(DATACONSTANT.BUY_URL, {
              version: DATACONSTANT.Version,
              APPID: DATACONSTANT.APPID,
              UserID: __x?.userID,
              PackageId: pId,
              SessionID: __x?.sessionID,
              Session: __x?.session,
            });
            if (postResponse?.statuscode == "-1") {
              toast.error(postResponse.msg);
              if (postResponse.msg === "Insufficient Balance!") {
                setShow(true);
                setInput((prev) => {
                  return {
                    ...prev,
                    amount: amt,
                  };
                });
              }
            } else {
              toast.success(postResponse.msg);
            }
          } catch (ex) {
            toast.error(ex.code);
            return {
              statuscode: -1,
              msg: ex.code,
            };
          }
        }
      } else {
        swal("Fail", "Plan Purchase Failed!", "error");
      }
    });
  }

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

  return (
    <div>
      <header id="topnav">
        <div className="topbar-main">
          <Navbar
            show={show}
            setShow={setShow}
            input={input}
            setInput={setInput}
            getBalance={getBalance}
            balance={balance}
            setBalance={setBalance}
            getPlan={getPlan}
          />
        </div>
      </header>
      <section id="generic_price_table">
        <div>
          {loader && (
            <div
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                zIndex: 999,
                backgroundColor: "rgba(0,0,0,0.3)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <div className="spinner-border m-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="price-heading clearfix">
                  <h1>Our Pricing</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row d-flex justify-content-center">
              {data?.map((data, index) => {
                if (data.isExpired === false && data.isPurchased === true) {
                  return (
                    <div className="col-md-3" key={index}>
                      <div className="generic_content clearfix">
                        <div className="generic_head_price clearfix">
                          <div className="box">
                            <div className="ribbon ribbon-top-right">
                              <span>{data.isActive ? "Active" : ""}</span>
                            </div>
                          </div>
                        </div>
                        <div className="generic_feature_list">
                          <h4>
                            {" "}
                            <img
                              src={Icon}
                              style={{
                                width: "27px",
                                position: "relative",
                                left: "9px",
                                bottom: "2px",
                              }}
                            />{" "}
                            {data.packageCost}
                          </h4>
                          <ul>
                            <li>
                              <span>Package Id: {data.packageId}</span>
                            </li>
                            <li>
                              <span>{data.slab}</span>
                            </li>
                            <li>
                              <span>{data.remark}</span>
                            </li>
                            <li>
                              <span>Validity: {data.validityInDays}</span>
                            </li>
                            <li>
                              <span>Daily Hit Count: {data.dailyHitCount}</span>
                            </li>
                            <li>
                              <span>Service: {data.serviceName}</span>
                            </li>
                          </ul>
                        </div>

                        <div
                          className="generic_price_btn clearfix"
                          style={{ height: "26px" }}
                        >
                        </div>
                      </div>
                    </div>
                  );
                } else if (
                  data.isExpired === false &&
                  data.isPurchased === false &&
                  data.isActive === true
                ) {
                  return (
                    <div className="col-md-3" key={index}>
                      <div className="generic_content clearfix">
                        <div className="generic_head_price clearfix">
                          <div className="box">
                          </div>
                        </div>
                        <div className="generic_feature_list">
                          <h4>
                            {" "}
                            <img
                              src={Icon}
                              style={{
                                width: "27px",
                                position: "relative",
                                left: "9px",
                                bottom: "2px",
                              }}
                            />{" "}
                            {data.packageCost}
                          </h4>
                          <ul>
                            <li>
                              <span>Package Id: {data.packageId}</span>
                            </li>
                            <li>
                              <span>{data.slab}</span>
                            </li>
                            <li>
                              <span>{data.remark}</span>
                            </li>
                            <li>
                              <span>Validity: {data.validityInDays}</span>
                            </li>
                            <li>
                              <span>Daily Hit Count: {data.dailyHitCount}</span>
                            </li>
                            <li>
                              <span>Service: {data.serviceName}</span>
                            </li>
                          </ul>
                        </div>

                        <div
                          className="generic_price_btn clearfix"
                          onClick={() => {
                            buyPlan2(data.packageId, data.packageCost);
                          }}
                        >
                          <a data-toggle="confirmation" className="btn mr-2">
                            Buy Plan
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                } else if (
                  data.isExpired === true &&
                  data.isPurchased === true &&
                  data.isActive === false
                ) {
                  return (
                    <div className="col-md-3" key={index}>
                      <div className="generic_content clearfix">
                        <div className="generic_head_price clearfix">
                          <div className="box">
                          </div>
                        </div>
                        <div className="generic_feature_list">
                          <h4>
                            {" "}
                            <img
                              src={Icon}
                              style={{
                                width: "27px",
                                position: "relative",
                                left: "9px",
                                bottom: "2px",
                              }}
                            />{" "}
                            {data.packageCost}
                          </h4>
                          <ul>
                            <li>
                              <span>Package Id: {data.packageId}</span>
                            </li>
                            <li>
                              <span>{data.slab}</span>
                            </li>
                            <li>
                              <span>{data.remark}</span>
                            </li>
                            <li>
                              <span>Validity: {data.validityInDays}</span>
                            </li>
                            <li>
                              <span>Daily Hit Count: {data.dailyHitCount}</span>
                            </li>
                            <li>
                              <span>Service: {data.serviceName}</span>
                            </li>
                          </ul>
                        </div>
                        <div className="generic_price_btn clearfix">
                          <a className="btn-primary btn text-white " href="">
                            Renew
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </section>
      <History />
    </div>
  );
}
