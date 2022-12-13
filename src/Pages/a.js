import React from "react";
import { useEffect, useState } from "react";
import { DATACONSTANT } from "../../../constants/data.constant";
import { getRequest } from "../../../Services/API_service";

function Circle() {
  const [data, setData] = useState([]);

  async function getCircle() {
    try {
      var postResponse = await getRequest(DATACONSTANT.CIRCLE);
      setData(postResponse?.data);
    } catch (error) {
      return {
        statusCode: -1,
        msg: error.code,
      };
    }
  }
  useEffect(() => {
    getCircle();
  });
  return (
    <>
      <div id="__p" className="main-temp-body " style={{ marginTop: "8%" }}>
        <div className="container-fluid">
          <div className="row">
            <input type="hidden" id="hdnIP" />
            <input type="hidden" id="hdnIPType" />
            <div className="col-md-12">
              <div className="card mt-5">
                <div
                  className="card-header cus-bg text-white"
                  style={{
                    backgroundColor: "#313197",
                  }}
                >
                  <i className="fas fa-link"></i> All Circle
                </div>
                <div className="card-body p-1">
                  <div className="table-responsive calcHeight">
                    <table
                      className="table table-bordered table-striped table-responsive-sm fixedHeader"
                      id="tblIPAddress"
                    >
                      <thead className="bg-tableth">
                        <tr>
                          <th>#</th>
                          <th>Circle</th>
                          <th>Code</th>
                        </tr>
                      </thead>
                      {data.length !== 0 ? (
                        <tbody>
                          {data?.map((item, i) => {
                            return (
                              <tr data-item-id="6">
                                <td>{i + 1}</td>
                                <td>{item.circle}</td>
                                <td>{item.code} </td>
                              </tr>
                            );
                          })}

                          {/* ); */}
                          {/* })} */}
                        </tbody>
                      ) : (
                        <h3 className="text-center">Data Not Found</h3>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Circle;
