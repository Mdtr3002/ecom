import React, { useLayoutEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { NOT_ENOUGH_BALANCE } from '../../config/error';
import MarketPlaceServices from '../../services/marketplace.service';

export default function PriceModal({ itemId, show, onHide, price }) {
    const [currentPrice, setCurrentPrice] = useState(price);
    const [error, setError] = useState();

    useLayoutEffect(() => setCurrentPrice(price), [price]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        (async () => {
            try {
                // console.log(itemId, currentPrice);
                await MarketPlaceServices.placeBids(itemId, currentPrice);
                onHide();
            } catch (err) {
                console.error(err.response.data.message);
                if (err.response.data.message === NOT_ENOUGH_BALANCE)
                    setError(err.response.data.message);
                else
                    setError('Unexpected Error Occurred!');
            }
        })();

    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="PriceModalLabel"
            centered 
            className="share-modal"
        >
            <Modal.Body>
                <h5 id="PriceModal" className="text-center mb-3">Set price</h5>
                <form onSubmit={handleSubmit}>
                    <input style={{ background: 'transparent', width: '100%', color: '#c2d4f8', border: 'none' }} value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} type="input" className="price-input mb-0 border border-2 p-3 rounded" />
                </form>

                <button 
                    onClick={onHide} 
                    className="btn btn-close-style btn-danger btn-sm rounded-pill" 
                    type="button"
                >
                    <i className="bi bi-x-lg" />
                </button>   
                {error && <div className="col-12 mt-4 text-danger">{error}</div>}
            </Modal.Body>
      </Modal>
    );
}
