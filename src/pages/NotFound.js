import Divider from "../components/divider/Divider";
import NotFoundContent from "../components/notFound/NotFound";

export default function NotFound() {
    return(
        <>
            <NotFoundContent 
                notFoundImage="img/illustrator/6.png" 
                heading="Uh oh! Nothing found." 
                subHeading="We couldn't find any results for your search. Try again." 
                button={[
                    {
                        color: "primary",
                        path: "/",
                        icon: "bi-house",
                        text: "Go Home"
                    }
                ]}
            />

            <Divider />
        </>
    )
}
