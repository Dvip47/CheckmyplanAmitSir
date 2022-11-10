import React from "react";
import logo2 from "../../assets/images/logo2.png";

function Leftbar() {
  return (
    <div>
      {" "}
      <div className="logo">
        <a href="index.html" className="logo">
          {/* <i className="mdi mdi-bowling text-success mr-1"></i> */}
          {/* <span className="hide-phone">Zoogler</span> */}
          <img src={logo2} alt="Image" style={{ width: "211px" }} />
        </a>
      </div>
    </div>
  );
}

export default Leftbar;
