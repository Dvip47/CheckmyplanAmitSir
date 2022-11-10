import React, { useState } from "react";
import Leftbar from "./Leftbar";
import Rightbar from "./Rightbar";
import Navbar from "./Navbar";
import "./State_Table.css";
import { Button } from "react-bootstrap";
import Product_Modal from "./Product_Modal";
import { postRequest } from "../../Services/API_service";

function Product() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const [show, setShow] = useState(false);

  async function getData() {
    let _data = await postRequest("/api/Products");
    if (_data.statusCode === 1) {
      // console.log("result", _data.result);
      setProduct(_data.result);
    }
    // console.log("data", product);
  }

  const tableHead = [
    { title: "id", width: "5%" },
    { title: "Category_Name", width: "25%" },
    { title: "Product_Name", width: "35%" },
    { title: "MRP", width: "10" },
    { title: "Selling_Price", width: "15" },
    { title: "image", width: "5" },
    { title: "action", width: "5" },
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
              <Button className="btn btn-danger" onClick={() => setShow(true)}>
                New
              </Button>
            </div>
            <div className="d-flex pt-2 pb-2 right">
              <Button className="btn btn-danger" onClick={() => getData()}>
                Load Data
              </Button>
            </div>
            {show && (
              <Product_Modal
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
                  {product?.map((data, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{data.productID}</th>
                        <td>{data.category.categoryName}</td>
                        <td className="">{data.productName}</td>
                        <td className="">{data.mrp}</td>
                        <td className="">{data.sellingPrice}</td>
                        <td className=""></td>
                        <td className=""></td>
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

export default Product;
