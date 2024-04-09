import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Dropdown from "react-bootstrap/Dropdown";
import useStickyHeader from "../../header/StickyHeader";
import NotificationData from "../../../data/dashboard/notification-data.json";
import { logout } from "../../../actions/auth";

const DashboardHeader = () => {
  const BrandLogo = "img/core-img/logo-white.png";

  let [check] = useState(true);
  const sticky = useStickyHeader(10);
  const stickyClass = `${sticky && check ? "sticky-on" : ""}`;

  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = () => {
    setActive(!isActive);
  };

  const userDropdownData = [
    {
      path: "/dashboard",
      icon: "bi-person-circle",
      text: "Dashboard",
    },
    {
      path: "/my-bids",
      icon: "bi-hammer",
      text: "My bids",
    },
    {
      path: "/collection",
      icon: "bi-collection",
      text: "Bidding",
    },
    {
      path: "/my-profile",
      icon: "bi-gear",
      text: "My Profile",
    },
  ];

  const userInfo = [
    {
      thumbnail: "img/bg-img/u2.jpg",
      username: "Designing W.",
      userType: "Premium User",
    },
  ];

  const balanceCard = [
    {
      title: "Current balance",
      icon: "img/core-img/logo.png",
      balance: 4.0678,
      balanceType: "G",
    },
  ];

  const AdminNav = [
    {
      id: 1,
      path: "/dashboard",
      icon: "bi-speedometer",
      text: "Dashboard",
    },
    {
      id: 2,
      path: "/my-bids",
      icon: "bi-hammer",
      text: "My Bids",
    },
    {
      id: 3,
      path: "/collection",
      icon: "bi-columns-gap",
      text: "Collections",
    },
    {
      id: 4,
      path: "/my-wallet",
      icon: "bi-wallet2",
      text: "My Wallet",
    },
    {
      id: 4,
      path: "/notifications",
      icon: "bi-bell",
      text: "Notifications",
    },
    {
      id: 4,
      path: "/my-profile",
      icon: "bi-gear",
      text: "My Profile",
    },
  ];

  const userDropdownList = userDropdownData.map((elem, index) => (
    <li key={index}>
      <Link className="dropdown-item" to={elem.path}>
        <i className={`me-2 bi ${elem.icon}`} />
        {elem.text}
      </Link>
    </li>
  ));

  const notificationCards = NotificationData.slice(0, 4).map((elem, index) => (
    <li key={index}>
      <Link className="dropdown-item" to={`/notification-details/${elem.id}`}>
        <i
          className={`me-2 bg-${elem.icon[0].color} bi ${elem.icon[0].icon}`}
        />
        {elem.notification}
      </Link>
    </li>
  ));

  return (
    <>
      <header
        className={`header-area ${stickyClass} dashboard-header px-0 px-sm-0`}
      >
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="d-flex align-items-center">
              {/* Brand Logo */}
              <div className="admin-logo me-2 me-sm-3">
                <Link className="d-block" to="/">
                  <img
                    style={{ maxWidth: "60px" }}
                    src={`${process.env.PUBLIC_URL}/${BrandLogo}`}
                    alt=""
                  />
                </Link>
              </div>

              {/* Search Form */}
              {/* <div className="search-form">
                                <Form className="position-relative d-flex align-items-center" onSubmit={e => { e.preventDefault(); }} >
                                    <input className="form-control" type="text" placeholder="Search" />
                                    <button className="position-absolute" type="submit">
                                        <i className="bi bi-search" />
                                    </button>
                                </Form>
                            </div> */}
            </div>

            {/* Header Meta */}
            <div className="header-meta d-flex align-items-center">
              {/* Notification */}
              {/* <Dropdown className="user-dropdown mx-1 mx-sm-3">
                                <Dropdown.Toggle className="user-btn" id="userDropdown">
                                    <img src={`${process.env.PUBLIC_URL}/img/core-img/notification.png`} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="mt-3 noti-dd-menu" align="end">
                                    {notificationCards}
                                    <li>
                                        <Link 
                                            className="dropdown-item justify-content-center" 
                                            to="/notifications"
                                        >
                                            View all notifications
                                        </Link>
                                    </li>
                                </Dropdown.Menu>
                            </Dropdown> */}

              {/* User Dropdown */}
              <Dropdown className="user-dropdown">
                <Dropdown.Toggle className="user-btn" id="userDropdown">
                  <img
                    src={`${process.env.PUBLIC_URL}/img/core-img/user.png`}
                    alt=""
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="mt-3" align="end">
                  {userDropdownList}
                  <li key={userDropdownList.length}>
                    <button
                      style={{ color: "#dc3545" }}
                      className="dropdown-item btn btn-danger w-100"
                      type="submit"
                      onClick={async () => {
                        await dispatch(logout());
                        navigate("/");
                      }}
                    >
                      Log Out
                    </button>
                  </li>
                </Dropdown.Menu>
              </Dropdown>

              {/* Menu Toggler */}
              <div className="menu-toggler ms-1 ms-sm-3" onClick={handleToggle}>
                <i className="bi bi-list" />
              </div>

              {/* Button */}
              {/* <Link 
                                className="btn btn-sm btn-danger rounded-pill ms-2 ms-sm-3 d-none d-sm-block" 
                                to="/home1"
                            >
                                <i className="bi bi-eye me-1" />
                                Frontend
                            </Link> */}
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`admin-sidebar-wrap ${
          isActive ? "sidebar-active" : "sidebar-disabled"
        }`}
      >
        <div className="overflowY-scroll">
          {/* User Profile */}
          <div className="user-profile">
            {/* User Name */}
            <div className="user-name mb-5">
              <div className="d-flex align-items-center">
                <img
                  src={`${process.env.PUBLIC_URL}/${userInfo[0].thumbnail}`}
                  alt=""
                />
                <div className="ms-3">
                  <h6 className="lh-1 text-dark fz-18">
                    {userInfo[0].username}
                  </h6>
                  <span className="badge bg-primary fz-12">
                    {userInfo[0].userType}
                  </span>
                </div>
              </div>
            </div>

            {/* Balance */}
            <div className="card shadow mb-5">
              <div className="card-body text-center p-4">
                <h6 className="mb-1">{balanceCard[0].title}</h6>
                <h5 className="mb-0 text-dark d-flex align-items-center justify-content-center">
                  <img
                    className="me-1"
                    src={`${process.env.PUBLIC_URL}/${balanceCard[0].icon}`}
                    alt=""
                  />
                  <span className="counter">{balanceCard[0].balance}</span>
                  <span className="ms-2">{balanceCard[0].balanceType}</span>
                </h5>

                {/* Recharge Button */}
                <Link
                  className="btn btn-warning rounded-pill btn-sm w-100 mt-3"
                  to="#"
                >
                  Recharge
                </Link>
              </div>
            </div>
          </div>

          {/* Sidenav */}
          <div className="sidenav">
            <ul>
              <li>Menu</li>
              {AdminNav.map((elem, index) => (
                <li key={index}>
                  <NavLink to={elem.path}>
                    <i className={`bi ${elem.icon}`} />
                    {elem.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <div className="mt-5" />
            {/* Copyright Text */}
            <div className="copywrite-text mt-4">
              <p className="mb-0 fz-14">
                {new Date().getFullYear()} © All rights reserved by
                <a
                  className="fz-14 ms-1"
                  rel="noreferrer"
                  href="/"
                  target="_blank"
                >
                  GDSC
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
