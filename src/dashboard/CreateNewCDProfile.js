import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";

import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import ClubDayServices from "../services/clubday.service";
import { useStorageState } from "../custom-hook/useLocalStorage";
import { useNavigate } from "react-router-dom";
import Divider from "../components/divider/Divider";
import UserServices from "../services/user.service";
import { SET_USER_INFO } from "../action-types";
import Preloader from "../components/preLoader/GoogleLoading";
import {
  createNotification,
  SUCCESS_NOTI,
  WARNING_NOTI,
} from "../utils/notification";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const CreateNewCDProfile = ({ setClubDayUpdated }) => {
  const { user } = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState(user.name);
  // const [email, setEmail] = useState('');
  const [studentId, setstudentId] = useState(user.studentId);
  const [phone, setPhone] = useState(user.phone);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isClubdayVerify } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    UserServices.editProfile({
      name: fullName,
      studentId,
      phone,
    })
      .then(() => {
        console.log("success");
        dispatch({
          type: SET_USER_INFO,
          payload: user,
        });
      })
      .catch((err) => {
        createNotification(
          WARNING_NOTI,
          err?.response?.data?.message || "Error in updating user profile"
        );
        setIsLoading(false);
      });

    if (isClubdayVerify) {
      ClubDayServices.updateClubDayInfo(fullName, studentId)
        .then(() => {
          setClubDayUpdated(true);
          createNotification(SUCCESS_NOTI, "Profile updated");
          setIsLoading(false);
          console.log("a");
          navigate("/oif");
        })
        .catch((err) => {
          createNotification(
            WARNING_NOTI,
            err?.response?.data?.message || "Error in updating OIF profile"
          );
          setIsLoading(false);
        });
    } else {
      ClubDayServices.createClubDayInfo(fullName, studentId)
        .then(() => {
          setClubDayUpdated(true);
          createNotification(SUCCESS_NOTI, "Profile updated");
          setIsLoading(false);
          console.log("a");
          navigate("/oif");
        })
        .catch((err) => {
          createNotification(
            WARNING_NOTI,
            err?.response?.data?.message || "Error in updating OIF profile"
          );
          setIsLoading(false);
        });
    }
    // (async () => {
    //   try {
    //     // console.log('save name', fullName, studentId);
    //     const { data } = await ClubDayServices.createClubDayInfo(
    //       fullName,
    //       studentId
    //     );
    //     const { payload } = data;
    //     setSuccess("Your profile has been updated.");
    //     setError("");
    //   } catch (err) {
    //     setSuccess("");
    //     setError(err?.response?.data?.message);
    //     // console.log(err);
    //   }
    // })();
  };

  if (isLoading) {
    return (
      <>
        <Preloader />
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-9 col-lg-7">
            <div className="section-heading">
              <h2 className="mb-0">Create Your Profile For OIF 2024</h2>
              <p className="mb-0 mt-4">
                This information will be collected and returned to the Office of
                International Studies and Program.
              </p>
            </div>
          </div>
        </div>
      </div>
      <CreateNewButton />

      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
            <div className="card">
              <div className="card-body p-4 p-sm-5">
                <Form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-12">
                      <input
                        className="form-control bg-gray border-0"
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    {/* <div className="col-12">
                                                <input className="form-control bg-gray border-0" type="email" name="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div> */}

                    <div className="col-12">
                      <input
                        className="form-control bg-gray border-0"
                        type="number"
                        name="studentId"
                        placeholder="Student ID"
                        value={studentId}
                        onChange={(e) => setstudentId(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <input
                        className="form-control bg-gray border-0"
                        type="number"
                        name="phone"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 rounded-pill"
                        type="submit"
                      >
                        <i className="bi bi-sd-card-fill me-1" />
                        Save changes
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewCDProfile;
