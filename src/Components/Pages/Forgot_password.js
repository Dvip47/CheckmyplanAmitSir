import React from "react";

const Forgot_password = () => {
  const myStyle = {
    cursor: "pointer",
    position: "absolute",
    top: "50%",
    right: "0%",
    padding: "12px 16px",
    transform: "translate(0%, -50%)",

    // .close:hover {background: #bbb;}
  };

  async function cross() {
    var closebtns = document.getElementsByClassName("close");
    var i;

    for (i = 0; i < closebtns.length; i++) {
      closebtns[i].addEventListener("click", function () {
        this.parentElement.style.display = "none";
      });
    }
  }
  return (
    <div>
      {/* <div className="accountbg"></div> */}
      <div className="wrapper-page">
        <div className="card">
          <div className="card-body">
            <div className="text-center m-b-15">
              <a href="index.html" className="logo logo-admin">
                <img src="./logo2.png" style={{ width: "211px" }} alt="logo" />
              </a>
            </div>
            <div className="p-3">
              <form
                className="form-horizontal"
                action="https://mannatthemes.com/zoogler/horizontal/index.html"
              >
                <div className="alert alert-success alert-dismissible">
                  {/* <button
                    type="button"
                    className="close"
                    data-dismiss="alert"
                    aria-hidden="true"
                  >
                    ×
                  </button>{" "} */}
                  <span className="close" style={myStyle} onClick={cross}>
                    &times;
                  </span>
                  Enter your <b>Email</b> and instructions will be sent to you!
                </div>
                <div className="form-group row">
                  <div className="col-12">
                    <input
                      className="form-control"
                      type="email"
                      required=""
                      placeholder="Email/userID"
                    />
                  </div>
                </div>
                <div className="form-group text-center row m-t-20">
                  <div className="col-12">
                    <button
                      className="btn btn-danger btn-block waves-effect waves-light"
                      type="submit"
                    >
                      Send Email
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot_password;
