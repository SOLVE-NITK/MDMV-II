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
        "What is the amplitude of force due to an imbalance mass of 20g at a distance of 10mm rotating at 2866rev/min?",
      answers: {
        a: "18N",
        b: "0.18N",
        c: "180N",
        d: "None of these",
      },
      correctAnswer: "a",
    },

    {
      question:
        "Phase difference between input and response at resonance is 90\u00B0",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "a",
    },

    {
      question:
        "If the amplitude of the base vibration is 5mm then the steady state amplitude of the system(in mm) is? Given the frequency ratio is 0.87 and damping ratio is 0.2.",
      answers: {
        a: "0.87",
        b: "2.5",
        c: "1.75",
        d: "None of these",
      },
      correctAnswer: "c",
    },
    {
      question:
        "The equation for force given by a rotating imbalance is given by",
      answers: {
        a: "2mesin(wt)",
        b: "me+sup(2)+w+sup(2)+sin(wt)",
        c: "m+sup(2)+esin(wt)",
        d: "mew+sup(2)+sin(wt)",
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
