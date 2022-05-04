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
        "Phase difference between input and response at resonance is 90&deg;",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a",
    },
    {
      question: "Phase angle in terms of damping ratio and frequency ratio is",
      answers: {
        a: "atan(2r/(1-r^2))",
        b: "atan(2ζr/(1-r^2))",
        c: "atan(1/(1-r^2))",
        d: "None of these",
      },
      correctAnswer: "b",
    },
    {
      question:
        "The force transmissivity and displacement transmissivity are the same for a single degree of freedom system",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a",
    },
    {
      question:
        "The force transmissibility of the system if the damping ratio is 0.1 and frequency ratio is 1.",
      answers: {
        a: "3.77",
        b: "4.5",
        c: "1",
        d: "5.1",
      },
      correctAnswer: "d",
    },
    {
      question: "Which among the following are causes of imbalance in systems?",
      answers: {
        a: "Distortion from stress",
        b: "Thermal distortion",
        c: "Unbalanced by design",
        d: "All of the above",
      },
      correctAnswer: "d",
    },
  ];

  // ---------------------------- End -------------------------------

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
