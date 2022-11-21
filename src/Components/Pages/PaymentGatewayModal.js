import React, { useEffect, useState } from "react";
import "../../assets/css/addMoney.css";
import { getCookie } from "../Library/Cookies";
import { DATACONSTANT } from "../../constants/data.constant";
import { postRequest } from "../../Services/API_service";
import { toast } from "react-toastify";

function PaymentGatewayModal({
  setPaymentGatewayState, //from add money modal
  input, // from plantypes.js
  getBalance, //from plantypes.js
  getPlan, //from plantypes.js
}) {
  useEffect(() => {
    getPaymentGateway();
  }, []);

  useEffect(() => {
    window.addEventListener("load", function (e) {
      alert("------");
      e.preventDefault();
      alert("hiiiiii");
    });
  }, []);
  const [chooseMethod, setChooseMethod] = useState(0);
  const [method, setMethod] = useState([]);
  const [loader, setLoader] = useState(false);

  async function getPaymentGateway() {
    try {
      let x = getCookie(DATACONSTANT.SETCOOKIE);
      let __x = JSON.parse(x);
      var postResponse1 = await postRequest(DATACONSTANT.PAYMENTGATEWAY, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
        Amount: input.amount,
        OID: input.oid,
        WID: 1,
      });

      if (postResponse1.data == null) {
        toast.error("No payment gateway found"); //agr payment gateway nhi milega to
      } else if (postResponse1.data.length == 1) {
        // setMethod(postResponse1?.data);
        setPaymentGatewayState(false);
        let x = getCookie(DATACONSTANT.SETCOOKIE);
        let __x = JSON.parse(x);
        console.log("data", DATACONSTANT);
        var postResponse2 = await postRequest(DATACONSTANT.REDIRECTTOPAYMENT, {
          Version: DATACONSTANT.Version,
          APPID: DATACONSTANT.APPID,
          UserID: __x?.userID,
          SessionID: __x?.sessionID,
          Session: __x?.session,
          Amount: input.amount,
          OID: input.oid,
          WID: 1,
          PGID: postResponse1?.data[0]?.id,
        });
        console.log("......ridirect to gatewaty", postResponse2);
        console.log(postResponse2.data.url);
        if (postResponse2.data.url != null) {
          let newWindow = window.open(
            postResponse2.data.url,
            "example",
            "width=600,height=600"
          );
          console.log("new", newWindow);
          newWindow.onbeforeunload = function () {};
        } else {
          toast.error(postResponse2.data.msg); // agr scanner open na ho to yeh error aayega
        }
      } else {
        setMethod(postResponse1?.data);
      }
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
  }

  async function redirectToPayment(i) {
    setLoader(true);
    try {
      let x = getCookie(DATACONSTANT.SETCOOKIE);
      let __x = JSON.parse(x);

      var postResponse2 = await postRequest(DATACONSTANT.REDIRECTTOPAYMENT, {
        Version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
        Amount: input.amount,
        OID: input.oid,
        WID: 1,
        PGID: method[i].pgType,
        UPIGID: method[i].id,
      });
      console.log("redirect after gateway", postResponse2);
      if (postResponse2.data.url != null) {
        setPaymentGatewayState(false);

        let newWindow = window.open(
          postResponse2.data.url,
          "example",
          "width=600,height=600"
        );
        setTimeout(() => {
          let inn = setInterval(async () => {
            if (newWindow?.window?.closed == false) {
              console.log("new", newWindow.window.closed);
            } else {
              const res = await postRequest(
                `/ApiUserAfterLogin/UPIStatusCheck?TID=${postResponse2?.data?.tid}`
              );
              if (res?.transactionStatus === "TTransaction Successfull!") {
                toast.success(res?.transactionStatus);
                getBalance();
                getPlan();
              } else {
                toast.error(res?.transactionStatus);
              }
              clearInterval(inn);
            }
          }, 1000);
        }, 1000);
      } else {
        toast.error("Service data not found [pg]");
        // should manage error if there is no gateway found abouve msg else actual msg will be print
      }
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
    setLoader(false);
  }
  return (
    <div class="modal show" style={{ display: "block" }} id="myModal">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">CHOOSE PAYMENT GATEWAY</h3>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              onClick={() => setPaymentGatewayState(false)}
            >
              ×
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div>
                {loader && (
                  <div
                    style={{
                      top: "-165px",
                      left: "-555px",
                      position: "absolute",
                      height: "100vh",
                      width: "100vw",
                      zIndex: 999,
                      backgroundColor: "rgba(0,0,0,0.3)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                    }}
                  >
                    <div class="spinner-border m-5" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                {method?.map((data, index) => {
                  return (
                    <div
                      class="credit rounded mt-2 justify-content-between align-items-center"
                      onClick={() => setChooseMethod(index)}
                    >
                      <div class="mt-3">
                        <button
                          type="button"
                          class="btn btn-primary btn- btn-block btn-lg"
                          onClick={() => redirectToPayment(index)}
                        >
                          {data.pg}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentGatewayModal;
