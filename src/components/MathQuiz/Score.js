import React, { useContext, useMemo } from 'react'


const Score = (props) => {
	const {score} = props;

	return useMemo(() => {
		return (
			<div className='score level' >
				<p style={{color: 'white', marginBottom: '0'}}>
					Score: <span>{score / 10}</span>
				</p>
			</div>
		)
	}, [score])
}

export default Score
