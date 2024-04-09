import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

import $ from "jquery";
import MarketPlaceService from '../../services/marketplace.service';
import { ERROR_ITEM_EXIST } from '../../config/error';
import MarketPlaceServices from '../../services/marketplace.service';

const CreateNewContent = () => {
    const [inputTitle, setInputTitle] = useState('Macaw Bird');
    const [inputPrice, setInputPrice] = useState(5);
    const [maxPrice, setMaxPrice] = useState(10);
    const [inputImage, setInputImage] = useState('img/bg-img/17.jpg');
    const [expiredAt, setExpiredAt] = useState('2023-01-01');
    const [error, setError] = useState();
    const ImagehandleChange = (event) => {
        setInputImage(URL.createObjectURL(event.target.files[0]));
    }
    
    const selectCata = useRef();
    const state= useLocation();

    const [data, setData] = useState({});

    useEffect(() => {
        MarketPlaceServices.getItemById(state.pathname.slice(13)).then((res) => {
            setData(res.data.payload);
        });
    }, [])

    // console.log('a', data)

    useEffect(() => {
        $(selectCata.current).niceSelect();
    }, []);

    const handleCreateBids = async (e) => {
        e.preventDefault();
        try {
            const { data } = await MarketPlaceService.createBids(
                state.itemId,
                inputPrice,
                maxPrice,
                new Date(expiredAt).getTime(),
            )

            // console.log('data', data);
        } catch (err) {
            // console.log('err', err);
            if (err.response.data.message === ERROR_ITEM_EXIST) {
                setError(err.response.data.message);
            }
        }
    }

    return(
        <div className="create-new-wrapper">
            <div className="container">
                <div className="row g-5 justify-content-center">
                    <div className="col-12 col-lg-8">
                        
                        {/* Create New Form */}
                        <div className="create-new-form border shadow-sm p-4 p-sm-5">
                            <h2 className="mb-4">Create New Bids</h2>
                            
                            <Form onSubmit={handleCreateBids}>
                                <div className="row align-items-center">
                                    {/* Upload Files */}
                                    {/* <div className="col-12">
                                        <Form.Group className="mb-4">
                                            <Form.Label className="mb-2 fz-16">Upload Files</Form.Label>
                                            <Form.Control 
                                                className="bg-transparent" 
                                                id="formFileMultiple" 
                                                type="file" 
                                                multiple 
                                                onChange={ ImagehandleChange }
                                            />
                                        </Form.Group>
                                    </div> */}

                                    {/* Title */}
                                    <div className="col-12">
                                        <Form.Group className="mb-4">
                                            <Form.Label className="mb-2 fz-16">Title</Form.Label>
                                            <Form.Control id="title" type="text" value={inputTitle} onChange={e => setInputTitle(e.target.value)} />
                                        </Form.Group>
                                    </div>

                                    {/* Checkbox */}
                                    {/* <div className="col-12">
                                        <Form.Group className="mb-4">
                                            <Form.Check
                                                inline 
                                                type="radio" 
                                                label="Fixed price" 
                                                id="fixedPrice" 
                                                name="inlineRadioOptions" 
                                                defaultChecked
                                            />

                                            <Form.Check
                                                inline 
                                                type="radio" 
                                                label="Unlock Purchased" 
                                                id="UnlockPurchased" 
                                                name="inlineRadioOptions"
                                            />

                                            <Form.Check
                                                inline 
                                                type="radio" 
                                                label="Open for bids" 
                                                id="Openforbids" 
                                                name="inlineRadioOptions"
                                            />
                                        </Form.Group>
                                    </div> */}

                                    {/* Description */}
                                    <div className="col-12">
                                        <Form.Group className="mb-4">
                                            <Form.Label className="mb-2 fz-16">Owner Notes</Form.Label>
                                            <Form.Control id="description" as="textarea" placeholder="Write short description" />
                                        </Form.Group>
                                    </div>

                                    {/* Price */}
                                    <div className="col-12 col-md-6">
                                        <Form.Group className="mb-4">
                                            <Form.Label className="mb-2 fz-16">Floor Price</Form.Label>
                                            <Form.Control id="price" type="text" value={inputPrice} onChange={e => setInputPrice(e.target.value)} />
                                        </Form.Group>
                                    </div>
                                    
                                    <div className="col-12 col-md-6">
                                        <Form.Group className="mb-4">
                                            <Form.Label className="mb-2 fz-16">Max Price</Form.Label>
                                            <Form.Control id="price" type="text" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                                        </Form.Group>
                                    </div>

                                    {inputPrice >= maxPrice && <div className="col-12 mb-4 text-danger">Max Price must be larger than Floor Price</div>}

                                    {/* Catagory */}
                                    {/* <div className="col-12 col-md-6">
                                        <h5>Categories</h5>
                                        <select ref={selectCata} className="filter-select bg-gray w-100 mb-4">
                                            <option value={1}>Art</option>
                                            <option value={2}>Cards</option>
                                            <option value={3}>Collectibles</option>
                                            <option value={4}>Domain</option>
                                            <option value={5}>Music</option>
                                        </select>
                                    </div> */}

                                    {/* Starting Date */}

                                    {/* Ending Date */}
                                    <div className="col-12 col-sm-6">
                                        <Form.Group className="mb-4">
                                            <Form.Label className="mb-2 fz-16">Ending Date</Form.Label>
                                            <Form.Control id="endingDate" type="date" value={expiredAt} onChange={e => {
                                                // console.log(e.target.value);
                                                setExpiredAt(e.target.value);
                                            }} />
                                        </Form.Group>
                                    </div>
                                    
                                    {/* Submit Button */}
                                    <div className="col-12 col-md-4">
                                        <button className="btn btn-primary rounded-pill w-100" type="submit">
                                            Create
                                        </button>
                                    </div>
                                </div>

                                {error && <div className="col-12 mb-4 text-danger">{error}</div>}
                            </Form>

                        </div>
                    </div>

                    <div className="col-12 col-sm-8 col-lg-4">
                        {/* Preview Card */}
                        <div className="item-card card shadow-sm">
                            <div className="card-body">
                                <div className="img-wrap">
                                    <img src={data.imgUrl} alt="" />

                                    {/* Badge */}
                                </div>

                                {/* Others Info */}
                                {/* <div className="row gx-2 align-items-center mt-3">
                                    <div className="col-8">
                                        <span className="d-block fz-12">
                                            <i className="bi bi-arrow-up" />
                                            Floor price {inputPrice} G
                                        </span>
                                    </div>
                                    <div className="col-4 text-end">
                                        <button className="wishlist-btn" type="button">
                                            <i className="bi" />
                                        </button>
                                    </div>
                                </div> */}

                                {/* Meta Info */}
                                <div className="row gx-2 align-items-center mt-2">
                                    <div className="col-8" style={{ width: '100%' }}>
                                        <div className="name-info d-flex align-items-center">
                                            {/* <div className="author-img position-relative">
                                                <img className="shadow" src="img/bg-img/u1.jpg" alt="" />
                                                <i className="bi bi-check position-absolute bg-success" />
                                            </div> */}
                                            <div className="name-author">
                                                <div style={{ fontSize: '24px' }} className="name d-block hover-primary text-truncate" >
                                                    {data.name}
                                                </div>
                                                <div style={{ fontSize: '16px' }} className="author d-block hover-primary text-truncate" >
                                                    Description: {data.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-4">
                                        <div className="price text-end">
                                            <span className="fz-12 d-block">Current Bid</span>
                                            <h6 className="mb-0">
                                                {inputPrice} G
                                            </h6>
                                        </div>
                                    </div> */}
                                </div>

                                {/* Button */}
                                {/* <div className="row gx-2 align-items-center mt-3">
                                    <div className="col-6">
                                        <Link className="btn btn-primary btn-sm rounded-pill" to="#">
                                            Place bid
                                        </Link>
                                    </div>
                                    <div className="col-6 text-end">
                                        <Link className="btn btn-minimal btn-sm hover-primary" to="#">
                                            <i className="bi bi-activity me-1" />
                                            Activity
                                        </Link>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        {/* <h5 className="mb-0 mt-3 text-center">
                            <i className="bi bi-eye me-1" />
                            Live Preview
                        </h5> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewContent;
