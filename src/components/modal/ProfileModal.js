import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProfileModal({ show, onHide, onConfirm }) {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="ReportLabel"
      centered
      className="share-modal"
    >
      <Modal.Body>
        <div className="row g-4">
          <p>Please confirm this is your information. Our team will use this information to contact you.</p>
          <div className="col-2 d-flex align-items-center"> <p className="m-0">Name</p> </div>
          <div className="col-10">
            <input className="form-control bg-gray border-0" value={user.name} disabled type="text" onChange={e => e.preventDefault()} name="fullName" placeholder="Full Name" />
          </div>

          <div className="col-2 d-flex align-items-center"> <p className="m-0">Email</p> </div>
          <div className="col-10">
            <input className="form-control bg-gray border-0" type="email" value={user.email} onChange={e => e.preventDefault()} disabled name="email" placeholder="Email Address" />
          </div>

          <div className="col-2 d-flex align-items-center"> <p className="m-0">Phone</p> </div>
          <div className="col-10">
            <input className="form-control bg-gray border-0" type="number" value={user.phone} onChange={e => e.preventDefault()} name="phone" disabled placeholder="Phone" />
          </div>

          <div className="col-12 d-flex justify-content-around g-3">
            <button className="btn btn-warning w-30 rounded-pill" type="button" onClick={() => navigate('/my-profile')}>
              Edit Profile
            </button>
            <button className="btn btn-primary w-30 rounded-pill" type="button" onClick={onConfirm}>
              Accept
            </button>
          </div>
        </div>
        <button
          onClick={onHide}
          className="btn btn-close-style btn-danger btn-sm rounded-pill"
          type="button"
        >
          <i className="bi bi-x-lg" />
        </button>
      </Modal.Body>
    </Modal>
  );
}
