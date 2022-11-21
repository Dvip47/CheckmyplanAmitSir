import React, { useState } from "react";

function changePasseword(setModal) {
  return (
    <div>
      {/* {modal && <div onClick={() => setModal(false)}></div>} */}
      <div class="modal show" style={{ display: "block" }} id="myModal">
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Change Password</h3>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setModal(false)}
              >
                ×
              </button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="">
                  <div class="pricing rounded d-flex justify-content-between">
                    <div class="images d-flex flex-row align-items-center p-3">
                      {/* <img src={wallet} class="rounded" width="60" /> */}

                      <div class="d-flex flex-column ml-4">
                        <span class="business" style={{ fontWeight: "bold" }}>
                          Current Balance
                        </span>
                        <span
                          class="plan"
                          style={{
                            color: "grey",
                            fontWeight: "bold",
                            fontFamily: "serif",
                          }}
                        >
                          {/* <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Indian_Rupee_symbol.svg/1200px-Indian_Rupee_symbol.svg.png"
                            style={{
                              width: "8px",
                              position: "relative",
                              left: "-2px",
                              bottom: "2px",
                            }}
                          />
                          {balance} */}
                        </span>
                      </div>
                    </div>
                  </div>
                  <h4 class="heading mt-3">Enter Amount</h4>
                  <input
                    type="text"
                    id=""
                    name="amount"
                    placeholder="0"
                    className="form-control"
                    // onChange={change}
                    // value={input.amount}
                  />
                  <h6 class="detail mt-3">Payment details</h6>
                  <div class="credit rounded mt-2 justify-content-between align-items-center">
                    {/* {loader && "Loading..."}
                    {method?.map((data, index) => { */}
                    {/* return ( */}
                    <div
                    // class="d-flex flex-row align-items-center"
                    // onClick={() =>
                    //   setInput((prev) => {
                    //     return { ...prev, oid: data.oid };
                    //   })
                    // }
                    >
                      <img
                        src="https://i.imgur.com/qHX7vY1.png"
                        class="rounded"
                        width="70"
                        className="mr-2 pt-2"
                      />
                      <div class="form-check my-badge">
                        <input
                          class="form-check-input cus-input"
                          type="radio"
                          name="flexRadioDefault"
                          // id={data.oid}
                          style={{ width: "13px" }}
                        />
                        <label class="form-check-label">
                          {/* <label class="form-check-label" for={data.oid}> */}
                          {/* {data.name} */}
                        </label>

                        <span class="badge badge-danger">Changes 3%</span>
                      </div>
                    </div>
                    {/* ); */}
                    {/* })} */}

                    <div class="mt-3 text-right">
                      <button
                        className="btn btn-danger"
                        type="button"
                        class="btn btn-primary btn- btn-block btn-lg"
                        onClick={() => {
                          // setPaymentGatewayState(true);
                          setModal(false);
                        }}
                        // disabled={input.amount == 0}
                      >
                        Change password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default changePasseword;
