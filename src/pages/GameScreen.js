import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import ActivityTableData from "../data/activity/activity-data.json";
import GameBoard from "../components/gameboard";
import useTheme from "../custom-hook/useTheme";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { getFromTheme } from "../utils/utils";
import themes from "../config/themes.json";
import React, { useEffect } from "react";
import GameIntro from "../components/gameInro";
import Quiz from "../components/MathQuiz/Quiz.js";
import { useLocation } from "react-router-dom";

const GameScreen = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    if (pathname == '/connect') {
      localStorage.setItem("connectRequired", "true");
    }
  },[]);
  
  const columns = [
    {
      dataField: "item",
      text: "Item",
      sort: true,
    },
    {
      dataField: "price",
      text: "Price",
    },
    {
      dataField: "author",
      text: "Author",
    },
    {
      dataField: "event",
      text: "Event",
    },
    {
      dataField: "time",
      text: "Time",
      sort: true,
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    paginationSize: 5,
    disablePageTitle: true,
    hideSizePerPage: true,
  });

  const [themeName, toggleTheme] = useTheme("darkTheme");

  const GlobalStyle = createGlobalStyle`
    body {
        background: ${getFromTheme("body.bg")};
        color: ${getFromTheme("body.color")};
        transition: background .3s ease;
        margin-top: 40px;
        height: 100%;
    }
  `;

  return (
    <>
      <GlobalStyle />
      <Quiz toggleTheme={toggleTheme} />
    </>
  );
};

export default GameScreen;
