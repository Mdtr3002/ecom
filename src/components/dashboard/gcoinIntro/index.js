import { useState } from 'react';
import Chart from 'react-apexcharts';
import ScrollAnimation from 'react-animate-on-scroll';
import CoinAnimation from './CoinAnimation';

const gcoinIntro = (props) => {
    const { backgroundImage } = props;

    return(
        <div className="col-12 col-xxl-6">
                <div className="card border-0 shadow-sm" style={{display: 'flex', flexDirection: 'column', backgroundImage: `url(${process.env.PUBLIC_URL}/${backgroundImage})`}}>
                    <div className="card-body p-4 pb-0">
                        <h3>{props.title}</h3>
                        <h5>GDSC Game's Official Currency:</h5>
                        <p style={{color: 'white'}}>
                        ● Acquire through participating in our games and Discord activities.
                        <br/>
                        ● Currency used in exchanging prizes.
                        <br />
                        ● Means of partaking in our Bidding activity.
                        </p>
                    </div>
                    <CoinAnimation />
                </div>
        </div>
    )
}

export default gcoinIntro;