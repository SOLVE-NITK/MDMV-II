
// Don't touch the below code

(function() {
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
      question: "What is an important assumption made before the experiment?",
      answers: {
        a: "Pendulum is given small displacements from mean position",
        b: "Pendulum is given large displacements from mean position",
        c: "Length of the pendulum is small",
        d: "None of the above"
      },
      correctAnswer: "a"
    },

    {
      question: "What is the maximum displacement of the bob from its mean position to its extreme position called?",
      answers: {
        a: "Frequency",
        b: "Time Period",
        c: "Amplitude",
        d: "Wavelength",
      },
      correctAnswer: "c"
    },

    {
      question: "For a simple pendulum graph between l and T will be",
      answers: {
        a: "Parabola",
        b: "Curve",
        c: "Straight Line",
        d: "Hyperbola"
      },
      correctAnswer: "a"
    },
    {
      question: "The length of a pendulum is 2.5m and acceleration due to gravity is 10m/s<sup>2</sup>.Determine the natural frequency of the pendulum(in Hz)",
      answers: {
        a: "5.33",
        b: "0.25",
        c: "3.5",
        d: "4"
      },
      correctAnswer: "d"
    },
    {
      question: "In the free vibration of a simple pendulum, the damping ratio is 0.5 and natural frequency of the pendulum is 5rad/s.What is the damped natural frequency?(rad/s)",
      answers: {
        a: "5.33",
        b: "3.67",
        c: "4.33",
        d: "2"
      },
      correctAnswer: "c"
    }
  ];




// ---------------------------- End -------------------------------








  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();
