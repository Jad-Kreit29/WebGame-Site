import React from 'react'
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'



const ResponseScreen = ({ setPlayerAnswer, playerAnswer, onSubmitAnswer, score, playerIndex, sequenceLength, inputErrorMessage }) => {

  document.body.style = 'background: #8833B2;';
  return (
    <>
      {/* Top Header */}
      <div className='absolute inset-x-0 top-0 bg-black w-full'>
        <h1 className="flex justify-center items-center text-6xl text-white py-6 font-jersey">ArithMemory</h1>
      </div>

      {/* Main Container */}
      <div className="relative flex flex-col items-center justify-center h-full w-full bg-[#FFB800] shadow-xl p-6">
        {/* High Score Container */}
        <div className="absolute top-4 right-6 text-xl font-geologica font-bold text-[#151515]">
          High Score: <span className="text-[#6494AA]">{score}</span>
        </div>

        {/* Input Space */}
        <div className="flex flex-col items-center w-full max-w-md">
          {/* Indicator for current sequence number */}
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Answer for Digit {playerIndex + 1}:
          </h2>
          <div className='flex w-full max-w-sm items-center gap-2'>
            <Input
              type="number"
              placeholder="Enter digit or expression result"
              value={playerAnswer}
              onChange={setPlayerAnswer}
              className="flex-grow p-4 text-center text-3xl font-bold rounded-xl border-2 border-blue-400 focus:outline-none focus:border-blue-700"
            />
            <Button
              onClick={onSubmitAnswer}
              type="submit"
              variant="outline"
              className="py-4 px-6 bg-[#6494AA] text-white font-extrabold text-lg rounded-xl shadow-lg
                         hover:bg-[#517889] transition duration-300 hover:text-white transform hover:scale-105"
            >
              Submit
            </Button>
          </div>
          {inputErrorMessage && (
            <p className="text-red-600 mt-2 font-semibold text-lg text-center bg-white p-2 rounded-md shadow-md">
              {inputErrorMessage}
            </p>
          )}
        </div>
      </div>

        {/* Bottom Footer */}
        <div className='absolute inset-x-0 bottom-0 bg-black w-full'>
            
            <div className='py-6 text-white'>

                <h1 className="flex justify-center items-center text-2xl text-white font-josefin font-semibold">Share YOUR score!</h1>

                <div className='flex justify-center items-center gap-x-6 text-3xl mt-5'>
                    <FaFacebook className='duration-200 ease-in-out hover:text-gray-300' />
                    <FaXTwitter className='duration-200 ease-in-out hover:text-gray-300' />
                    <FaInstagram className='duration-200 ease-in-out hover:text-gray-300' />

                </div>

            </div>

        </div>
    </>
  );
};

export default ResponseScreen