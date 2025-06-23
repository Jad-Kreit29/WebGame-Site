import React from 'react'
import { FaXmark } from 'react-icons/fa6';

const ResultScreenFail = ({ feedback, onRestartGame, score }) => {

    document.body.style = 'background: #A63D40;';

  return (

    <>

        {/* Game Title */}
        <h1 className="flex justify-center items-center text-6xl text-white mb-6 font-jersey">ArithMemory</h1>

        <div className="flex flex-col items-center justify-center p-6 bg-[#F2F1F1] rounded-lg shadow-xl m-4 w-full max-w-md text-center">
        <FaXmark className='text-9xl text-[#A63D40]'/>

            <h1 className="text-[40px] font-geologica font-semibold text-black mt-2">
                ❌ Sorry! ❌
            </h1>

            <br />

            <p className="text-[20px] font-geologica font-semibold text-black mb-8">
            {feedback} Would you like to restart?
            </p>

            <p className="text-[20px] font-geologica text-black mb-8">
              Your score WAS: <b>{score}</b>
            </p>

            <button onClick={onRestartGame} className='bg-[#F7C1C1] rounded-4xl p-3 font-geologica font-bold cursor-pointer shadow-lg hover:bg-[#d5a7a7] transition duration-300 transform hover:scale-104'>
            Restart!
            </button>

        </div>

        <h1 className="flex justify-center items-center text-2xl text-white mb-6 font-jersey">How good is your math brain?</h1>`
    </>

  )
}

export default ResultScreenFail