import React, { useMemo } from 'react'

import Restart from './icons/Restart'
import { QuizContext } from '../store/QuizContext'

const Result = () => {
	const { score, restart } = React.useContext(QuizContext)
	return useMemo(
		() => (
			<div className='quiz_container result'>
				<h2>Try Again!</h2>
				<h1>
					your score was <span>{score}</span>
				</h1>
				<button className='restart quiz-btn' onClick={restart}>
					<Restart />
				</button>
			</div>
		),
		[score, restart]
	)
}

export default Result
