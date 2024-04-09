import React, { useContext, useMemo } from 'react'

import Right from './icons/Right'
import Wrong from './icons/Wrong'

const Answer = ({checkAnswer}) => {
	return useMemo(() => {
		return (
			<div className='answer'>
				<button className='right quiz-btn' onClick={() => checkAnswer(true)}>
					<Right />
				</button>
				<button className='wrong quiz-btn' onClick={() => checkAnswer(false)}>
					<Wrong />
				</button>
			</div>
		)
	}, [checkAnswer])
}

export default Answer
