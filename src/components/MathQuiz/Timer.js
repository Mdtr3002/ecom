import React, { useEffect, useContext } from 'react'

const Timer = ({startTime, endTime, setEndTime, resetTime, timer}) => {
  const width = (endTime - startTime) / timer * 100;
	useEffect(() => {
		const interval = setInterval(() => {
			setEndTime(new Date().getTime(0));
		}, 20)

		return () => clearInterval(interval)
	}, [setEndTime, resetTime])

	return (
		<>
			<div className='timer'>
				<div
					className='clock'
					style={{
						width: `${width}%`
					}}
				></div>
			</div>
		</>
	)
}

export default Timer
