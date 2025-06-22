import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Gamepage = () => {

    const [currentNumber, setCurrentNumber] = useState('');
    const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
    const [questions, setQuestions] = useState([]);

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

        setQuestions(questionArray);
        
        let timeout = setTimeout(() => {
            
            setCurrentNumber(questionArray[currentNumberIndex])
            setCurrentNumberIndex(prevIndex => prevIndex + 1);

        }, 2000);

        return () => clearTimeout(timeout);

    }, []);

  return (


    <div>

        <h1>{currentNumber}</h1>
        <Button onClick={startGame}>Start!</Button>

    </div>


  )





}

export default Gamepage