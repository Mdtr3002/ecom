import Divider from "../components/divider/Divider";
import FeaturedNFT from "../components/featuredNFT/FeaturedNFT";
import TopSeller from "../components/topSeller/top-seller";
import TopBuyer from "../components/topBuyer/TopBuyer";
import Process from "../components/process/Process";
import DiscoverItems from "../components/discover/Discover";
import LiveAuction from "../components/liveAuction/LiveAuction";
import DiscoverAllBidItem from "../components/discover/DiscoverAllBidItems";

export default function MarketPlace() {
  return (
    <>
        <FeaturedNFT heading="Featured" />

        <Divider />

        {/* Todays Drop, Top Seller, Top Buyer */}
        <div className="top-seller-wrapper">
          <div className="container">
            <div className="row g-4 g-lg-5 justify-content-center">
              {/* Data: data > todaysDrop > todays-drop.json */}
              {/* <TodaysDrop
                heading="Today's Drops"
                buttonText="View All Drops"
                buttonURL="/featured-items"
              /> */}

              {/* Data: data > topSeller > top-seller.json */}
              <TopSeller
                heading="Top Seller"
                buttonText="View All Seller's"
                buttonURL="/top-seller"
              />

              {/* Data: data > topBuyer > top-buyer.json */}
              <TopBuyer
                heading="Top Buyer"
                buttonText="View All Buyer's"
                buttonURL="/top-buyer"
              />
            </div>
          </div>
        </div>

        <Divider />

        <LiveAuction
          backgroundColor="gray"
          spinnerColor="danger"
          title="Live Auctions"
          buttonText="View All Auctions"
          buttonURL="/live-bidding"
          buttonColor="primary"
        />

        <Divider />

        {/* <DiscoverItems title="Explore" /> */}
        <DiscoverAllBidItem />

        {/* <PopularCollection title="Popular items in last" /> */}

        {/* <Divider /> */}

        {/* Data:  */}
        {/* <Collection
          heading="Browse by category"
          buttonText="View All Catagories"
          buttonURL="/collections"
          buttonColor="primary"
        /> */}
        

        <Divider />

    </>
  );
}
