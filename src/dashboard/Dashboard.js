import ActivityTab from "../components/dashboard/activityTab/ActivityTab";
import MonthlyVisitorChart from "../components/dashboard/charts/MonthlyVisitorChart";
import PriceHistory from "../components/dashboard/charts/PriceHistory";
import StatisticsChart from "../components/dashboard/charts/StatisticsChart";
import StatisticsChartTwo from "../components/dashboard/charts/StatisticsChartTwo";
import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";
import FeaturedCard from "../components/dashboard/featuredCard/FeaturedCard";
import HeroCard from "../components/dashboard/hero/HeroCard";
import TodaysPick from "../components/dashboard/todaysPick/TodaysPick";
import TopAuthor from "../components/dashboard/topAuthor/TopAuthor";
import TopBuyer from "../components/dashboard/topBuyer/TopBuyer";
import TrendingAuction from "../components/dashboard/trendingAuction/TrendingAuction";
import GameIntroBox from "../components/dashboard/gameIntroBox";
import GCoinIntroBox from "../components/dashboard/gcoinIntro";
import BiddingIntroBox from "../components/dashboard/biddingIntro";
import ItemExchangeIntro from "../components/dashboard/itemExchangeIntro";
import quizIcon from "../assets/image/quiz.png";
import fasttogIcon from "../assets/image/cube.png";
import Footer from "../components/footer/Footer";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { name } = useSelector(state => state.auth.user);
  return (
    <div style={{marginBottom: '-2rem'}}>
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-9 col-lg-6">
                    <div className="section-heading">
                        <h2 className="mb-0">Welcome {name}!</h2>
                    </div>
                </div>
            </div>
        </div>

        <div className="container" style={{marginBottom: '80px'}}>
          <div className="row g-4">
            <div className="col-12 col-xxl-6">
              <div className="row g-4">
                {/* Hero Card */}
                <HeroCard
                  backgroundImage="img/bg-img/44.jpg"
                  heading="GDSC Game"
                  subHeading="Desgined by our dedicated organizers, exciting activities and valuable prizes await."
                  buttonGroup={[
                    {
                      style: "warning",
                      path: "/tutorial",
                      text: "Games",
                    },
                    {
                      style: "dark",
                      path: "/collection",
                      text: "Items Bidding",
                    },
                  ]}
                />

                {/* Statistics Chart */}
                {/* <StatisticsChart title="Sales" subTitle="Last 10 days" /> */}
                <GameIntroBox title="GDSC Quiz" subTitle="Math Expert?" imgSrc={quizIcon} link="/math-quiz" />
                <GameIntroBox title="Fast to G" subTitle="Good Reflex?" imgSrc={fasttogIcon} link="/fast-to-g" rev={true} />
                {/* Statistics Chart */}
                {/* <StatisticsChartTwo title="Revenue" subTitle="Last 10 days" /> */}
              </div>
            </div>

            {/* Monthly Visitor Chart */}
            <GCoinIntroBox title="GCoin" backgroundImage="img/bg-img/6.jpg" />

            {/* Activity Tab */}
            {/* <ActivityTab /> */}

            {/* Trending Auctions */}
            {/* <TrendingAuction
              title="Trending Auctions"
              icon="img/core-img/fire2.png"
            /> */}

            <FeaturedCard
              title="Auction Item"
              buttonText="View all"
              buttonPath="/collection"
              animationTime = {500}
              reload={false}
            />

            <ItemExchangeIntro
              title="Item Collection"
              icon="img/core-img/ethereum.png"
            />

            <BiddingIntroBox
              title="Special BIDDING!"
              btnPath="/featured-items"
              btnText="View all"
            />

            {/* <TopAuthor title="Top Players" />

            <TopBuyer title="Top Buyers" /> */}
          </div>
        </div>
        <Footer />
    </div>
  );
};

export default Dashboard;
