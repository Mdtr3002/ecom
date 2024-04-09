import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import CollectionData from "../../data/collection/collection.json";
import MarketPlaceServices from '../../services/marketplace.service';
import _ from "lodash";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_COLLECTION } from '../../action-types';
import { useMemo } from 'react';

const CollectionContent = () => {
    const [count, setCount] = useState(9);
    const [noMorePost, setNoMorePost] = useState(false);
    const [collection, setCollection] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        MarketPlaceServices.getAllMarketPlaceItem().then((res) => {
            setCollection(collectionReduce(res.data.payload));
        }).catch((err) => {
           // console.log('Error in get marketplace items ',err);
        })
    },[]);

    useEffect(() => {
        dispatch({type: UPDATE_COLLECTION, payload: collection});
    }, [collection])

    // console.log('test', collection);

    const collectionReduce = (data) => _.reduce(data,(collectionList, item) => {
        (collectionList[item.collectionName] || (collectionList[item.collectionName] = [])).push(item);
        // console.log(collectionList);
        return collectionList;
    }, {});

    const handleLoadMore = () => {
        setCount(count + 3);
        if(count >= Object.keys(collection).length) {
            setNoMorePost(true);
        }
    }
    const CollectionCards = Object.keys(collection).map((elem, index) => (
        <div className="col-12 col-sm-6 col-lg-4" key={index} >
            <div className="catagory-card card shadow-sm">
                <div className="card-body">
                    <div className="row gx-1">
                        {/* <div className="col-6">
                            <img className="rounded" src={collection[elem][0].itemId.imgUrl} alt={elem.name} />
                            <img className="rounded" src={collection[elem][0].itemId.imgUrl} alt={elem.name} />
                        </div>
                        <div className="col-6">
                            <img className="rounded" src={collection[elem][0].itemId.imgUrl} alt={elem.name} />
                            <img className="rounded" src={collection[elem][0].itemId.imgUrl} alt={elem.name} />
                        </div> */}
                        <img className="rounded" src={collection[elem][0].itemId.imgUrl} alt={elem.name} />
                    </div>

                    <div className="row gx-2 mt-3">
                        <div className="col-8">
                            <h5 className="mb-0 d-flex align-items-center">
                                {elem}
                                <span className="badge rounded-pill bg-primary ms-2">
                                  {/* {collection && collection[elem].length} */}
                                  {collection[elem].length} left
                                </span>
                            </h5>
                        </div>
                        <div className="col-4 text-end">
                            <Link className="btn btn-minimal hover-primary" to={`/collection/bidding/${elem}`} >
                                View
                                <i className="ms-1 bi bi-arrow-right" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))

    return(
        <div className="collection-wrapper">
            <div className="container">
                <div className="row g-4">
                    {CollectionCards}
                </div>
            </div>

            <div className="container">
                <div className="text-center mt-70">
                    <button 
                        className="btn btn-primary px-4 rounded-pill" 
                        onClick={() => handleLoadMore()} 
                        disabled={noMorePost ? "disabled" : null}
                    >
                        {noMorePost ? 
                        (<span className="d-flex align-items-center">
                            No Items Here
                            <i className="ms-2 bi bi-emoji-frown" />
                        </span>) : 
                        (<span className="d-flex align-items-center">
                            View More Items
                            <i className="ms-2 bi bi-arrow-repeat" />
                        </span>)}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CollectionContent;
