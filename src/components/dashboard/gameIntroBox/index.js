import { useState } from 'react';
import Chart from 'react-apexcharts';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';

const gameIntroBox = (props) => {
    const {title, subTitle, imgSrc, link, rev} = props;

    return(
        <>
            <div className="col-12 col-sm-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className={`d-flex ${rev ? 'flex-row-reverse' : ''} align-items-center justify-content-between`}>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <div className="mb-2">
                                        <h5 className='mb-0'>
                                            {title}
                                        </h5>
                                        <span>
                                            {subTitle}
                                        </span>
                                    </div>
                                    <Link to={link} className="play-btn btn btn-primary rounded-pill" style={{padding: '4px 16px'}}>Play</Link>
                                </div>
                                <img src={imgSrc} alt="GDSC Quiz" style={{width: '90px'}} />
                                {/* <Chart 
                                    className="ms-auto" 
                                    options={chartData.options} 
                                    series={chartData.series} 
                                    type="line" 
                                    width={100} 
                                    height={42}
                                /> */}
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}

export default gameIntroBox;