import React, { useState } from 'react';
import quizData from '../data/quizzes.json';

const QuizRoad: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const quiz = quizData[0];
  const question = quiz.questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    if (answer === question.correct) {
      setScore(score + 1);
    }
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{quiz.title}</h2>
      {!completed ? (
        <div>
          <p className="mb-2">{question.question}</p>
          {question.type === 'multiple-choice' ? (
            <div className="space-y-2">
              {(question as any).options.map((opt: string) => (
                <button key={opt} className="block bg-blue-500 text-white p-2 rounded" onClick={() => handleAnswer(opt)}>{opt}</button>
              ))}
            </div>
          ) : (
            <div>
              <input type="text" id="answer" className="border p-2" />
              <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={() => handleAnswer((document.getElementById('answer') as HTMLInputElement).value)}>Submit</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-xl">Score: {score}/{quiz.questions.length}</p>
          <p>Well done!</p>
        </div>
      )}
    </div>
  );
};

export default QuizRoad;
