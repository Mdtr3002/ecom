import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import HomepageLoadingAnimation from "./HomepageAnimation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from '../../actions/auth';
import QuizLoadingAnimation from "../loading/QuizAnimation";

export default function HeroOne(props) {
  const { heading, subHeading, buttonGroup, welcomeImage, startGame, show, quiz } = props;
  const { isAuthenticate } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!show && quiz)
    return <></>

  return (
    <div className={`welcome-area ${isAuthenticate ? 'no-mt' : ''}`} style={{ marginTop: '20px' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Welcome Content */}
          <div className="col-12">
            <div className="welcome-content mb-md-0">
              {/* <ScrollAnimation
                animateIn="fadeInUp"
                delay={400}
                animateOnce={true}
              > */}
                <h2 style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: heading }}></h2>
              {/* </ScrollAnimation> */}
              {/* <ScrollAnimation
                animateIn="fadeInUp"
                delay={800}
                animateOnce={true}
              > */}
                <p
                  style={{ textAlign: 'center' }}
                  dangerouslySetInnerHTML={{ __html: subHeading }}
                ></p>
              {/* </ScrollAnimation> */}

              {/* Button Group */}
              <div className="col-12" style={{ textAlign: 'center' }}>
                  <div className="welcome-thumb">
                  {/* <img
                  src={`${process.env.PUBLIC_URL}/${welcomeImage}`}
                  alt="Welcome"
                  /> */}
                  </div>
                  {quiz ? (<QuizLoadingAnimation />) : (<HomepageLoadingAnimation />)}
              </div>
              {/* <ScrollAnimation
                animateIn="fadeInUp"
                delay={1200}
                animateOnce={true}
              > */}
                <div className="hero-btn-group" style={{ textAlign: 'center' }}>
                  {!isAuthenticate && (
                    <button className="btn btn-success login play-btn mt-3 me-3"
                    type="submit" 
                    onClick={async () => {
                      dispatch(login());
                      await navigate("/");
                    }}
                    >
                      Google Account Log In
                    </button>
                  )}
                  {
                    isAuthenticate && (
                      <button
                    className={`play-btn btn btn-${buttonGroup[0].btnColor} rounded-pill mt-3 me-3`}
                    onClick={startGame}
                    >
                      Play
                    </button>
                    )
                  }
                  {quiz && (
                    <Link className="btn btn-success login play-btn mt-3 me-3"
                    to="/leaderboard"
                    style={{backgroundColor: '#102878', border: 'none'}}
                    >
                      View Daily Leaderboard
                    </Link>
                  )}
                  {/* <Link className={`btn btn-${buttonGroup[1].btnColor} hover-primary mt-3`} to={buttonGroup[1].btnURL} >
                                        <i className={`me-2 bi ${buttonGroup[1].btnIcon}`} />
                                        {buttonGroup[1].btnText}
                                    </Link> */}
                </div>
              {/* </ScrollAnimation> */}
            </div>
          </div>

          {/* Welcome Thumb */}
        </div>
      </div>
    </div>
  );
}
