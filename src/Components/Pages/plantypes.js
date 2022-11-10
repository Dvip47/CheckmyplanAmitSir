import React from "react";
import Leftbar from "./Leftbar";
import Navbar from "./Navbar";
import "../../assets/css/plantype.css";
import { DATACONSTANT } from "../../constants/data.constant";
import { postRequest } from "../../Services/API_service";
import { getCookie } from "../Library/Cookies";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlanTypes() {
  useEffect(() => {
    getPlan();
  }, []);
  // let data = {
  //   statuscode: 1,
  //   msg: "Success",
  //   data: [
  //     {
  //       packageId: 1,
  //       slab: "Basic Plan 1 Year",
  //       packageCost: 5000.0,
  //       isActive: true,
  //       remark: "onles Plan Api Purchasing! after amount no Refunding",
  //       validityInDays: 365,
  //       dailyHitCount: 2000,
  //       serviceName: [
  //         "Recharge Plan",
  //         "DTH Plan",
  //         "R-Offer",
  //         "DTH Cust Info",
  //         "DTH Heavy-Refresh",
  //         "OperatorCheck",
  //       ],
  //     },
  //     {
  //       packageId: 2,
  //       slab: "Standard Plan 1 Year",
  //       packageCost: 9999.0,
  //       isActive: true,
  //       remark: "onles Plan Api Purchasing! after amount no Refunding",
  //       validityInDays: 365,
  //       dailyHitCount: 20000,
  //       serviceName: [
  //         "Recharge Plan",
  //         "DTH Plan",
  //         "R-Offer",
  //         "DTH Cust Info",
  //         "DTH Heavy-Refresh",
  //         "OperatorCheck",
  //       ],
  //     },
  //     {
  //       packageId: 4,
  //       slab: "Basic Plan 30days",
  //       packageCost: 500.0,
  //       isActive: true,
  //       remark: "onles Plan Api Purchasing! after amount no Refunding",
  //       validityInDays: 30,
  //       dailyHitCount: 2500,
  //       serviceName: [
  //         "Recharge Plan",
  //         "DTH Plan",
  //         "R-Offer",
  //         "DTH Cust Info",
  //         "DTH Heavy-Refresh",
  //         "OperatorCheck",
  //       ],
  //     },
  //     {
  //       packageId: 5,
  //       slab: "Standard Plan 30days",
  //       packageCost: 999.0,
  //       isActive: true,
  //       remark: "Plan Api Purchasing! after amount no Refunding",
  //       validityInDays: 30,
  //       dailyHitCount: 10000,
  //       serviceName: [
  //         "Recharge Plan",
  //         "DTH Plan",
  //         "R-Offer",
  //         "DTH Cust Info",
  //         "DTH Heavy-Refresh",
  //         "OperatorCheck",
  //       ],
  //     },
  //     {
  //       packageId: 6,
  //       slab: "Simple Plan 30days",
  //       packageCost: 299.0,
  //       isActive: true,
  //       remark: "Plan Api Purchasing! after amount no Refunding",
  //       validityInDays: 30,
  //       dailyHitCount: 1000,
  //       serviceName: ["Recharge Plan", "DTH Plan", "R-Offer", "DTH Cust Info"],
  //     },
  //   ],
  // };
  const [data, setData] = useState([]);

  async function getPlan() {
    try {
      let __x = JSON.parse(x);
      var postResponse = await postRequest(DATACONSTANT.GET_PLAN_URL, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
      });
      // console.log("plans", postResponse);
      setData(postResponse?.data);
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
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

  async function buyPlan(pId) {
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
  return (
    <div>
      <ToastContainer />
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            <Leftbar />
            <div className="clearfix"></div>
          </div>
          <Navbar />
        </div>{" "}
      </header>{" "}
      <section id="generic_price_table">
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
          <div className="row">
            {data?.map((data, index) => {
              return (
                <div className="col-md-3" key={index}>
                  <div className="generic_content clearfix">
                    <div className="generic_head_price clearfix">
                      <div className="box">
                        <div className="ribbon ribbon-top-right">
                          <span>{data.isActive ? "Active" : ""}</span>
                        </div>
                      </div>

                      <div className="generic_price_tag clearfix">
                        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png"> */}
                      </div>
                    </div>

                    <div className="generic_feature_list">
                      <h4>Rs: {data.packageCost}</h4>
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
                      <a
                        className="btn mr-2"
                        onClick={() => buyPlan(data.packageId)}
                      >
                        Buy Plan
                      </a>
                      <a className="btn-primary btn text-white " href="">
                        Renew
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
