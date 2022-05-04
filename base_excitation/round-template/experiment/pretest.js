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
      question: "Rotating unbalance is caused due to",
      answers: {
        a: "uneven distribution of mass around axis",
        b: "accumulation of excess mass at the tip of the axis",
        c: "presence of rotating components",
        d: "None of these",
      },
      correctAnswer: "a",
    },

    {
      question:
        "The equation for transmissibility(ratio of amplitude of system to that of base X/Y) is given by",
      answers: {
        a: "√(1+(2πζ)+sup(2)+)/√((1-r+sup(2)++(2ζr)+sup(2)",
        b: "1/√((1-r+sup>(2)+(2ζr)+sup>(2)",
        c: "√(1+2πζ)/√(1-r+sup>(2)",
        d: "None of these",
      },
      correctAnswer: "a",
    },

    {
      question:
        "What is the amplitude of force due to an imbalance mass of 10g at a distance of 10mm rotating at 100rad/s?",
      answers: {
        a: "1N",
        b: "0.1N",
        c: "10N",
        d: "None of these",
      },
      correctAnswer: "a",
    },
    {
      question:
        "What is the phase angle(in degrees) if the imbalance mass is 100g and rotating at 5 rad/s.System stiffness(k)=5 N/m,System damping(c)=0.5 Ns/m",
      answers: {
        a: "22",
        b: "45",
        c: "30",
        d: "60",
      },
      correctAnswer: "b",
    },
    {
      question:
        "The distance between unbalanced mass and center of axis is called",
      answers: {
        a: "unbalance length",
        b: "radius",
        c: "offset",
        d: "eccentricity",
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
