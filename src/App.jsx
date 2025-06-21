import React, { useState, useEffect, useCallback } from 'react';

// Import actual Shadcn UI components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const App = () => {
  // Game states: 'start', 'showingNumbers', 'question', 'result'
  const [gameState, setGameState] = useState('start');
  const [numbersShown, setNumbersShown] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Function to evaluate simple expressions like "5-3"
  // Replaced eval with a safer custom parser
  const evaluateExpression = (expression) => {
    try {
      // Split the expression by operators (+ or -)
      const parts = expression.split(/([+\-])/).map(part => part.trim());
      let result = parseFloat(parts[0]);

      for (let i = 1; i < parts.length; i += 2) {
        const operator = parts[i];
        const nextNumber = parseFloat(parts[i + 1]);

        if (operator === '+') {
          result += nextNumber;
        } else if (operator === '-') {
          result -= nextNumber;
        }
      }
      return result;
    } catch (e) {
      console.error("Error evaluating expression:", expression, e);
      return NaN; // Indicate an error
    }
  };

  // Function to generate random numbers or simple expressions
  const generateRandomNumberOrExpression = useCallback(() => {
    const type = Math.random();
    if (type < 0.7) { // 70% chance of a single number
      return String(Math.floor(Math.random() * 20) + 1); // Number between 1 and 20
    } else { // 30% chance of a simple expression
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;
      const operator = Math.random() < 0.5 ? '+' : '-';
      return `${num1} ${operator} ${num2}`;
    }
  }, []);

  // Function to start the game
  const startGame = useCallback(() => {
    const newNumbers = Array.from({ length: 3 }, generateRandomNumberOrExpression);
    // Store the raw expressions/numbers for display, and their evaluated values
    const evaluatedNumbers = newNumbers.map(numStr => ({
      display: numStr,
      value: evaluateExpression(numStr)
    }));

    setNumbersShown(evaluatedNumbers);
    setCurrentNumberIndex(0);
    setGameState('showingNumbers');
    setFeedbackMessage('');
    setUserAnswer('');
  }, [generateRandomNumberOrExpression]);

  // Effect for showing numbers sequentially
  useEffect(() => {
    let timeout;
    if (gameState === 'showingNumbers' && currentNumberIndex < numbersShown.length) {
      // Display each number for 2 seconds
      timeout = setTimeout(() => {
        setCurrentNumberIndex(prevIndex => prevIndex + 1);
      }, 2000);
    } else if (gameState === 'showingNumbers' && currentNumberIndex === numbersShown.length) {
      // All numbers shown, transition to question phase
      setTimeout(() => { // Small delay before generating question
        generateQuestion();
        setGameState('question');
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [gameState, currentNumberIndex, numbersShown]); // Added numbersShown as dependency

  // Function to generate a random question
  const generateQuestion = useCallback(() => {
    const questionTypes = [
      'sum', 'difference', 'recall'
    ];
    const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    let q, ans;

    if (selectedType === 'recall') {
      const index = Math.floor(Math.random() * numbersShown.length);
      q = `What is the ${index + 1}${getOrdinalSuffix(index + 1)} number?`;
      ans = numbersShown[index].value;
    } else {
      let index1 = Math.floor(Math.random() * numbersShown.length);
      let index2;
      do {
        index2 = Math.floor(Math.random() * numbersShown.length);
      } while (index1 === index2); // Ensure indices are different for operations

      const num1Val = numbersShown[index1].value;
      const num2Val = numbersShown[index2].value;

      if (selectedType === 'sum') {
        q = `What is the ${index1 + 1}${getOrdinalSuffix(index1 + 1)} number plus the ${index2 + 1}${getOrdinalSuffix(index2 + 1)} number?`;
        ans = num1Val + num2Val;
      } else { // difference
        q = `What is the ${index1 + 1}${getOrdinalSuffix(index1 + 1)} number minus the ${index2 + 1}${getOrdinalSuffix(index2 + 1)} number?`;
        ans = num1Val - num2Val;
      }
    }
    setQuestion(q);
    setCorrectAnswer(ans);
  }, [numbersShown]);

  // Helper for ordinal suffix (e.g., 1st, 2nd, 3rd)
  const getOrdinalSuffix = (i) => {
    const j = i % 10,
          k = i % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  // Handle user's answer submission
  const handleSubmitAnswer = () => {
    const parsedUserAnswer = parseFloat(userAnswer);
    if (!isNaN(parsedUserAnswer) && parsedUserAnswer === correctAnswer) {
      setFeedbackMessage('Correct! 🎉');
    } else {
      setFeedbackMessage(`Incorrect. The correct answer was ${correctAnswer}.`);
    }
    setGameState('result');
  };

  // Render components based on game state
  const renderGameContent = () => {
    switch (gameState) {
      case 'start':
        return (
          <StartScreen onStartGame={startGame} />
        );
      case 'showingNumbers':
        const progress = (currentNumberIndex / numbersShown.length) * 100;
        return (
          <NumberDisplay
            number={currentNumberIndex < numbersShown.length ? numbersShown[currentNumberIndex].display : null}
            title={`Number ${currentNumberIndex + 1}`}
            progress={progress}
          />
        );
      case 'question':
        return (
          <QuestionScreen
            question={question}
            userAnswer={userAnswer}
            onUserAnswerChange={(e) => setUserAnswer(e.target.value)}
            onSubmitAnswer={handleSubmitAnswer}
            progress={100} // Progress bar is full at question stage
          />
        );
      case 'result':
        return (
          <ResultScreen
            feedback={feedbackMessage}
            onRestartGame={startGame}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 font-inter">
      {renderGameContent()}
    </div>
  );
};

// StartScreen Component
const StartScreen = ({ onStartGame }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-xl max-w-lg w-full text-center">
    <h1 className="text-4xl font-bold mb-6 text-green-400">Number Memory Game</h1>
    <p className="text-lg mb-8 text-gray-300">Test your memory for numbers!</p>
    <Button onClick={onStartGame}>Start Game</Button>
  </div>
);

// NumberDisplay Component
const NumberDisplay = ({ number, title, progress }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-xl max-w-lg w-full min-h-[300px] text-center">
    {/* Progress Bar */}
    <div className="w-full h-2 bg-gray-700 rounded-full mb-8">
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <h2 className="text-2xl font-semibold mb-6 text-gray-300">{title}</h2>
    {number !== null ? (
      <p className="text-8xl font-bold text-white leading-none">{number}</p>
    ) : (
      <p className="text-4xl text-gray-400">Loading next number...</p>
    )}
    {/* Skip button is optional for now */}
    {/* <Button className="mt-8">Skip</Button> */}
  </div>
);

// QuestionScreen Component
const QuestionScreen = ({ question, userAnswer, onUserAnswerChange, onSubmitAnswer, progress }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-xl max-w-lg w-full text-center">
    {/* Progress Bar */}
    <div className="w-full h-2 bg-gray-700 rounded-full mb-8">
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <h2 className="text-2xl font-semibold mb-6 text-gray-300">Question</h2>
    <p className="text-3xl font-bold text-white mb-8">{question}</p>
    <Input
      type="number" // Use type number for numerical input
      placeholder="Type your answer"
      value={userAnswer}
      onChange={onUserAnswerChange}
      className="mb-6"
    />
    <Button onClick={onSubmitAnswer}>Submit</Button>
  </div>
);

// ResultScreen Component
const ResultScreen = ({ feedback, onRestartGame }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-xl max-w-lg w-full text-center">
    <h2 className="text-3xl font-bold mb-6 text-green-400">Game Over!</h2>
    <p className={`text-2xl mb-8 ${feedback.includes('Correct') ? 'text-green-300' : 'text-red-400'}`}>
      {feedback}
    </p>
    <Button onClick={onRestartGame}>Play Again</Button>
  </div>
);

export default App;