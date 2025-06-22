import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ResponseScreen = ({ playerAnswer, setPlayerAnswer, onSubmitAnswer, score }) => {
    // Note: This component is adapted to work with Gamepage's 'playerAnswer' as a single string.
    // It cannot directly support sequence recall or bonus questions without Gamepage modifications.
    return (
        <div className="relative flex flex-col items-center justify-center h-full w-full bg-yellow-400 rounded-lg shadow-xl p-6">
            <div className="absolute top-4 right-6 text-xl font-bold text-blue-900">
                High Score: <span className="text-blue-700">{score}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-blue-900 mb-10 font-mono">Arithmemory</h1>

            <div className="flex flex-col items-center w-full max-w-md">
                <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">Your Answer:</h2>
                <div className='flex w-full max-w-sm items-center gap-2'>
                    <Input
                        type="number" // Changed to number type for math games
                        placeholder="Enter digit or expression result"
                        value={playerAnswer}
                        onChange={(e) => setPlayerAnswer(e.target.value)}
                        className="flex-grow p-4 text-center text-3xl font-bold rounded-xl border-2 border-blue-400 focus:outline-none focus:border-blue-700"
                    />
                    <Button
                        onClick={onSubmitAnswer}
                        type="submit"
                        variant="outline"
                        className="py-4 px-6 bg-purple-600 text-white font-extrabold text-lg rounded-xl shadow-lg
                                   hover:bg-purple-700 transition duration-300 transform hover:scale-105"
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};


export default ResponseScreen