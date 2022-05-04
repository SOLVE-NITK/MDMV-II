// Don't touch the below code

(function () {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        //answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // Don't touch the above code

  // Write your MCQs here --- Start --- --------------------

  const myQuestions = [
    {
      question:
        "When a system is subjected to forced vibrations then under steady state conditions",
      answers: {
        a: "It vibrates at its natural frequency",
        b: "It vibrates at its imposed frequency",
        c: "It vibrates at the mean of natural frequency and imposed     frequency",
        d: "None of these",
      },
      correctAnswer: "b",
    },

    {
      question:
        "What is the effect of damping on phase angle at resonance frequency?",
      answers: {
        a: "Phase angle increases as damping increases",
        b: "Damping has no effect on phase angle",
        c: "Phase angle increases as damping decreases",
        d: "None of the above",
      },
      correctAnswer: "b",
    },

    {
      question:
        "When frequency ratio (ω/ωn) is greater than 1, the phase angle decreases as?",
      answers: {
        a: "damping factor increases",
        b: "damping factor decreases",
        c: "both a. and b.",
        d: "none of the above",
      },
      correctAnswer: "a",
    },
    {
      question: "The phase difference or phase angle in forced vibrations is",
      answers: {
        a: "Difference between displacement vector (xp) and velocity vector Vp",
        b: "Angle in which displacement vector leads force vector by (F0 sinωt)",
        c: "Angle in which displacement vector (xp) lags force vector (F0 sinωt)",
        d: "None of the above",
      },
      correctAnswer: "c",
    },
  ];

  // ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
