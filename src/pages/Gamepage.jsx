import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import StartScreen from '../components/StartScreen';
import SequenceScreen from '../components/SequenceScreen';
import ResponseScreen from '../components/ResponseScreen';
import ResultScreen from '../components/ResultScreen';

const Gamepage = () => {

    /*  STATES  */
    // Game States: Start, displaySequence, playerResponse, win, fail
    const [gameState, setGameState] = useState('start'); // Stages of the game
    const [currentNumberIndex, setCurrentNumberIndex] = useState(0); // Index of the number within the array
    const [questionSet, setQuestionSet] = useState([]); // Array of number for questions
    const [playerAnswer, setPlayerAnswer] = useState('') // Player input
    const [highScore, setHighScore] = useState(0); // Game's Score
    const [result, setResult] = useState(0);

    // Bonus Question States
    const [bonusQuestion, setBonusQuestion] = useState('');
    const [bonusAnswer, setBonusAnswer] = useState('');


    /*  FUNCTIONS  */

    // Function that evaluates generated expressions
    const evaluateExpressions = (expression) => {
        try {

            // Splitting the expression by + or - operators
            // Adding those numbers over an array, and converts the string into a float
            const numberParts = expression.split(/([+\-])/).map(part => part.trim());
            let firstNumber = parseFloat(numberParts[0]);
            let result;

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

    // Function for generating a BONUS question (optional)
    const generateBonusQuestion = useCallback(() => {

        let questionType = Math.floor(Math.random() * 3);

        let index1 = Math.floor(Math.random() * questionSet.length);
        let index2;

        do {
            index2 = Math.floor(Math.random() * questionSet.length);
        } while (index1 === index2);

        const num1 = questionSet[index1];
        const num2 = questionSet[index2];

        // Additon
        if (questionType === 0) {

            setBonusQuestion(`What is digit #${index1 + 1} plus digit #${index2 + 1}?`);
            setBonusAnswer(num1 + num2);

        } else if (questionType === 1) {

            setBonusQuestion(`What is digit #${index1 + 1} minus digit #${index2 + 1}?`);
            setBonusAnswer(num1 - num2);

        } else if (questionType === 2) {

            setBonusQuestion(`What is digit #${index1 + 1} times digit #${index2 + 1}?`);
            setBonusAnswer(num1 * num2);

        }


    }, [questionSet])

    // Function to check the answer from the player
    const checkPlayerInput = () => {

        // Variable to store the current index in the question array
        let playerIndex = 0;

        // Convert player's input to a String
        const stringedAnswer = parseFloat(playerAnswer);

        // If the answer is correct, but we haven't reached the end of the array
        if (!isNaN(stringedAnswer) && stringedAnswer === questionSet[playerIndex] && playerIndex < questionSet.length) {

            // Increment the index
            playerIndex++;

        // If the answer is incorrect
        } else if (!isNaN(stringedAnswer) && stringedAnswer !== questionSet[playerIndex]) {

            // Set the state to lose
            setResult(`Incorrect! The correct answer ws ${questionSet[playerIndex]}`);
            setGameState("result");

        // If we reached the end of the array
        } else if (!isNaN(stringedAnswer) && stringedAnswer === questionSet[playerIndex] && playerIndex === questionSet.length) {

            // Set the state to win and increase high score
            setResult("Correct!");
            setGameState("result");
            setHighScore(prevHighScore => prevHighScore + 1);

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
        setHighScore(0);


    }, [generateQuestion]);

    // Render our screen depending on the game state
    const renderGameScreen = () => {

        switch(gameState) {
            case 'start':
                return (
                    <StartScreen onStartGame={startGame} />
                );
            case 'displaySequence':
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
                    />
                );
            case 'result':
                return (
                    <ResultScreen
                        feedback={result}
                        onRestartGame={startGame}
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