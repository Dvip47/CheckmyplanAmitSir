import { useState } from "react";
import { DATACONSTANT } from "../constants/data.constant";
import { postRequest } from "./API_service";
import { getCookie } from "./Cookies";
import { toast } from "react-toastify";
import swal from "sweetalert";

export const IPMasterService = () => {
    const [IPPopup, setIPPopup] = useState(false);
    let sessionData = getCookie(DATACONSTANT.SETCOOKIE);
    const [data, setData] = useState([]);

    async function getIP() {
        try {
            let __x = JSON.parse(sessionData);
            var postResponse = await postRequest(DATACONSTANT.GETIP, {
                Version: DATACONSTANT.Version,
                APPID: DATACONSTANT.APPID,
                UserID: __x?.userID,
                SessionID: __x?.sessionID,
                Session: __x?.session,
            });
            setData(postResponse?.data);
        } catch (error) {
            return {
                statusCode: -1,
                msg: error.code,
            };
        }
    }

    async function deleteIP(id) {
        swal({
            title: "Delete This Plan?",
            text: "Are you sure to delete!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isDelete) => {
            if (isDelete) {
                del();
                async function del() {
                    try {
                        let __x = JSON.parse(sessionData);

                        var postResponse = await postRequest(DATACONSTANT.DELETEIP, {
                            Version: DATACONSTANT.Version,
                            APPID: DATACONSTANT.APPID,
                            UserID: __x?.userID,
                            SessionID: __x?.sessionID,
                            Session: __x?.session,
                            ID: id ?? 0,
                            IsWLAPIAllowed: false,
                        });
                        if (postResponse.statuscode === 1) {
                            toast.success("Successfully Deleted");
                            getIP();
                        } else {
                            toast.error("API Not respond");
                        }
                    } catch (error) {
                        toast.error(error.code);
                        return {
                            statuscode: -1,
                            msg: error.code,
                        };
                    }
                }
            } else {
                swal("Fail", "IP Delete Failed!", "error");
            }
        });
    }

    let x = getCookie(DATACONSTANT.SETCOOKIE);

    const [show, setShow] = useState(false);
    const [balance, setBalance] = useState([]);
    const [input, setInput] = useState({
        amount: "",
        oid: 0,
    });

    async function getBalance() {
        try {
            let __x = JSON.parse(x);
            var postResponse = await postRequest(DATACONSTANT.BALANCE_URL, {
                version: DATACONSTANT.Version,
                APPID: DATACONSTANT.APPID,
                UserID: __x?.userID,
                SessionID: __x?.sessionID,
                Session: __x?.session,
            });
            // console.log("balance", postResponse?.bBalance);
            setBalance(postResponse?.bBalance);
        } catch (error) {
            return {
                statuscode: -1,
                msg: error.code,
            };
        }
    }


    return {
        getIP,
        deleteIP,
        getBalance,
        IPPopup,
        setIPPopup,
        data,
        setData,
        show,
        setShow,
        balance,
        setBalance,
        input,
        setInput
    }
}