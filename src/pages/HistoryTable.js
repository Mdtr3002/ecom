import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import RankingData from "../data/ranking/ranking-data.json";
import { useEffect, useLayoutEffect, useState } from 'react';
import GameService from '../services/game.service';

const HistoryTable = () => {
    const columns = [
        {
            dataField: 'id',
            text: 'Index',
            sort: true,
        },
        {
            dataField: 'level',
            text: 'Level'
        }
    ];

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 10,
        paginationSize: 5,
        disablePageTitle: true,
        hideSizePerPage: true
    });

    const [rankingData, setRankingData] = useState([]);

    useEffect(() => {
      GameService.getUserSession()
        .then((res) => {
          setRankingData(res.data.payload.reverse().map((el, idx) => {
            el.id = idx + 1;
            el.level--;
            return el;
          }));
        })
        .catch((err) => {
          // console.log(err);
        })
    }, []);

    return(
        <>
            
            <Breadcrumb 
                breadcrumbTitle="Game History" 
                breadcrumbNav={[
                    {
                        navText: "Home",
                        path: "/"
                    }
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
    )
}

export default HistoryTable;
