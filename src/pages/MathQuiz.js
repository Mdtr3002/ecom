import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import ActivityTableData from "../data/activity/activity-data.json";
import Quiz from "../components/MathQuiz/Quiz";
import { useStorageState } from "../custom-hook/useLocalStorage";
import { useEffect } from "react";

const Activity = () => {
  const [soundFxEnable, setSoundFxEnable] = useStorageState("soundFx", true);
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://dunggramer.github.io/disable-devtool/disable-devtool.min.js";
    script.async = true;
    script.setAttribute("id", "disable-devtools");
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <div>
      <div className="create-new-button">
        <button
          className="shadow-lg btn btn-warning"
          onClick={() => setSoundFxEnable(!soundFxEnable)}
        >
          <i className={`fz-20 bi bi-${soundFxEnable ? 'volume-up-fill' : 'volume-mute-fill'}`} />
        </button>
      </div>
      <Quiz />
    </div>
  );
};

export default Activity;
