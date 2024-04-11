import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";
import { useStorageState } from "../custom-hook/useLocalStorage";

import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { SET_USER_INFO } from "../action-types";
import UserServices from "../services/user.service";
import ClubDayServices from "../services/clubday.service";
import { timeConverterForInput } from "../utils/utils";
import { createNotification, SUCCESS_NOTI } from "../utils/notification";
import Preloader from "../components/preLoader/GoogleLoading";

window.jQuery = window.$ = $;
require("jquery-nice-select");

const MyProfile = ({ setClubDayUpdated }) => {
  const [key, setKey] = useState("general");

  const [soundFxEnable, setSoundFxEnable] = useStorageState("soundFx", false);

  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.university);
  const [studentId, setStudentId] = useState(user.studentId);
  const [dob, setDob] = useState(timeConverterForInput(user.dob));
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const selectTimezone = useRef();
  const selectWeekStart = useRef();
  const onSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    ClubDayServices.updateClubDayInfo(name, studentId)
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        setErrMsg(err?.message || "Unexpected error");
        setIsLoading(false);
      });
    UserServices.editProfile({
      email,
      name,
      phone,
      address,
      studentId,
      dob: Math.floor(new Date(dob).getTime()),
    })
      .then(() => {
        console.log("success");
        dispatch({
          type: SET_USER_INFO,
          payload: user,
        });
        createNotification(SUCCESS_NOTI, "Edit profile success");
        setErrMsg("");
        setIsLoading(false);
        if (!name || !phone || !studentId) setClubDayUpdated(false);
      })
      .catch((err) => {
        setErrMsg(err?.message || "Unexpected error");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    $(selectTimezone.current).niceSelect();
    // console.log(user);
  }, []);

  useEffect(() => {
    $(selectWeekStart.current).niceSelect();
  }, []);

  useEffect(() => {
    if (errMsg && errMsg !== "") {
      setTimeout(() => setErrMsg(""), 1500);
    }
  }, [errMsg]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-9 col-lg-6">
            <div className="section-heading">
              <h2 className="mb-0">My Profile</h2>
            </div>
          </div>
        </div>
      </div>
      <CreateNewButton />

      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
            <Tabs
              id="setting-tab"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="border-0 mb-3 settings-tabs"
            >
              <Tab eventKey="general" title="General">
                <div className="card">
                  <div className="card-body" style={{ padding: "32px" }}>
                    <div className="row g-4">
                      <div className="col-2 d-flex align-items-center profile-width-s">
                        {" "}
                        <p className="m-0">Name</p>{" "}
                      </div>
                      <div className="col-10 profile-width-l">
                        <input
                          className="form-control bg-gray border-0"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                        />
                      </div>

                      <div className="col-2 d-flex align-items-center profile-width-s">
                        {" "}
                        <p className="m-0">Email</p>{" "}
                      </div>
                      <div className="col-10 profile-width-l">
                        <input
                          className="form-control bg-gray border-0"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          placeholder="Email Address"
                        />
                      </div>

                      <div className="col-2 d-flex align-items-center profile-width-s">
                        {" "}
                        <p className="m-0">Phone</p>{" "}
                      </div>
                      <div className="col-10 profile-width-l">
                        <input
                          className="form-control bg-gray border-0"
                          type="number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          name="phone"
                          placeholder="Phone number"
                        />
                      </div>

                      <div className="col-2 d-flex align-items-center profile-width-s">
                        {" "}
                        <p className="m-0">Address</p>{" "}
                      </div>
                      <div className="col-10 profile-width-l">
                        <input
                          className="form-control bg-gray border-0"
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          name="university"
                          placeholder="Your address"
                        />
                      </div>

                      <div className="col-2 d-flex align-items-center profile-width-s">
                        {" "}
                        <p className="m-0">Citizen ID</p>{" "}
                      </div>
                      <div className="col-10 profile-width-l">
                        <input
                          className="form-control bg-gray border-0"
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          name="studentId"
                          placeholder="Student ID"
                        />
                      </div>

                      <div className="col-2 d-flex align-items-center profile-width-s">
                        {" "}
                        <p className="m-0">Birthday</p>{" "}
                      </div>
                      <div className="col-10 profile-width-l">
                        <input
                          className="form-control bg-gray border-0"
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          name="dob"
                          placeholder="Birthday"
                        />
                      </div>

                      {/* 
                    <div className="col-12">
                        <select ref={selectTimezone} className="filter-select bg-gray w-100">
                            <option value={1}>Timezone</option>
                            <option value={2}>UTC +0</option>
                            <option value={3}>UTC +1</option>
                            <option value={4}>UTC +2</option>
                            <option value={5}>UTC +3</option>
                            <option value={6}>UTC +4</option>
                            <option value={7}>UTC +5</option>
                            <option value={8}>UTC +6</option>
                            <option value={9}>UTC +7</option>
                            <option value={10}>UTC +8</option>
                            <option value={11}>UTC +9</option>
                            <option value={12}>UTC +10</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <select ref={selectWeekStart} className="filter-select bg-gray w-100">
                            <option value={1}>Week starts on</option>
                            <option value={2}>Saturday</option>
                            <option value={3}>Sunday</option>
                            <option value={4}>Monday</option>
                        </select>
                    </div> */}

                      <span style={{ color: "red" }}>{errMsg}</span>

                      <div className="col-12 g-3">
                        <button
                          className="btn btn-primary w-40 rounded-pill"
                          type="button"
                          onClick={onSave}
                        >
                          <i className="bi bi-sd-card-fill me-1" />
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              {/* <Tab eventKey="setting" title="Setting">
                <div className="card">
                  <div className="card-body p-4 p-sm-5">
                    <div className="row g-4">
                      <div className="form-check form-switch mb-3">
                        <input
                          className="form-check-input"
                          id="switch1"
                          type="checkbox"
                          role="switch"
                          value={soundFxEnable}
                          onChange={() => {
                            setSoundFxEnable(!soundFxEnable);
                          }}
                        />
                        <label className="form-check-label" for="switch1">
                          Enable Sound Effect
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab> */}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
