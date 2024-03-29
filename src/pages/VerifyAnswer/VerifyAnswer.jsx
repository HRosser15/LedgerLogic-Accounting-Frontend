import React from "react";

const VerifyAnswer = ({ securityQuestionsWithAnswers, userAnswers }) => {
  const verifyAnswers = () => {
    let allCorrect = true;
    for (let i = 0; i < securityQuestionsWithAnswers.length; i++) {
      const { question, correctAnswer } = securityQuestionsWithAnswers[i];
      const userAnswer = userAnswers[i].answer;

      if (userAnswer.toLowerCase() !== correctAnswer.toLowerCase()) {
        allCorrect = false;
        break;
      }
    }
    return allCorrect;
  };

  const allAnswersCorrect = verifyAnswers();

  return (
    <div>
      {allAnswersCorrect ? (
        <div>Security verification successful.</div>
      ) : (
        <div>Security verification failed. Please try again.</div>
      )}
    </div>
  );
};

export default VerifyAnswer;
