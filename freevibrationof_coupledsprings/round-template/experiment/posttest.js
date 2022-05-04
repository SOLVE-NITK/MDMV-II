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
        "What is the phase difference between input and response for a system with 10kg mass 10N/m stiffness and 15Ns/m damping being operated at 0.5 rad/s?",
      answers: {
        a: "90\u00B0",
        b: "30\u00B0",
        c: "60\u00B0",
        d: "45\u00B0",
      },
      correctAnswer: "d",
    },

    {
      question:
        "Amplification factor of a system was found to be 4 at resonance. What would be its damping ratio?",
      answers: {
        a: "0.5",
        b: "0.25",
        c: "0.125",
        d: "1",
      },
      correctAnswer: "c",
    },

    {
      question:
        "<img src='./images/postesteqn1.png'/> \n The above equation gives the steady state amplitude for a system excited by an external harmonic force.",
      answers: {
        a: "True",
        b: "False",
      },
      correctAnswer: "b",
    },
    {
      question:
        "If the damping ratio of the system is 0.25, find its logarithmic decrement",
      answers: {
        a: "1.62",
        b: "2.44",
        c: "3.62",
        d: "4",
      },
      correctAnswer: "a",
    },
    {
      question:
        "If the damping ratio of a system is 0.5 and its frequency ratio is 0.8 then its magnification factor will be",
      answers: {
        a: "1.56",
        b: "0.88",
        c: "2.33",
        d: "1.14",
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
