import React, { useEffect, useState } from "react";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import Navbar from "./Navbar";
import "./State_Table.css";
import { Button } from "react-bootstrap";
import Modal from "../Modal";

export const State_Table = () => {
  // useEffect
  useEffect(() => {
    callAPi();
  }, []);

  //   states
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  // functions
  const callAPi = async () => {
    const url = "https://reqres.in/api/users?page=2";
    const res = await fetch(url);
    const response = await res.json();
    setData([...response.data]);
  };
  // console.log(data);

  const tableHead = [
    { title: "id", width: "5%" },
    { title: "email", width: "55%" },
    { title: "first_name", width: "20%" },
    { title: "last_name", width: "20%" },
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
                <Button
                  className="btn btn-danger"
                  onClick={() => setShow(true)}
                >
                  New
                </Button>
              </div>
              {show && (
                <Modal
                  setData={setData}
                  show={show}
                  onClose={() => setShow(false)}
                  closeModal={setShow}
                />
              )}
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
                    {data.map((data, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{data.id}</th>
                          <td>{data.email}</td>
                          <td className="">{data.first_name}</td>
                          <td className="">{data.last_name}</td>
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
};

export default State_Table;
