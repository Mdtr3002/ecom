import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { login } from "../../actions/auth";
import LoginAnimation from "../../assets/animation/login.json";

import { useDispatch } from "react-redux";
import Lottie from "lottie-react";
import LoginButton from "../gameboard/components/loginButton";

const LoginContent = (props) => {
  const { title, subTitle, button } = props;
  const [passwordShow, setPasswordShow] = useState(false);
  const navigate = useNavigate();

  const lottieRef = useRef();

  const dispatch = useDispatch();

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };

  return (
    <div className="register-area">
      <div className="container">
        <div className="d-flex flex-column-reverse flex-md-row g-4 g-lg-5 align-items-center justify-content-between">
          <div className="col-12 col-md-6 col-xl-5">
            <div className="register-card">
              <h2>{title}</h2>
              <p style={{ color: "white", whiteSpace: "pre-line" }}>
                {subTitle}
                <Link className="ms-1 hover-primary" to={button[0].path}>
                  {button[0].text}
                </Link>
              </p>

              {/* Register Form */}
              <div className="register-form mt-5">
                {/* <Form.Group className="mb-4">
                                        <Form.Control type="email" placeholder="Email" required />
                                    </Form.Group> */}

                {/* <Form.Group className="mb-4 form-group">
                                        <label className="label-psswd" onClick={togglePassword} htmlFor="registerPassword"> {passwordShow ? "Hide" : "Show"}
                                        </label>
                                        <Form.Control type={passwordShow ? "text" : "password"} id="registerPassword" placeholder="Password" required />
                                    </Form.Group> */}

                {/* <button
                  className="btn btn-success w-100"
                  type="submit"
                  onClick={async () => {
                    dispatch(login());
                    await navigate("/");
                  }}
                >
                  Log In With Google
                </button> */}
                <LoginButton />

                {/* <div className="login-meta-data d-flex align-items-center justify-content-between">
                                    <Form.Check className="mt-4"
                                        type="checkbox" 
                                        id="keepMeLogin" 
                                        label="Keep me logged in" 
                                        defaultChecked
                                    />                                    
                                    <Link className="forgot-password mt-4 text-primary fz-16" to="/forget-password">
                                        Forgot Password?
                                    </Link>
                                </div> */}
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="register-thumbnail mt-5 mt-md-0">
              {/* <img src={LoginImage} alt="Login" /> */}
              <Lottie lottieRef={lottieRef} animationData={LoginAnimation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
