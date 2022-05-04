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
      question: "At nodal point, the vibration of a revolving shaft is",
      answers: {
        a: "Zero",
        b: "Maximum",
        c: "Double than at the ends",
        d: "None of the above",
      },
      correctAnswer: "a",
    },

    {
      question:
        "As damping factor increases, at which frequency ratio does phase angle increases?",
      answers: {
        a: "When frequency ratio is less than unity",
        b: "When frequency ratio is more than unity",
        c: "When frequency ratio is zero",
        d: "All of the above",
      },
      correctAnswer: "a",
    },

    {
      question:
        "Magnification factor is maximum at resonance \n 1. Magnification factor is minimum at resonance \n 2. The maximum value of amplification factor increases as damping factor decreases \n 3. The maximum value of amplification factor increases as damping factor increases \n 4. Magnification factor is maximum at resonance",
      answers: {
        a: "Statement 1 and statement 2",
        b: "Statements 1,2 and 3",
        c: "Statement 2 and statement 4",
        d: "All the above statements are true",
      },
      correctAnswer: "c",
    },
    {
      question: "Magnification factor is the ratio of",
      answers: {
        a: "zero frequency deflection and amplitude of steady state vibrations",
        b: "amplitude of steady state vibrations and zero frequency deflection",
        c: "amplitude of unsteady state vibrations and zero frequency distribution",
        d: "none of the above",
      },
      correctAnswer: "b",
    },
  ];

  // ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
