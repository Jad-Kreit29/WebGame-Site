import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { FaPlay } from 'react-icons/fa'

const StartScreen = ({ onStartGame }) => {
  return (
    <>
        {/* Main Container */}
        <div>

            <h1>
                This is where you test your math skills! Choose an option below!
            </h1>
            
            <br />

            {/* Game Option Selections */}
            <div className='flex justify-center items-center space-x-4 py-15'>

                {/* Level Select */}
                <div>

                    <p>Level:</p>

                    <Select>

                        <SelectTrigger className='w-[140px]'>

                            <SelectValue placeholder="Select a level"/>

                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value = "easy">Easy</SelectItem>
                            <SelectItem value = "medium">Medium</SelectItem>
                            <SelectItem value = "hard">Hard</SelectItem>
                        </SelectContent>

                    </Select>

                </div>

                {/* Digit Type Select */}

                <div>

                    <p>Question Type:</p>

                    <Select>

                        <SelectTrigger className='w-[200px]'>

                            <SelectValue placeholder="Select the question Type"/>

                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value = "digits">Only Digits</SelectItem>
                            <SelectItem value = "expressions">Expressions</SelectItem>
                            <SelectItem value = "digits_expressions">Digits & Expressions</SelectItem>
                        </SelectContent>

                    </Select>

                </div>


            </div>

            {/* Start Button */}
            <div className='flex justify-center items-center'>

                <FaPlay onClick={onStartGame} className='bg-[#69B578] text-white w-22 h-20 pt-3 pb-3 pr-3 pl-4 rounded-2xl'/>

            </div>

        </div>

    </>
  )
}

export default StartScreen