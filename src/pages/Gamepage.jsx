import React from 'react'
import { useState, useEffect, useCallback } from 'react'

const Gamepage = () => {



    // Function that generates a simple number
    const generateQuestion = useCallback(() => {
        
        // Generates a random number from 1 - 20
        return String(Math.floor(Math.random() * 20) + 1);
        
    }, []);
    
    // Arrays holding our values
    const questionArray = Array.from({ length:3 }, generateQuestion);
    const answerArray= [];


    // Main method
    const startGame = useCallback(() => {

        for (let i = 0; i < questionArray.length; i++) {

            


        }




    }, [generateQuestion]);

  return (


    <div>

        <h1></h1>

        <input>
            
        </input>

    </div>


  )





}

export default Gamepage