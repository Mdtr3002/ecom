import React, { useMemo } from 'react'

const Quiz = ({question}) => {

  //console.log(question)
  
	return useMemo(() => {
		return (
      <div className="question">
        <img style={{height: 108}} alt="question" src={`data:image/svg+xml;utf8,${question}`} />
      </div>
		)
	}, [question])
}

export default Quiz
