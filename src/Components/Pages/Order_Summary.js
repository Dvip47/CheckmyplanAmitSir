import React, { useState } from "react";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import Navbar from "./Navbar";
import "./State_Table.css";
import { button } from "react-bootstrap";
import { postRequest } from "../../Services/API_service";

function Order_Summary() {
  const [order, setOrder] = useState([]);
  const [data, setData] = useState([]);

  async function getData() {
    let _data = await postRequest("/api/OrderSummary");
    if (_data.statusCode === 1) {
      // console.log("result", _data.result);
      setOrder(_data.result);
    }
    // console.log("_data : ", order);
  }

  const tableHead = [
    { title: "orderID", width: "5%" },
    { title: "name", width: "15%" },
    { title: "userID", width: "5%" },
    { title: "orderDate", width: "10%" },
    { title: "email", width: "35%" },
    { title: "phoneNumber", width: "15%" },
    { title: "statusValue", width: "10%" },
    { title: "pincode", width: "5%" },
  ];

  return (
    <div>
      <header id="topnav">
        <div className="topbar-main">
          <div className="container-fluid">
            {/* <!-- Logo container--> */}
            <Leftbar />
            {/* <!-- End Logo container--> */}
            <Rightbar />
            {/* <!-- end menu-extras --> */}
            <div className="clearfix"></div>
          </div>
          {/* <!-- end container --> */}
        </div>
        {/* <!-- end topbar-main --> */}
        {/* <!-- MENU Start --> */}
        <Navbar />
        {/* <!-- end navbar-custom --> */}
      </header>
      <div className="container-fluid py-5 cus-top">
        <div className="row">
          <div className="col-lg-12 bg-white rounded shadow">
            <div className="d-flex pt-2 pb-2 right">
              <button className="btn btn-danger" onClick={() => getData()}>
                Order History
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {tableHead.map((data, index) => {
                      return (
                        <th
                          scope="col"
                          className=""
                          style={{ width: data.width }}
                        >
                          {data.title}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {order.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{data.orderID}</th>
                        <td>{data.name}</td>
                        <td>{data.userID}</td>
                        <td>{data.orderDate}</td>
                        <td>{data.email}</td>
                        <td>{data.phoneNumber}</td>
                        <td>{data.statusValue}</td>
                        <td>{data.pincode}</td>
                        {/* <td className="">{data.isActive.toString()}</td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order_Summary;
