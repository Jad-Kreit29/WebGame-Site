import React from 'react'
import { FaCheck } from 'react-icons/fa';

const ResultScreen = ({ score, onRestartGame }) => {
    
  document.body.style = 'background: #69B578;';

  return (
    
    <>
          {/* Game Title */}
          <h1 className="flex justify-center items-center text-6xl text-white mb-6 font-jersey">ArithMemory</h1>

          <div className="flex flex-col items-center justify-center p-6 bg-[#F2F1F1] rounded-lg shadow-xl m-4 w-full max-w-md text-center">
            <FaCheck className='text-9xl text-[#69B578]'/>

              <h1 className="text-[40px] font-geologica font-semibold text-black mt-2">
                  🎉 Good Job! 🎉
              </h1>

              <br />

              <p className="text-[20px] font-geologica font-semibold text-black mb-8">
                You got the sequence correct!
                <br />
                Would you like to continue?
              </p>

              <p className="text-[20px] font-geologica text-black mb-8">
                Your score is: <b>{score}</b>
              </p>

              {/* Start Button - Using inline SVG for play icon */}
              <div className='flex justify-center items-center'>
                  <svg
                      onClick={onRestartGame}
                      className='bg-[#69B578] text-white w-24 h-24 p-4 rounded-2xl cursor-pointer
                              shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-110'
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                  >
                      <path d="M8 5v14l11-7z"/>
                  </svg>
              </div>

          </div>

          <h1 className="flex justify-center items-center text-2xl text-black mb-6 font-jersey mt-3">How good is your math brain?</h1>

    </>
  )
}

export default ResultScreen