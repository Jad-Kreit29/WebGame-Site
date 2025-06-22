import React from 'react';
const SequenceScreen = ({ number, score }) => {
    return (
        <div className="relative flex flex-col items-center justify-center h-full w-full bg-yellow-400 rounded-lg shadow-xl p-6">
            <div className="absolute top-4 right-6 text-xl font-bold text-blue-900">
                High Score: <span className="text-blue-700">{score}</span>
            </div>
            <h1 className="text-4xl font-extrabold text-blue-900 mb-10 font-mono">Arithmemory</h1>
            <div className="flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 bg-teal-500 rounded-xl shadow-lg">
                <p className="text-white text-5xl sm:text-7xl font-extrabold select-none">
                    {number !== null ? number : "..."} {/* Added fallback for loading */}
                </p>
            </div>
            <p className="mt-8 text-2xl font-semibold text-blue-800">Memorize the sequence!</p>
        </div>
    );
};

export default SequenceScreen