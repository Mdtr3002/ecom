import Lottie from 'lottie-react';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import openChest from '../../assets/animation/open_chest.json';
import MarketPlaceServices from '../../services/marketplace.service';
import LoginAfterWheel from '../gameInro/loginAfterWheel';
import UserService from '../../services/user.service';

export default function OpenChestPage() {
  
  const [item, setItem] = useState({name: '', imgUrl: ''})
  const [reward, setReward] = useState(false);
  const [balance, setBalance] = useState(0);
  const lottieRef = useRef();
  useEffect(() => {
    (async () => {
        const { data } = await UserService.getProfile();
        const { payload } = data;
        setBalance(payload.balance);
    })();
  }, []);
  useEffect(() => {
    lottieRef.current.stop();
  }, [])
  const onClose = () => {
    setReward(false);
  }
  return (
    <div className='wheel-wrapper-log-in countdown welcome-area box-mt'
        style={{ display: 'flex', flexDirection: 'column' }}
    //   className={`fixed z-50 inset-0 ${
    //     background ? 'bg-gdscGrey-100 bg-opacity-50' : 'bg-white'
    //   } flex justify-center items-center ${show ? 'block' : 'hidden'}`}
    >
      <div className="welcome-content">
        <h2 style={{ textAlign: 'center' }} >GDSC's Mystery Box</h2>
        <p style={{ textAlign: 'center' }} >Use your GCoin to open the box and claim collectable items</p>
      </div>
      <Lottie lottieRef={lottieRef} animationData={openChest} />
      <LoginAfterWheel prize={item.name} imgUrl={item.imgUrl} show={reward} onClose={onClose} />
      {balance < 1000 && (
        <p>You do not have enough GCoin to open the box</p>
      )}
      <button
            className="start-btn btn rounded-pill"
            style={{
              backgroundColor: "#6f42c1",
              border: 'none',
            }}
            onClick={() => {
                lottieRef.current.play();
                MarketPlaceServices.getRandomItem().then((res) => setItem({name: res.data.payload.name, imgUrl: res.data.payload.imgUrl}));
                setTimeout(async () => {
                    lottieRef.current.stop();
                    setReward(true);
            }, 4000)
            }}
          >
            Open
        </button>
    </div>
  )
}