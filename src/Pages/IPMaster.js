import React, { useEffect } from "react";
import Navbar from "./Navbar";
import "react-toastify/dist/ReactToastify.css";
import { IPMasterPOPUP } from "./IPMasterPOPUP";
import "../assets/css/IP.css";
import { IPMasterService } from '../Services/IPMasterService';

export const IPMaster = () => {
    const { getIP, deleteIP, getBalance, IPPopup, setIPPopup, data, show, setShow, balance, setBalance, input, setInput } = IPMasterService();
    useEffect(() => {
        getIP();
    }, []);

    return (
        <div>
            <header id="topnav">
                <div className="topbar-main">
                    <div className="container-fluid">
                        <div className="clearfix"></div>
                    </div>
                    <Navbar
                        show={show}
                        setShow={setShow}
                        input={input}
                        setInput={setInput}
                        getBalance={getBalance}
                        balance={balance}
                        setBalance={setBalance}
                    />
                </div>{" "}
            </header>

            <div id="__p" className="main-temp-body " style={{ marginTop: "100px" }}>
                <div className="container-fluid">
                    <div className="row">
                        <input type="hidden" id="hdnIP" />
                        <input type="hidden" id="hdnIPType" />
                        <div className="col-md-12">
                            <div className="card cus-card mt-5">
                                <div
                                    className="card-header cus-bg text-white"
                                    style={{
                                        backgroundColor: "rgb(96 93 175)",
                                    }}
                                >
                                    <i className="fas fa-link"></i> IPAddress Master
                                    <div className="float-right">
                                        <div
                                            className="input-group"
                                            style={{
                                                borderBottom: "1px solid",
                                                background: "#605dafb",
                                            }}
                                        >
                                            <input
                                                id="txtSearch"
                                                className="form-control text-left"
                                                placeholder="Search IPAddress"
                                                style={{
                                                    marginRight: "10px",
                                                    border: "none",
                                                    color: "#fff",
                                                    background: "#605daf",
                                                }}
                                            />
                                            <i
                                                className="fa fa-search"
                                                aria-hidden="true"
                                                style={{
                                                    margin: "auto",
                                                    marginRight: "5px",
                                                    color: "#fff",
                                                    background: "none",
                                                    border: "none",
                                                }}
                                            ></i>

                                            <div className="input-group-append">
                                                <button
                                                    id="btnNew"
                                                    className="btn btn-default btn-sm"
                                                    style={{ borderRadius: "2px" }}
                                                    onClick={() => {
                                                        setIPPopup(true);
                                                    }}
                                                >
                                                    New
                                                </button>
                                                {IPPopup && (
                                                    <IPMasterPOPUP
                                                        IPPopup={IPPopup}
                                                        setIPPopup={setIPPopup}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-1">
                                    <div className="table-responsive calcHeight">
                                        <table
                                            className="table table-bordered table-striped table-responsive-sm fixedHeader"
                                            id="tblIPAddress"
                                        >
                                            <thead className="bg-tableth" style={{ width: "10px" }}>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Mobile Number</th>
                                                    <th>IPAddress</th>
                                                    <th>LastModified</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            {data.length !== 0 ? (
                                                <tbody>
                                                    {data?.map((item, i) => {
                                                        return (
                                                            <tr data-item-id="6">
                                                                <td>{i + 1}</td>
                                                                <td>{item.mobileNo} </td>
                                                                <td>{item.ip}</td>
                                                                <td>{item.lastModified}</td>
                                                                <td>
                                                                    {item.isActive ? (
                                                                        <label className="switch">
                                                                            <input type="checkbox" checked />
                                                                            <span className="slider round"></span>
                                                                        </label>
                                                                    ) : (
                                                                        <label className="switch">
                                                                            <input type="checkbox" />
                                                                            <span className="slider round"></span>
                                                                        </label>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <i
                                                                        className="fa fa-trash"
                                                                        aria-hidden="true"
                                                                        style={{ color: "red" }}
                                                                        onClick={() => {
                                                                            deleteIP(item.id);
                                                                            getIP();
                                                                        }}
                                                                    ></i>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            ) : (
                                                <tbody>
                                                    <tr>
                                                        <td colspan="8">
                                                            <h3 className="text-center">Data Not Found</h3>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            )}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
