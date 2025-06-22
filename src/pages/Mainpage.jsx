import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FaPlay } from 'react-icons/fa'

const Mainpage = () => {
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

                        <SelectTrigger>

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

                        <SelectTrigger>

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

            <div className='flex justify-center items-center'>

                <FaPlay className='bg-[#69B578] text-white w-22 h-20 pt-2 pb-2 pr-2 pl-3 rounded-2xl'/>

            </div>


        </div>
    </>
  )
}

export default Mainpage