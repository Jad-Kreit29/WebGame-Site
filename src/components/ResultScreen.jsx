import React from 'react'
import { FaPlay } from 'react-icons/fa'

const ResultScreen = ({ feedback, score, onRestartGame }) => {
  return (
    <div>

        <h2 className={`text-3xl font-bold mb-6 ${feedback.includes('Correct') ? 'text-green-300' : 'text-red-400'}`}>
            {feedback}
        </h2>

        {/* Start Button */}
        <div className='flex justify-center items-center'>

            <FaPlay onClick={onRestartGame} className='bg-[#69B578] text-white w-22 h-20 pt-3 pb-3 pr-3 pl-4 rounded-2xl'/>

        </div>


    </div>
  )
}

export default ResultScreen