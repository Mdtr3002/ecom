import NewsletterContent from "../newsletter/NewsletterContent";
import LeftWidget from "./LeftWidget";

export default function Footer() {
  const footerBgImg = "img/bg-img/1.jpg";
  const footerBgShape = "img/core-img/shape1.png";

  return (
    <footer
      className="footer-area pb-120 pt-120"
      style={{
        backgroundImage: `url('${process.env.PUBLIC_URL}/${footerBgImg}')`,
      }}
    >
      {/* Background Shape */}
      <img
        className="footer-bg-shape"
        src={`${process.env.PUBLIC_URL}/${footerBgShape}`}
        alt="Shape"
      />

      <div className="container">
        <div className="row">
          {/* Footer Widget */}
          <LeftWidget
            lightLogo="img/core-img/logo2.png"
            darkLogo="img/core-img/logo2.png"
            subText="Unlock the thrill of bidding and winning with our dynamic online auction platform, where treasures await at every click."
            contactInfo="Email: nocanwin@hcmut.edu.vn"
            socialVisibility="visible" // try 'visible' or 'hidden'
            socialTitle="Join the community"
            socialLists={[
              {
                tootipPosition: "top",
                title: "Discord",
                icon: "img/core-img/discord_logo.svg",
                url: "https://discord.com/",
              },
              {
                tootipPosition: "top",
                title: "Facebook",
                icon: "img/core-img/facebook_logo.svg",
                url: "https://www.facebook.com/",
              },
              {
                tootipPosition: "top",
                title: "LinkedIn",
                icon: "img/core-img/linkedin_logo.svg",
                url: "https://www.linkedin.com/",
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
                  buttonText: "Subscribe Now",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copywrite-wrapper d-lg-flex align-items-lg-center justify-content-lg-between">
          {/* Copywrite Text */}
          <div className="copywrite-text text-center text-lg-start mb-3 mb-lg-0">
            <a
              href="https://gdsc.app"
              target="_blank"
              rel="noreferrer"
              className="mb-0"
            >
              {new Date().getFullYear()} © All rights reserved by No Can Win
            </a>
            <p style={{ color: "#8480AE" }}>Version: v0.3.1-02032023</p>
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
  );
}
