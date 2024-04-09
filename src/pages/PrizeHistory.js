import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import RankingData from "../data/ranking/ranking-data.json";
import { useEffect, useState } from "react";
import GameService from "../services/game.service";
import AdminService from "../services/admin.service";

const demoData = [
  {
    id: 1,
    name: "Nguyen Van A",
    "student's id": "2234567",
    prize: "Keychain",
  },
  {
    id: 2,
    name: "Tran Van B",
    "student's id": "2156699",
    prize: "Stickers",
  },
  {
    id: 3,
    name: "Nguyen Van C",
    "student's id": "2345678",
    prize: "Keychain",
  },
  {
    id: 4,
    name: "Tran Nguyen D",
    "student's id": "2134562",
    prize: "Lanyard",
  },
];

const PrizeHistory = () => {
  const columns = [
    {
      dataField: "id",
      text: "Index",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
    },
    {
      dataField: "student's id",
      text: "Student's ID",
    },
    {
      dataField: "prize",
      text: "Prize",
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    paginationSize: 5,
    disablePageTitle: true,
    hideSizePerPage: true,
  });

  const [rankingData, setRankingData] = useState([]);

  useEffect(() => {
    // GameService.getUserSession()
    //   .then((res) => {
    //     const data = res.data.payload.reverse().map((el, idx) => {
    //       el.id = idx + 1;
    //       return el;
    //     });
    //     setRankingData(res.data.payload);
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    AdminService.getPrizeHistory()
      .then((res) => {
        const prizeHistory = res.data.payload.map((el, idx) => {
          const data = {
            id: idx + 1,
            name: el.name,
            "student's id": el.studentId,
            prize: el.gifts
              .map((gift) => gift.quantity + " " + gift.type)
              .join(", "),
          };
          return data;
        });
        setRankingData(prizeHistory);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Breadcrumb
        breadcrumbTitle="Exchange History"
        breadcrumbNav={[
          {
            navText: "OIF 2024",
            path: "/oif",
          },
        ]}
      />

      <Divider />

      <div className="activity-wrapper">
        {/* Ranking Table */}
        <div className="container">
          <div className="ranking-table">
            <BootstrapTable
              keyField="id"
              data={rankingData}
              columns={columns}
              pagination={pagination}
            />
          </div>
        </div>
      </div>

      <Divider />
    </>
  );
};

export default PrizeHistory;
