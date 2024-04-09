import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import checkAnimation from "../../assets/animation/check.json";
import Lottie from "lottie-react";

export default function ConfirmModal({ show, onHide, text, request, onSuccess, onError }) {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  const handleConfirm = async (e) => {
    setLoading(true);
    try {
      const { data } = await request();
      onSuccess(data);
      setLoading(false);
    } catch (err) {
      onError(err);
      setErrMsg(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeOutId;
    if (success && show) {
      timeOutId = setTimeout(onHide, 2000);
    }
    return () => { if (timeOutId) clearTimeout(onHide); }
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
          success ?
            <div style={{ alignSelf: 'center' }}>
              <Lottie animationData={checkAnimation} loop={false} />
            </div>
            : (
              <>
                <h5 id="CopyLinkLabel" className="text-center g-3">{text}</h5>

                <span style={{ color: 'red', marginBottom: '1rem' }}>{errMsg}</span>

                <button className={`btn btn-primary rounded-pill w-100 g-3`} onClick={handleConfirm} disabled={loading}>
                  Confirm
                </button>

                <button
                  onClick={onHide}
                  className="btn btn-close-style btn-danger btn-sm rounded-pill"
                  type="button"
                  disabled={loading}
                >
                  <i className="bi bi-x-lg" />
                </button>
              </>
            )
        }
      </Modal.Body>
    </Modal>
  );
}
