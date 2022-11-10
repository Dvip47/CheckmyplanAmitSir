import React, { useState } from "react";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import Navbar from "./Navbar";
import "./State_Table.css";
import { Button } from "react-bootstrap";
import { postRequest } from "../../Services/API_service";

function Categories() {
  const [info, setInfo] = useState([]);
  const [Category, setCategory] = useState([]);

  async function getData() {
    let data = await postRequest("/api/CategoryDetails");
    if (data.statusCode === 1) {
      // console.log("result", data.result);
      setCategory(data.result);
    }
    // console.log("data", Category);
  }

  const tableHeaders = [
    { title: "categoryID", width: "33%" },
    { title: "categoryName", width: "33%" },
    { title: "isActive", width: "33%" },
  ];

  return (
    <div>
      <div>
        {" "}
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
                <Button className="btn btn-danger" onClick={() => getData()}>
                  Categories
                </Button>
              </div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      {tableHeaders.map((info, index) => {
                        return (
                          <th
                            scope="col"
                            className=""
                            style={{ width: info.width }}
                          >
                            {info.title}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {Category.map((info, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{info.categoryID}</th>
                          <td>{info.categoryName}</td>
                          <td className="">{info.isActive.toString()}</td>
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
    </div>
  );
}

export default Categories;
