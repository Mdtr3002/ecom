import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import EditContent from "../components/createNew/EditContent";
import Divider from "../components/divider/Divider";

export default function EditBids() {
    return(
        <>
            <Header />

            <Breadcrumb 
                breadcrumbTitle="Edit My Bids" 
                breadcrumbNav={[
                    {
                        navText: "Home",
                        path: "/"
                    }
                ]}
            />

            <Divider />

            <EditContent />
            
            <Divider />

            <Footer />
        </>
    )
}
