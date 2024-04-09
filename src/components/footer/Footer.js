import NewsletterContent from "../newsletter/NewsletterContent";
import LeftWidget from "./LeftWidget";

export default function Footer() {
    const footerBgImg = "img/bg-img/1.jpg";
    const footerBgShape = "img/core-img/shape1.png";

    return(
        <footer className="footer-area pb-120 pt-120" style={{backgroundImage: `url('${process.env.PUBLIC_URL}/${footerBgImg}')`}}>
            
            {/* Background Shape */}
            <img className="footer-bg-shape" src={`${process.env.PUBLIC_URL}/${footerBgShape}`} alt="Shape" />
            
            <div className="container">
                <div className="row">
                    {/* Footer Widget */}
                    <LeftWidget 
                        lightLogo="img/core-img/logo2.png" 
                        darkLogo="img/core-img/logo2.png" 
                        subText="From our dedicated organizers, a community-based web which promote exciting discord activities, fun-to-play games and built-in prize exchange mechanism" 
                        contactInfo="Email: contact@gdschcmut.dev"                        
                        socialVisibility="visible" // try 'visible' or 'hidden'
                        socialTitle="Join the community" 
                        socialLists={[
                            {
                                tootipPosition: "top",
                                title: "Discord",
                                icon: "img/core-img/discord_logo.svg",
                                url: "https://link.gdsc.app/discord"
                            },
                            {
                                tootipPosition: "top",
                                title: "Facebook",
                                icon: "img/core-img/facebook_logo.svg",
                                url: "https://www.facebook.com/dscxhcmut"
                            },
                            {
                                tootipPosition: "top",
                                title: "LinkedIn",
                                icon: "img/core-img/linkedin_logo.svg",
                                url: "https://www.linkedin.com/company/developer-student-clubs-hcmut/mycompany/"
                            },
                        ]} 
                        newsletterVisibility="visible" // try 'visible' or 'hidden'
                    />

                    {/* Footer Widget */}
                    <div className="col-12 col-lg-7">
                        <NewsletterContent 
                            title="Subscribe" 
                            subTitle="Stay up to date with our event" 
                            formInfo={[
                                {
                                    inputPlaceholder: "Type your mail",
                                    helperText: "We'll never share your email with anyone else.",
                                    helperIcon: "bi-lock",
                                    buttonColor: "primary",
                                    buttonText: "Subscribe Now"
                                }
                            ]}
                        />

                    </div>
                </div>
            </div>

            <div className="container">
                <div className="copywrite-wrapper d-lg-flex align-items-lg-center justify-content-lg-between">
                    
                    {/* Copywrite Text */}
                    <div className="copywrite-text text-center text-lg-start mb-3 mb-lg-0">
                        <a href="https://gdsc.app" target="_blank" rel="noreferrer" className="mb-0">{new Date().getFullYear()} © All rights reserved by GDSC HCMUT</a>
                        <p style={{color: '#8480AE'}}>Version: v0.3.1-02032023</p>
                    </div>

                    {/* Footer Nav */}
                    {/* <FooterNav 
                        navList={[
                            {
                                title: "Privacy Policy",
                                link: "/privacy"
                            },
                            {
                                title: "Terms & Conditions",
                                link: "/terms"
                            }
                        ]}
                    /> */}
                    
                </div>
            </div>
        </footer>
    )
}
