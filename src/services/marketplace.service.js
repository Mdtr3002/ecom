import { API_URL } from "../config";
import { axios } from "../utils/custom-axios";

const getAllUserItems = async () => await axios.get(`${API_URL}private/items`);

const getUserItemById = async (itemId) => await axios.get(`${API_URL}public/items/${itemId}`);

const receiveItem = (itemId) => axios.post(`${API_URL}private/received`, {itemId});

// const getItemById = async (itemId) => await axios.get(`${API_URL}public/items/${itemId}`);

// const createBids = (itemId, minPrice, maxPrice, expiredAt) => axios.post(`${API_URL}marketplace/private/items`, {itemId, minPrice, maxPrice, expiredAt});

// const editBids = (itemId, minPrice, maxPrice, expiredAt) => axios.patch(`${API_URL}marketplace/private/items/${itemId}`, {minPrice, maxPrice, expiredAt});

const placeBids = (marketplaceId, bidPrice) => axios.post(`${API_URL}marketplace/private/bids`, {marketplaceId, bidPrice});

const getAllMarketPlaceItem = () => axios.get(`${API_URL}marketplace/public/items`);

const getMarketPlaceCollection = (collectionName) => axios.get(`${API_URL}marketplace/public/items?collectionName=${collectionName}`);

const getMarketPlaceItemById = (itemId) => axios.get(`${API_URL}marketplace/public/items/${itemId}`);

const getAllBidItem = () => axios.get(`${API_URL}marketplace/private/bids`);

const claimBidItem = (bidId) => axios.post(`${API_URL}marketplace/private/bids/claim`, {bidId});

// const getRandomItem = () => axios.post(`${API_URL}game/private/box`)

// const getMyPublishedBids = () => {
//     console.log('meow meow meow');
//     return axios.get(`${API_URL}marketplace/private/auctioned-items`)
// };

// const getMyFollowedBids = () => axios.get(`${API_URL}marketplace/private/bids`);


const MarketPlaceServices = {
  getAllUserItems,
  getUserItemById,
  getAllMarketPlaceItem,
  getMarketPlaceItemById,
  getAllBidItem,
  placeBids,
  claimBidItem,
  receiveItem,
  getMarketPlaceCollection
};

export default MarketPlaceServices;
