import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import QRCode from "qrcode.react";
// import QRCode from "react-qr-code";
import { useStorageState } from "../custom-hook/useLocalStorage";
import { useEffect, useState } from "react";
import UserServices from "../services/user.service";

const EventCheckIn = () => {
  const columns = [
    {
      dataField: "id",
      text: "Position",
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },
    {
      dataField: "level",
      text: "Level",
    },
    {
      dataField: "time",
      text: "Time",
      sort: true,
    },
    {
      dataField: "PrizeExchange",
      text: "Game",
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    paginationSize: 5,
    disablePageTitle: true,
    hideSizePerPage: true,
  });

  const [userId, setUserId] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await UserServices.getProfile();
      const { payload } = data;
      setUserId(payload["_id"]);
    })();
  }, []);

  return (
    <>
      <Breadcrumb
        breadcrumbTitle="Check-in"
        breadcrumbNav={[
          {
            navText: "OIF 2024",
            path: "/oif",
          },
        ]}
      />

      <Divider />
      <div className="activity-wrapper" style={{}}>
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4 className="cd-title">GDSC's Games Check-in QR</h4>
            <h6 className="cd-subtitle">
              Use the QR to participate in our games and win prizes
            </h6>
          </div>
        </div>
        <div
          className="container"
          style={{
            padding: "5%",
            backgroundColor: "white",
            width: "fit-content",
          }}
        >
          <QRCode
            renderAs="svg"
            bgColor="#FFFFFF"
            fgColor="#000000"
            id="qrcode"
            value={userId}
            size="100%"
            style={{
              display: "block",
              margin: "0 auto",
            }}
          />
          {/* <QRCode value={userId} /> */}
        </div>
      </div>

      <Divider />
    </>
  );
};

export default EventCheckIn;
