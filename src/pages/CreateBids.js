import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import CreateNewContent from "../components/createNew/CreateContent";

export default function CreateBids() {
    return(
        <>
            <Header />

            <Breadcrumb 
                breadcrumbTitle="Create New Bids" 
                breadcrumbNav={[
                    {
                        navText: "Home",
                        path: "/"
                    }
                ]}
            />

            <Divider />

            <CreateNewContent />
            
            <Divider />

            <Footer />
        </>
    )
}
