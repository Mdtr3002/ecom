import { NavLink } from 'react-router-dom';
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { useStorageState } from '../../custom-hook/useLocalStorage';
import usePath from '../../custom-hook/usePath';


export default function FuntoNavbar() {

    const { isAuthenticate } = useSelector((state) => state.auth);
    const [ isFinishGameOnboard ] = useStorageState("isFinishGameOnboard");

    const [mainRoute] = usePath();

    const arrowUp = "img/icons/arrowup.svg";

    return(
        <div className="navbar-nav navbar-nav-scroll my-2 my-lg-0">
            {/* <NavDropdown className="ft-dd" title="Home" id="Home">
                <NavLink to="/home1">Home Variation 1</NavLink>
                <NavLink to="/home2">Home Variation 2</NavLink>
            </NavDropdown> */}
    

            <NavDropdown className="ft-dd" title="Marketplace" id="Maketplace">
                <NavLink to="/top-seller">Top Seller</NavLink>
                <NavLink to="/top-buyer">Top Buyer</NavLink>
                <NavLink to="/live-bidding">Live Auction</NavLink>
                <NavLink to="/explore">Explore</NavLink>
                {isAuthenticate && <NavLink to="/create-new">Create New Items</NavLink>}
            </NavDropdown>

            {/* <NavDropdown className="ft-dd" title="Pages" id="Pages">
                <NavLink to="/activity">Activity</NavLink>
                <NavLink to="/ranking">Ranking</NavLink>
                <NavLink to="/create-new">Create New Items</NavLink>
                <NavLink to="/connet-wallet">Connect Wallet</NavLink>
                <NavLink to="/author/designing_world">Author Profile</NavLink>

                <NavDropdown className="ft-dd" title="Authentification" id="Authentification" drop="end">
                    <NavLink to="/register">Register</NavLink>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/forget-password">Forget Password</NavLink>
                </NavDropdown>

                <NavDropdown className="ft-dd" title="Blog" id="Blog" drop="end">
                    <NavLink to="/blog">Blog</NavLink>
                    <NavLink to="/blog-details/1">Blog Details</NavLink>
                </NavDropdown>

                <NavDropdown className="ft-dd" title="Others" id="Others" drop="end">
                    <NavLink to="/about">About Us</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/newsletter">Newsletter</NavLink>
                    <NavLink to="/privacy">Privacy Policy</NavLink>
                    <NavLink to="/terms">Terms</NavLink>
                    <NavLink to="/404">404</NavLink>
                </NavDropdown>

                <NavDropdown className="ft-dd" title="About" id="HelpCenter" drop="end">
                    <NavLink to="/help-center">Help Home</NavLink>
                    <NavLink to="/help-center/licenses">All Questions</NavLink>
                    <NavLink to="/help-question-details/1">Question Details</NavLink>
                </NavDropdown>
            </NavDropdown> */}

            <NavLink to="/play">
                <span style={{ position: 'relative' }}>
                    PLAY NOW
                    {!isFinishGameOnboard && mainRoute !== "play" && <div className="animate-play-now-arrow">
                        <img className="play-now-arrow" src={`${process.env.PUBLIC_URL}/${arrowUp}`} alt="Arrow" />
                    </div>}
                </span>
            </NavLink>

            <NavLink to="/contact">Contact</NavLink>
        </div>
    )
}
