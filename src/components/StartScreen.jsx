import React, { useState, useEffect, useCallback } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select'

const StartScreen = ({ onStartGame }) => {
    const [gameLevel, setGameLevel] = useState(3); // Internal state for level
    const [gameMode, setGameMode] = useState('digits_expressions'); // Internal state for mode

    const handleLevelChange = (value) => {
        let level;
        if (value === "easy") level = 3;
        else if (value === "medium") level = 5;
        else if (value === "hard") level = 7;
        setGameLevel(level);
    };

    const handleModeChange = (value) => {
        setGameMode(value);
    };

    document.body.style = 'background: #FFB800;';

    return (
        <div>
            
            {/* Game Title */}
            <h1 className="flex justify-center items-center text-6xl text-white mb-6 font-jersey">ArithMemory</h1>

            <div className="flex flex-col items-center justify-center p-6 bg-[#F2F1F1] rounded-lg shadow-xl m-4 w-full max-w-md text-center">
                <p className="text-[20px] font-geologica font-semibold text-black mb-8">
                    Train your brain to remember well and think fast!
                    <br /> <br />
                    Memorize sequences of numbers and answer questions about them in the end!
                    <br /><br />
                    How much can you score?
                </p>

                <p className='text-[12px] font-geologica font-semibold text-black mb-8'>
                    Default Settings: Level - Easy | Question Type - Digits & Expressions
                </p>

                {/* Game Option Selections */}
                <div className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 py-2 w-full'>

                    {/* Level Select */}
                    <div className="w-full sm:w-auto">
                        <p className="text-lg font-geologica font-semibold text-black mb-2">Level</p>
                        <Select onValueChange={handleLevelChange}>
                            <SelectTrigger className='w-full sm:w-[140px]'>
                                <SelectValue placeholder="Select a level"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="easy">Easy</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Question Type Select */}
                    <div className="w-full sm:w-auto">
                        <p className="text-lg font-geologica font-semibold text-black mb-2">Question Type</p>
                        <Select onValueChange={handleModeChange}>
                            <SelectTrigger className='w-full sm:w-[220px]'>
                                <SelectValue placeholder="Select the question Type"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="digits">Only Digits</SelectItem>
                                <SelectItem value="expressions">Expressions</SelectItem>
                                <SelectItem value="digits_expressions">Digits & Expressions</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Start Button - Using inline SVG for play icon */}
                <div className='flex justify-center items-center mt-8'>
                    <svg
                        onClick={() => onStartGame(gameLevel, gameMode)}
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

        </div>
    );
};


export default StartScreen