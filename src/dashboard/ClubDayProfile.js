import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";

import $ from "jquery";
import ClubDayServices from "../services/clubday.service";
import { useStorageState } from "../custom-hook/useLocalStorage";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const ClubDayProfile = ({ clubDayInfo, setclubDayInfo }) => {
    const [key, setKey] = useState('general');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const [fullName, setFullName] = useState(clubDayInfo?.name);
    // const [email, setEmail] = useState(clubDayInfo?.email);
    const [studentId, setstudentId] = useState(Number(clubDayInfo?.studentId));

    const handleSubmit = (e) => {
      e.preventDefault();

      (async () => {
        try {
          const { data } = await ClubDayServices.updateClubDayInfo(fullName, studentId);
          const { payload } = data;
          setclubDayInfo({...clubDayInfo, studentId, name: fullName});
          setSuccess("Your profile has been updated.");
          setError('');
        } catch (err) {
          setSuccess('');
          setError(err?.response?.data?.message);
        }
      })()
    }

    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-9 col-lg-6">
                        <div className="section-heading">
                            <h2 className="mb-0">Update Your Profile for Club Day</h2>
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
                                                <input className="form-control bg-gray border-0" type="text" name="fullName" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                            </div>

                                            {/* <div className="col-12">
                                                <input className="form-control bg-gray border-0" type="email" name="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div> */}

                                            <div className="col-12">
                                                <input className="form-control bg-gray border-0" type="number" name="studentId" placeholder="Student ID" value={studentId} onChange={(e) => setstudentId(e.target.value)} required/>
                                            </div>

                                            <div className="text-success">{success}</div>
                                            <div className="text-danger">{error}</div>

                                            <div className="col-12">
                                                <button className="btn btn-primary w-100 rounded-pill" type="submit">
                                                    <i className="bi bi-sd-card-fill me-1" />Save changes
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
    )
}

export default ClubDayProfile;
