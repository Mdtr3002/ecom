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
import { CHECK_IN, CU_QUAY, O_AN_QUAN, THAY_DA } from "../config/gift";

const AdminCheckIn = () => {
  const [activity, setActivity] = useState(CHECK_IN);
  const [isWin, setIsWin] = useState(false);

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    paginationSize: 5,
    disablePageTitle: true,
    hideSizePerPage: true,
  });

  const [userId, setUserId] = useState(null);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const activityRef = useRef();

  // useEffect(() => {
  //   $(activityRef.current).niceSelect();
  // }, []);

  const html5QrCodeScannerFile =
    process.env.PUBLIC_URL + "/html5-qrcode.min.js"; // <-- this file is in /public.

  const { Html5QrcodeScanner } = useHtml5QrCodeScanner(html5QrCodeScannerFile);

  const handleData = (res) => {
    // console.log('data ->', res);
    if (!userId) {
      setUserId(res);
    }
  };
  console.log(
    "aa",
    activityRef.current?.value,
    typeof activityRef.current?.value,
    userId
  );

  useEffect(() => {
    if (userId) {
      AdminService.verifyGame(userId, activityRef.current.value, isWin)
        .then((res) => {
          // console.log(`Verify Success ${res}`)
          setSuccess(`Verify Success`);
        })
        .catch((err) => {
          if (err?.response?.data?.message === NOT_REACH_LVL_20) {
            setError(NOT_REACH_LVL_20);
          } else if (err?.response?.data?.message === NOT_REACH_LVL_20) {
            setError(NOT_REACH_LVL_20);
          } else if (err?.response?.data?.message === ALREADY_VERIFY) {
            setError(ALREADY_VERIFY);
          } else if (err?.response?.data?.message) {
            setError(err?.response?.data?.message);
          } else {
            setError("Server error");
          }
        });
    }
  }, [userId]);

  const handleError = (err) => {
    console.log("err ->", err);
  };

  useEffect(() => {
    if (Html5QrcodeScanner) {
      // Creates anew instance of `HtmlQrcodeScanner` and renders the block.
      let html5QrcodeScanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 2, qrbox: { width: 250, height: 250 } },
        false
      );
      html5QrcodeScanner.render(handleData, handleError);
    }
  }, [Html5QrcodeScanner]);

  return (
    <>
      <Breadcrumb
        breadcrumbTitle={`Activity`}
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
                    setSuccess("");
                  }}
                >
                  Scan Again
                </button>
              )}
            </div>
            <div className="d-flex flex-column col-xl">
              <h4 style={{ marginTop: "40px" }}>Choose activity </h4>
              <div className="col-12 col-md-6">
                <select
                  ref={activityRef}
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="filter-select bg-gray w-100 mb-4"
                  style={{ padding: "0 8px" }}
                >
                  <option value={CHECK_IN}>Check-in</option>
                  <option value={O_AN_QUAN}>Ô Ăn Quan</option>
                  <option value={THAY_DA}>Thảy Đá</option>
                  <option value={CU_QUAY}>Cù Quay</option>
                </select>
              </div>
              {activity === O_AN_QUAN && (
                <div style={{ display: "flex" }}>
                  <input
                    type="checkbox"
                    id="isWin"
                    name="isWin"
                    value="isWin"
                  />
                  <label
                    for="isWin"
                    style={{ color: "white", marginLeft: "4px" }}
                  >
                    Win the game?
                  </label>
                </div>
              )}
              <h4>Result </h4>
              <h3 className="text-success">{success}</h3>
              <h3 className="text-danger">{error}</h3>
            </div>
            <br></br>
          </div>
        </div>
      </div>

      <Divider />
    </>
  );
};

export default AdminCheckIn;
