import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import StartScreen from '../components/StartScreen';
import SequenceScreen from '../components/SequenceScreen';
import ResponseScreen from '../components/ResponseScreen';
import ResultScreen from '../components/ResultScreen';
import ResultScreenFail from '../components/ResultScreenFail';

const Gamepage = () => {

    /*  STATES  */
    // Game States: Start, displaySequence, playerResponse, result, result_fail
    const [gameState, setGameState] = useState('start'); // Stages of the game
    const [currentNumberIndex, setCurrentNumberIndex] = useState(0); // Index of the number within the array
    const [questionSet, setQuestionSet] = useState([]); // Array of number for questions
    const [playerAnswer, setPlayerAnswer] = useState('') // Player input
    const [highScore, setHighScore] = useState(0); // Game's Score
    const [result, setResult] = useState(0);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [inputErrorMessage, setInputErrorMessage] = useState('');

    /*  FUNCTIONS  */

    // Function that evaluates generated expressions
    const evaluateExpressions = (expression) => {
        try {

            // Splitting the expression by + or - operators
            // Adding those numbers over an array, and converts the string into a float
            const numberParts = expression.split(/([+\-])/).map(part => part.trim());
            let firstNumber = parseFloat(numberParts[0]);
            let result;

            if (!isNaN(parseFloat(expression)) && isFinite(expression) && !expression.includes('+') && !expression.includes('-')) {
                return parseFloat(expression); // This handles single digits correctly
            }

            // Loop through every part of the expression.
            for (let i = 1; i < numberParts.length; i+=2) {

                // Store the current operator and the next number of the expression (as a float)
                const currentOperator = numberParts[i];
                const nextNumber = parseFloat(numberParts[i + 1]);

                if (currentOperator === "+") {

                    result = firstNumber + nextNumber;

                } else if (currentOperator === "-") {

                    result = firstNumber - nextNumber;

                }

            }

            return result;

        } catch (e) {

            // Return an error if something goes wrong with evaluating the expression
            console.error("There was an issue evaluating the expression:", expression, e);
            return NaN;

        }

    };

    // Function that generates a random single number or expression
    const generateQuestion = useCallback((gameMode) => {
        
        // Choosing only to show simple digit problems
        if (gameMode == "digits") {

            // Generates a random number from 1 - 20
            return String(Math.floor(Math.random() * 20) + 1);

        // Choosing only to show expression problems    
        } else if (gameMode == "expressions") {

            // Create two numbers and an operator to make an expression
            const num1 = Math.floor(Math.random() * 10) +1;
            const num2 = Math.floor(Math.random() * 10) +1;
            const operator = Math.random() < 0.5 ? '+' : '-';
            return `${num1} ${operator} ${num2}`

        // Choosing both types of problems together
        } else if (gameMode == "digits_expressions") {

            const choice = Math.random();

            if (choice < 0.7) { // 70% = simple digit

                return String(Math.floor(Math.random() * 20) + 1);

            } else { // 30% = expression

                const num1 = Math.floor(Math.random() * 10) +1;
                const num2 = Math.floor(Math.random() * 10) +1;
                const operator = Math.random() < 0.5 ? '+' : '-';
                return `${num1} ${operator} ${num2}`

            }

        }
        
    }, [questionSet]);

    // Function to check the answer from the player
    const checkPlayerInput = () => {

        // Convert the player input to a digit
        const parsedPlayerAnswer = parseFloat(playerAnswer);
        const correctAnswer = questionSet[playerIndex].value;

        // Check if the player input is not valid!
        if (isNaN(parsedPlayerAnswer)) {
            setInputErrorMessage("Please enter a valid number or expression result.");
            return;
        }

        setInputErrorMessage('');
        
        // If the answer is correct
        if (parsedPlayerAnswer === correctAnswer) {

            // If it's the last number in the sequence
            if (playerIndex === questionSet.length - 1) {
                setResult("Correct!");
                setHighScore(prevHighScore => prevHighScore + 1);
                setGameState("result");
            } else {
                // If there are more numbers to answer
                setPlayerIndex(prevIndex => prevIndex + 1);
                setPlayerAnswer(''); // Clear input for next question
            }

        } else {

            // If the answer is incorrect
            setResult(`Incorrect! The correct answer was ${correctAnswer}.`);
            setGameState("result_fail");

        }
    };

    // MAIN FUNCTION
    const startGame = useCallback((gameLevel, gameMode) => {

        // Create an array that hold our number sequence, with the size depending on the difficulty selected.
        const questionArray = Array.from({ length: gameLevel }, () => generateQuestion(gameMode));

        // Convert our numbers from the array into strings to display
        const stringedNumbers = questionArray.map(numStr => ({

            display: numStr,
            value: evaluateExpressions(numStr) // Evaluating expressions appropriately

        }));
        setGameState('displaySequence');
        setQuestionSet(stringedNumbers);
        setCurrentNumberIndex(0);
        setPlayerAnswer('');
        setPlayerIndex(0);
        setInputErrorMessage('');
        

    }, [generateQuestion]);

    // Render our screen depending on the game state
    const renderGameScreen = () => {
    switch(gameState) {
      case 'start':
        return (
          <StartScreen onStartGame={startGame} />
        );
      case 'displaySequence':
        document.body.style.background = '#8833B2'; // Maintain consistent background as per original
        return (
          <SequenceScreen
            number={currentNumberIndex < questionSet.length ? questionSet[currentNumberIndex].display : null}
            score={highScore}
          />
        );
      case 'playerResponse':
        return (
          <ResponseScreen
            playerAnswer={playerAnswer}
            setPlayerAnswer={(e) => setPlayerAnswer(e.target.value)}
            onSubmitAnswer={checkPlayerInput}
            score={highScore}
            playerIndex={playerIndex} // Pass current player index
            sequenceLength={questionSet.length} // Pass total length of sequence
            inputErrorMessage={inputErrorMessage}
          />
        );
      case 'result':
        return (
          <ResultScreen
            onRestartGame={() => setGameState('start')} // Restart by going to start screen
            score={highScore}
          />
        );
      case 'result_fail':
        return (
            <ResultScreenFail 
            feedback={result}
            onRestartGame={() => {
                setGameState('start');
                setHighScore(0);
            }} // Restart by going to start screen
            score={highScore}
            />
        )

      default:
        return null;
    }
  };

    // Using React Hook to display our number sequence from our array
    useEffect(() => {

        let timeout;

        // If we are in the Display Sequence state and we haven't reached the end of our array
        if (gameState === "displaySequence" && currentNumberIndex < questionSet.length) {

            // Create a 2 second loop that slowly increments the index of our array.
            timeout = setTimeout(() => {

                setCurrentNumberIndex(previousIndex => previousIndex + 1);

            }, 2000);

        // Once we have displayed all numbers, we set the state to allow the player to recall the sequence
        } else if (gameState === "displaySequence" && currentNumberIndex === questionSet.length) {

            setGameState('playerResponse')
        }

        // Close out our timeout.
        return () => clearTimeout(timeout);

    }, [gameState, currentNumberIndex, questionSet]);

    return (

        <div className='flex flex-col items-center justify-center min-h-screen'>

            {renderGameScreen()}

        </div>

    )

}

export default Gamepage