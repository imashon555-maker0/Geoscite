import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Trophy, CheckCircle, Star } from 'lucide-react';
import quizData from '../data/quizzes.json';

const QuizRoad: React.FC = () => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState<{
    completedLevels: number[];
    totalPoints?: number;
    badges?: string[];
  }>({
    completedLevels: []
  });
  const [totalPoints, setTotalPoints] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [levelScore, setLevelScore] = useState(0);

  // Load progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('geoscite-quiz-progress');
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      setProgress(parsed);
      setTotalPoints(parsed.totalPoints || 0);
      setBadges(parsed.badges || []);
    }
  }, []);

  // Save progress
  const saveProgress = (updatedProgress: any) => {
    localStorage.setItem('geoscite-quiz-progress', JSON.stringify(updatedProgress));
  };

  // Check for new badges
  const checkBadges = (points: number) => {
    const newBadges = [];
    if (points >= 20 && !badges.includes('Bronze Explorer')) newBadges.push('Bronze Explorer');
    if (points >= 40 && !badges.includes('Silver Explorer')) newBadges.push('Silver Explorer');
    if (points >= 60 && !badges.includes('Gold Explorer')) newBadges.push('Gold Explorer');
    if (newBadges.length > 0) {
      setBadges([...badges, ...newBadges]);
    }
  };

  const currentLevel = quizData[currentLevelIndex];
  const question = currentLevel.questions[currentQuestion];
  const isLevelCompleted = progress.completedLevels.includes(currentLevel.level);

  const handleAnswer = (answer: string) => {
    const isCorrect = answer.toLowerCase().trim() === question.correct.toLowerCase().trim();
    if (isCorrect) {
      setLevelScore(levelScore + 1);
      setScore(score + 1);
    }

    if (currentQuestion < currentLevel.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);

      // If level score > 0, consider completed
      const pointsEarned = currentLevel.points; // full points for completing
      const newPoints = totalPoints + pointsEarned;
      setTotalPoints(newPoints);

      const newCompleted = [...progress.completedLevels];
      if (!newCompleted.includes(currentLevel.level)) {
        newCompleted.push(currentLevel.level);
      }

      const updatedProgress = {
        ...progress,
        completedLevels: newCompleted,
        totalPoints: newPoints,
        badges: [...badges]
      };

      setProgress(updatedProgress);
      checkBadges(newPoints);
      saveProgress(updatedProgress);
    }
  };

  const nextLevel = () => {
    if (currentLevelIndex < quizData.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      setCurrentQuestion(0);
      setScore(0);
      setShowResults(false);
      setLevelScore(0);
    }
  };

  const resetLevel = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setLevelScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <Trophy className="inline-block mr-2" size={40} />
          Quiz Road
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Embark on your archaeological knowledge journey! Level {currentLevelIndex + 1} of {quizData.length}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-amber-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(progress.completedLevels.length / quizData.length) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-center space-x-8 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">{totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{progress.completedLevels.length}</div>
            <div className="text-sm text-gray-600">Levels Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{badges.length}</div>
            <div className="text-sm text-gray-600">Badges</div>
          </div>
        </div>

        {/* Badges */}
        {badges.length > 0 && (
          <div className="flex justify-center space-x-2 mb-6">
            {badges.map(badge => (
              <div key={badge} className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                <Star className="text-yellow-500 mr-1" size={16} />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>
        )}

        {/* Level Selector */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
          {quizData.map((level, index) => {
            const isCompleted = progress.completedLevels.includes(level.level);
            const isCurrent = index === currentLevelIndex;
            const isAvailable = index === 0 || progress.completedLevels.includes(quizData[index-1].level);

            return (
              <button
                key={level.level}
                onClick={() => {
                  if (isAvailable) {
                    setCurrentLevelIndex(index);
                    resetLevel();
                  }
                }}
                disabled={!isAvailable}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-100'
                    : isCompleted
                    ? 'border-green-500 bg-green-100'
                    : isAvailable
                    ? 'border-gray-300 hover:border-amber-500'
                    : 'border-gray-200 bg-gray-100 cursor-not-allowed'
                }`}
              >
                <div className="text-lg font-bold">{level.level}</div>
                <div className="text-sm">{level.points} pts</div>
                {isCompleted && <CheckCircle className="mx-auto text-green-500 mt-1" size={20} />}
              </button>
            );
          })}
        </div>
      </div>

      {!showResults ? (
        currentLevel ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">{currentLevel.title}</h2>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>Question {currentQuestion + 1} of {currentLevel.questions.length}</span>
                <span>Score: {levelScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / currentLevel.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">{question.question}</h3>

              {question.type === 'multiple-choice' ? (
                <div className="space-y-3">
                  {(question as any).options.map((opt: string) => (
                    <button
                      key={opt}
                      className="block w-full p-3 text-left border border-gray-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors"
                      onClick={() => handleAnswer(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    id="quiz-answer"
                    placeholder="Type your answer here..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    className="mt-4 bg-amber-600 hover:bg-amber-700 text-white px-8 py-2 rounded-lg transition-colors"
                    onClick={() => handleAnswer((document.getElementById('quiz-answer') as HTMLInputElement).value)}
                  >
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Trophy size={64} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Select a level to start your quiz journey!</p>
          </div>
        )
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-3xl font-bold mb-4">Level Complete!</h2>
          <p className="text-lg mb-2">You scored {levelScore} out of {currentLevel.questions.length}</p>
          <p className="text-lg mb-4">You earned {currentLevel.points} points!</p>
          <p className="text-xl font-semibold mb-6">Total Points: {totalPoints}</p>

          {currentLevelIndex < quizData.length - 1 ? (
            <div className="space-y-3">
              <button
                onClick={nextLevel}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Next Level: {quizData[currentLevelIndex + 1].title}
              </button>
              <div>
                <button
                  onClick={resetLevel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Retry Level
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xl text-gray-600 mb-4">Congratulations! You've completed all levels!</p>
              <button
                onClick={resetLevel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Start Over
              </button>
            </div>
          )}

          {badges.length > (progress.badges ? progress.badges.length : 0) && (
            <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
              <div className="flex items-center justify-center">
                <Star className="text-yellow-500 mr-2" size={24} />
                <span className="text-lg font-bold">
                  New Badge Earned: {badges[badges.length - 1]}!
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizRoad;
