import React from "react";
import { useEffect, useState } from "react";
import { getCookie } from "../../Library/Cookies";
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
      <div id="__p" class="main-temp-body " style={{ marginTop: "8%" }}>
        <div class="container-fluid">
          <div class="row">
            <input type="hidden" id="hdnIP" />
            <input type="hidden" id="hdnIPType" />
            <div class="col-md-12">
              <div class="card mt-5">
                <div
                  class="card-header cus-bg text-white"
                  style={{
                    backgroundColor: "#313197",
                  }}
                >
                  <i class="fas fa-link"></i> All Circle
                </div>
                <div class="card-body p-1">
                  <div class="table-responsive calcHeight">
                    <table
                      class="table table-bordered table-striped table-responsive-sm fixedHeader"
                      id="tblIPAddress"
                    >
                      <thead class="bg-tableth">
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
