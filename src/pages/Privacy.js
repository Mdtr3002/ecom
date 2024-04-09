import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Divider from "../components/divider/Divider";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import TermsPrivacyContent from "../components/termsPrivacy/TermsPrivacy";

export default function Privacy() {
    return(
        <div style={{marginBottom: '-2rem'}}>
            <Header />
            
            <Breadcrumb 
                breadcrumbTitle="Privacy Policy" 
                breadcrumbNav={[
                    {
                        navText: "Home",
                        path: "/"
                    }
                ]}
                adjustPos
            />

            <Divider />

            <TermsPrivacyContent 
                contentBody={[
                    "<h3>Privacy Policy</h3>",
                    "<p>This Privacy Policy describes our policies and procedures on the collection, use and disclosure of your information when you use the service and tells you about your privacy rights and how the law protects you.</p>",
                    "<p>We use your personal data to provide and improve the service. By using the service, you agree to the collection and use of information in accordance with this Privacy Policy.</p>",
                    "<div class='mb-5'></div>",

                    "<h3>Collecting and Using Your Personal Data</h3>",
                    "<h5>Types of Data Collected</h5>",
                    "<p>While using our service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:</p>",
                    "<p>● Email address</p>",
                    "<p>● First name and last name</p>",
                    "<p>● Phone number</p>",
                    "<p>● School/University</p>",
                    "<h5>Use of Your Personal Data</h5>",
                    "<p>Our organization may use personal data for the following purposes:</p>",
                    "<p>● <b>To provide and maintain our service</b>, including to monitor the usage of our service.</p>",
                    "<p>● <b>To manage your account:</b> to manage your registration as a user of the Service. The Personal Data you provide can give you access to different functionalities of the service that are available to you as a registered user.</p>",
                    "<p>● <b>For the performance of a contract: </b>the development, compliance and undertaking of the purchase contract for the products, items or services you have purchased or of any other contract with Us through the service.</p>",
                    "<p>● <b>To contact you: </b>to contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>",
                    "<p>● <b>To provide you</b> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information.</p>",
                    "<p>● <b>For other purposes: </b>we may use your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our service, products, services, marketing and your experience.</p>",
                    "<div class='mb-5'></div>",

                    "<h3>Retention of Your Personal Data</h3>",
                    "<p>Our organization will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your personal data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>",
                    "<div class='mb-5'></div>",

                    "<h3>Security of Your Personal Data</h3>",
                    "<p>The security of your personal data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>",
                    "<div class='mb-5'></div>",
                    "<h3>Links to Other Websites</h3>",
                    "<p>Our service may contain links to other websites that are not operated by Us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>",
                    "<div class='mb-5'></div>",

                    "<h3>In-Game Currency</h3>",
                    "<p>●  In-Game Currency will be provided to Users by the means designated by GDSC HCMUT, such as through games completion. The purchase unit, payment method, usage period, and any other conditions for providing In-Game Currency shall be determined by GDSC HCMUT and displayed in the Service or on GDSC HCMUT’s website.</p>",
                    "<p>●  In-Game Currency may not be exchanged for cash, property or other economic benefits other than for the services and content designated by our organization. The amount of In-Game Currency required for receiving the services or content, as well as any other conditions for exchanging In-Game Currency, shall be determined by GDSC HCMUT and displayed in the Service or on GDSC HCMUT’s website.</p>",
                    "<p>●  In-Game Currency may only be used in the account through which users acquired such In-Game Currency; In-Game Currency may not be assigned or transferred to any other account. </p>",
                    "<div class='mb-5'></div>",

                    "<h3>Changes to this Privacy Policy</h3>",
                    "<p>We may update our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>",
                    "<p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>",
                    "<div class='mb-5'></div>",

                    "<h3>Contact Us</h3>",
                    "<p>If you have any questions about this Privacy Policy, you can contact us:</p>",
                    "<p>● By email: contact@gdschcmut.dev</p>",
                    "<div class='mb-5'></div>"
                ]}
                infoLastUpdated="Last updated Feb 13, 2023"
            />

            <Divider />

            <Footer />
        </div>
    )
}