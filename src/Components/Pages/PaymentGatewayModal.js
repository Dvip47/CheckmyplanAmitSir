import React, { useEffect, useState } from "react";
import "../../assets/css/addMoney.css";
import { getCookie } from "../Library/Cookies";
import { DATACONSTANT } from "../../constants/data.constant";
import { postRequest } from "../../Services/API_service";
import { toast } from "react-toastify";

function PaymentGatewayModal({ setPaymentGatewayState, input }) {
  useEffect(() => {
    getPaymentGateway();
  }, []);
  const [chooseMethod, setChooseMethod] = useState(0);
  const [method, setMethod] = useState([]);

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
        toast.error("Error Message here");
      } else if (postResponse1.data.length == 1) {
        let x = getCookie(DATACONSTANT.SETCOOKIE);
        let __x = JSON.parse(x);
        var postResponse2 = await postRequest(DATACONSTANT.REDIRECTTOPAYMENT, {
          version: DATACONSTANT.Version,
          APPID: DATACONSTANT.APPID,
          UserID: __x?.userID,
          SessionID: __x?.sessionID,
          Session: __x?.session,
          Amount: input.amount,
          OID: input.oid,
          WID: 1,
          PGID: postResponse1?.data[0]?.id,
        });
        if (
          postResponse2.data.url != null &&
          postResponse2.data.keyVals != null
        ) {
          window.open(
            postResponse2.data.url,
            "_blank",
            "height: 90px",
            "width: 10px",
            "noopener,noreferrer"
          );
        } else {
          toast.error("Service data not found [pg]");
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

  async function redirectToPayment() {
    try {
      let x = getCookie(DATACONSTANT.SETCOOKIE);
      let __x = JSON.parse(x);
      var postResponse2 = await postRequest(DATACONSTANT.REDIRECTTOPAYMENT, {
        version: DATACONSTANT.Version,
        APPID: DATACONSTANT.APPID,
        UserID: __x?.userID,
        SessionID: __x?.sessionID,
        Session: __x?.session,
        Amount: input.amount,
        OID: input.oid,
        WID: 1,
        PGID: method[chooseMethod].id,
        UPIGID: method[chooseMethod].pgType,
      });
      console.log("redirect after gateway", postResponse2);
      if (
        postResponse2.data.url != null &&
        postResponse2.data.keyVals != null
      ) {
        window.open(
          postResponse2.data.url,
          "_blank",
          "height: 90px",
          "width: 10px",
          "noopener,noreferrer"
        );
      } else {
        toast.error("Service data not found [pg]");
      }
    } catch (error) {
      return {
        statuscode: -1,
        msg: error.code,
      };
    }
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
              <div class="card p-3">
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
                          onClick={redirectToPayment}
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
