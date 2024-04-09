import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import checkAnimation from "../../assets/animation/check.json";
import Lottie from "lottie-react";

export default function StartBidModal({
  show,
  onHide,
  request,
  onSuccess,
  onError,
}) {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [value, setValue] = useState(0);

  const handleConfirm = async (e) => {
    setLoading(true);
    try {
      const { data } = await request();
      onSuccess(data);
      setLoading(false);
    } catch (err) {
      onError(err);
      setErrMsg(err.message)
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeOutId;
    if (success && show) {
      timeOutId = setTimeout(onHide, 2000);
    }
    return () => {
      if (timeOutId) clearTimeout(onHide);
    };
  }, [success, show, onHide]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="CopyLinkLabel"
      centered
      className="share-modal"
    >
      <Modal.Body>
        {
          <>
            <h5 id="CopyLinkLabel" className="text-center mb-3">
              Start Bidding
            </h5>
            <div className="row">
              <div className="col-2 d-flex align-items-center">
                {" "}
                <p className="m-0">Phone</p>{" "}
              </div>
              <div className="col-10">
                <input
                  className="form-control bg-gray border-0"
                  type="number"
                  value={value}
                  onChange={(e) => e.preventDefault()}
                  name="phone"
                  disabled
                  placeholder="Phone"
                />
              </div>

            </div>

              <button
                className={`btn btn-primary rounded-pill w-100 mt-3`}
                onClick={handleConfirm}
                disabled={loading}
              >
                Start Bidding Now
              </button>{" "}
            <span style={{ color: "red", marginBottom: "1rem" }}>{errMsg}</span>
            <button
              onClick={onHide}
              className="btn btn-close-style btn-danger btn-sm rounded-pill"
              type="button"
              disabled={loading}
            >
              <i className="bi bi-x-lg" />
            </button>
          </>
        }
      </Modal.Body>
    </Modal>
  );
}
