import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import RankingData from "../data/ranking/ranking-data.json";
import { useLayoutEffect, useState } from "react";
import UserServices from "../services/user.service";
import _ from "lodash";

import NotificationData from "../data/dashboard/notification-data.json";
import { Link } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const TransactionItem = ({ message, amount, time }) => {
  return (
    <li>
      <a href="#">
        <div className="logo me-3 mt-1 mb-1">
          <img
            style={{ width: "50px" }}
            src={`${process.env.PUBLIC_URL}/${"img/core-img/logo.png"}`}
            alt=""
          />
        </div>

        <div className="text">{message}</div>

        <span
          className="ms-auto"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <span
            className={`h5 m-0 ${
              amount > 0
                ? "text-success"
                : amount !== 0
                ? "text-danger"
                : "text-secondary"
            }`}
          >
            {amount > 0 ? `+ ${amount}` : `${amount}`}
          </span>
          <div className="row gx-2 align-items-center mt-3">
            <div
              className="col-8"
              style={{
                width: "100%",
                fontWeight: 100,
                color: "rgb(132, 128, 174)",
              }}
            >
              <span className="d-block fz-12">{timeSince(time)}</span>
            </div>
          </div>
        </span>
      </a>
    </li>
  );
};

const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [key, setKey] = useState("today");

  const { user } = useSelector((state) => state.auth);

  useLayoutEffect(() => {
    UserServices.getTransaction().then((res) => {
      let data = res?.data?.payload || [];
      setTransaction(data);
    });
  }, []);

  const transactionToday = transaction.filter((e) => {
    let seconds = Math.floor((new Date() - e.createdAt) / 1000);
    let dayDifference = seconds / 84000;
    if (dayDifference > 1) return false;
    return true;
  });

  const transactionWeek = transaction.filter((e) => {
    let seconds = Math.floor((new Date() - e.createdAt) / 1000);
    let dayDifference = seconds / 84000;
    if (dayDifference > 7) return false;
    return true;
  });

  return (
    <>
      <Breadcrumb
        breadcrumbTitle="transaction"
        breadcrumbNav={[
          {
            navText: "Home",
            path: "/",
          },
        ]}
      />

      <Divider />

      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-lg-10">
            <Tabs
              id="dashboard-notification"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="border-0 mb-3 dashboard-tabs"
            >
              <Tab eventKey="today" title="Today">
                <div className="notification-content-wrap">
                  <ul className="notification-list ps-0 mb-0">
                    {transactionToday.map((elem, index) => (
                      <TransactionItem
                        message={elem.message}
                        amount={
                          elem?.fromUser?._id === user?._id
                            ? -elem.amount
                            : elem.amount
                        }
                        time={elem.createdAt}
                      />
                    ))}
                  </ul>
                </div>
              </Tab>

              <Tab eventKey="week" title="7 Days">
                <div className="notification-content-wrap">
                  <ul className="notification-list ps-0 mb-0">
                    {transactionWeek.map((elem, index) => (
                      <TransactionItem
                        message={elem.message}
                        amount={
                          elem?.fromUser?._id === user?._id
                            ? -elem.amount
                            : elem.amount
                        }
                        time={elem.createdAt}
                      />
                    ))}
                  </ul>
                </div>
              </Tab>

              <Tab eventKey="all" title="All">
                <div className="notification-content-wrap">
                  <ul className="notification-list ps-0 mb-0">
                    {transaction.map((elem, index) => (
                      <TransactionItem
                        message={elem.message}
                        amount={
                          elem?.fromUser?._id === user?._id
                            ? -elem.amount
                            : elem.amount
                        }
                        time={elem.createdAt}
                      />
                    ))}
                  </ul>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <Divider />
    </>
  );
};

export default Transaction;
