import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SequenceScreen = ({ number, score }) => {

    document.body.style = 'background: #FFB800;';

    return (
        <>

            {/* Top Header */}
            <div className='absolute inset-x-0 top-0 bg-black w-full'>
                <h1 className="flex justify-center items-center text-6xl text-white py-6 font-jersey">ArithMemory</h1>
            </div>

            {/* Main Container */}
            <div className="relative flex flex-col items-center justify-center h-full w-full bg-yellow-400 shadow-xl p-6">

                {/* High Score Container */}
                <div className="absolute top-4 right-6 text-xl font-geologica font-bold text-[#151515]">
                    High Score: <span className="text-[#6494AA]">{score}</span>
                </div>

                {/* Number Container */}
                <div className="flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 bg-[#6494AA] rounded-xl shadow-lg">
                    <p className="text-white text-5xl sm:text-7xl font-extrabold select-none">
                        {number !== null ? number : "..."} {/* Added fallback for loading */}
                    </p>
                </div>

                <p className="mt-8 text-2xl font-bold font-geologica text-blue-800">Memorize the sequence!</p>

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

export default SequenceScreen