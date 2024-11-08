import React, { useState } from 'react'
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';
// Hint: Take advantage of the QuizQuestion interface

// interface QuizState {
//   questions: QuizQuestion[]
//   currentQuestionIndex: number
//   selectedAnswer: string | null
//   score: number
// }
const quizCore = new QuizCore();

const Quiz: React.FC = () => {
  // TODO: Task1 - Seprate the logic of quiz from the UI.
  // Hint: Take advantage of QuizCore to manage quiz state separately from the UI.
  // const initialQuestions: QuizQuestion[] = [
  //   {
  //     question: 'What is the capital of France?',
  //     options: ['London', 'Berlin', 'Paris', 'Madrid'],
  //     correctAnswer: 'Paris',
  //   },
  // ];
  // const [state, setState] = useState<QuizState>({
  //   questions: initialQuestions,
  //   currentQuestionIndex: 0,  // Initialize the current question index.
  //   selectedAnswer: null,  // Initialize the selected answer.
  //   score: 0,  // Initialize the score.
  // });

  const [quizCore] = useState(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionSelect = (option: string): void => {
    //setState((prevState) => ({ ...prevState, selectedAnswer: option }));
    setSelectedAnswer(option);
  }


  const handleButtonClick = (): void => {
    // TODO: Task3 - Implement the logic for button click ("Next Question" and "Submit").
    // Hint: You might want to check for a function in the core logic to help with this.
    if (selectedAnswer) {
      quizCore.answerQuestion(selectedAnswer);
      
      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
        setSelectedAnswer(null);
      } else {
        setIsCompleted(true);
      }
    }
  } 


  if (isCompleted) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }
  const currentQuestion = quizCore.getCurrentQuestion();

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion?.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion?.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>{quizCore.hasNextQuestion() ? 'Next Question' : 'Submit'}</button>
      
    </div>
  );
};

export default Quiz;