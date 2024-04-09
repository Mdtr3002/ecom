import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import { useEffect, useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import { useHtml5QrCodeScanner } from "react-html5-qrcode-reader";

import { ALREADY_VERIFY, NOT_REACH_LVL_20 } from "../config/error";
import $ from "jquery";
import AdminService from "../services/admin.service";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { SUCCESS_NOTI, createNotification } from "../utils/notification";

const AdminCheckIn = () => {
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    paginationSize: 5,
    disablePageTitle: true,
    hideSizePerPage: true,
  });

  const [userId, setUserId] = useState(null);
  const [columns, setColumns] = useState(null);
  const [prizeinfo, setprizeinfo] = useState("");
  const [error, setError] = useState("");
  const [prizeHistory, setprizeHistory] = useState(null);

  const prizeRef = useRef();

  const html5QrCodeScannerFile =
    process.env.PUBLIC_URL + "/html5-qrcode.min.js"; // <-- this file is in /public.

  const { Html5QrcodeScanner } = useHtml5QrCodeScanner(html5QrCodeScannerFile);

  const handleData = (res) => {
    console.log("data ->", res);
    if (!userId) {
      setUserId(res);
    }
  };

  const handleError = (err) => {
    console.log("err ->", err);
  };

  // const transformOptions = (options) => {
  //   const result = options.map((option) => {
  //     let res = "";
  //     option.forEach((el, idx) => {
  //       res += el.quantity + " " + el.type + (el.quantity > 1 ? "s" : "");
  //       if (idx !== option.length - 1) res += " or ";
  //     });
  //     return res;
  //   });

  //   return result;
  // };

  useEffect(() => {
    $(prizeRef.current).niceSelect();
  });

  useEffect(() => {
    if (userId) {
      const itemId = userId;
      AdminService.validatePrize(itemId)
        .then((res) => {
          const { data } = res;
          const { payload } = data;
          if (!payload || payload.length === 0) {
            setError("You haven't played any game.");
            setprizeinfo(null);
          } else setprizeinfo(payload.item);
        })
        .catch((err) => {
          if (err?.response?.data?.message === NOT_REACH_LVL_20) {
            setError(NOT_REACH_LVL_20);
          } else if (err?.response?.data?.message === NOT_REACH_LVL_20) {
            setError(NOT_REACH_LVL_20);
          } else if (err?.response?.data?.message === ALREADY_VERIFY) {
            setError(ALREADY_VERIFY);
          } else if (err?.response?.data?.message) {
            setError("Error in receiving item");
          } else {
            setError("Server error");
          }
        });
    }
  }, [userId]);

  useEffect(() => {
    if (Html5QrcodeScanner) {
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 2, qrbox: { width: 250, height: 250 } },
        false
      );
      html5QrcodeScanner.render(handleData, handleError);
    }
  }, [Html5QrcodeScanner]);

  useLayoutEffect(() => {
    AdminService.getPrizeHistory()
      .then((res) => {
        const { data } = res;
        const { payload } = data;
        console.log("payload", payload);
        const newPrizeHistory = payload.map((el, idx) => {
          // console.log('debug', el.gifts.reduce((prev, curr) => prev + " " + curr.quantity + " " + curr.type + ", ", ""));
          return {
            id: idx,
            name: el.name,
            studentId: el.studentId,
            gifts: el.gifts.reduce(
              (prev, curr) =>
                prev + " " + curr.quantity + " " + curr.type + ", ",
              ""
            ),
            claimAt:
              new Date(el.claimAt).toLocaleTimeString("en-US") +
              " " +
              new Date(el.claimAt).toLocaleDateString("en-US"),
          };
        });
        console.log("newPrizeHistory", newPrizeHistory);
        setprizeHistory(newPrizeHistory);

        const col = Object.keys(newPrizeHistory[0]).map((el) => {
          return {
            dataField: el,
            text: el.charAt(0).toUpperCase() + el.slice(1),
          };
        });
        setColumns(col);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  return (
    <>
      <Breadcrumb
        breadcrumbTitle={`Prize Exchange`}
        breadcrumbNav={[
          {
            navText: "OIF 2024",
            path: "/oif",
          },
        ]}
      />

      <div className="activity-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-xl">
              <div style={{ marginTop: "40px" }}>
                <h4 style={{ marginTop: "40px" }}>QR Scan</h4>
              </div>
              <div
                id="qr-reader"
                style={{ width: "335px", aspect: "square" }}
              ></div>
              {userId && (
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => {
                    setUserId(null);
                    setError("");
                    setprizeinfo(null);
                  }}
                >
                  Scan Again
                </button>
              )}

              <Divider />
            </div>

            <div className="col-xl">
              <h4 style={{ marginTop: "40px" }}>Result</h4>
              <h3 className="text-danger">{error}</h3>
              {prizeinfo && (
                <>
                  <h3 className="text-success">{prizeinfo.name}</h3>
                  <div className="col-12 col-md-6">
                    {/* <select
                      ref={prizeRef}
                      className="filter-select bg-gray w-100 mb-4"
                    >
                      {prizeinfo.map((el, idx) => (
                        <option key={idx} value={idx}>
                          {el}
                        </option>
                      ))}
                    </select> */}
                    {prizeinfo && !prizeinfo.isRequestToReceiveItem && (
                      <p style={{ color: "#db4437" }}>
                        The user hasn't requested to receive the item
                      </p>
                    )}
                    {prizeinfo && prizeinfo.isReceived && (
                      <p style={{ color: "#0f9d58" }}>
                        Already received the item
                      </p>
                    )}
                    {userId && prizeinfo && !prizeinfo.isReceived && (
                      <button
                        className="btn btn-primary mt-4"
                        style={{ display: "block" }}
                        disabled={
                          prizeinfo && !prizeinfo.isRequestToReceiveItem
                        }
                        onClick={async () => {
                          // const option = prizeRef.current.value;
                          try {
                            const itemId = userId;
                            console.log("itemId", itemId);
                            const { data } = await AdminService.confirmPrize(
                              itemId
                            );
                            const { payload } = data;
                            // setprizeinfo(null);
                            setprizeHistory({ prizeHistory, ...payload });
                            setUserId(null);
                            setError("");
                            createNotification(
                              SUCCESS_NOTI,
                              "Item received confirm"
                            );
                            // setprizeinfo(null);
                          } catch (err) {
                            if (err?.response?.data?.message)
                              setError("Error in receiving item");
                            else setError("Server error");
                          }
                        }}
                      >
                        Confirm Prize
                      </button>
                    )}
                  </div>

                  <Divider />
                </>
              )}
            </div>
          </div>

          {/* <h4 style={{ marginTop: "40px" }}>Prize History </h4>
          <div className="ranking-table">
            {prizeHistory && columns && (
              <BootstrapTable
                keyField="id"
                data={prizeHistory}
                columns={columns}
                pagination={pagination}
              />
            )}
          </div> */}
        </div>
      </div>

      <Divider />
    </>
  );
};

export default AdminCheckIn;
