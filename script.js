let experiments = [
  {
    name: "Base Excitation",
    path: "./base_excitation/index.html",
  },
  {
    name: "Force Transmissibility",
    path: "./force_transmissibility/index.html",
  },
  {
    name: "Forced Vibration of Coupled Strings",
    path: "./forcedvibrationof_coupledsprings/index.html",
  },
  {
    name: "Forced Vibration of Torsional System",
    path: "./forcedvibrationof_torsionalsystem/index.html",
  },
  {
    name: "Free Vibration of Coupled Strings",
    path: "./freevibrationof_coupledsprings/index.html",
  },
  {
    name: "Free Vibration of Simple Pendulum",
    path: "./freevibrationof_simplependulum/index.html",
  },
  {
    name: "Free Vibration of Torsional System",
    path: "./freevibrationof_torsionalsystem/index.html",
  },
];

let cardContent = "";

function displayCard() {
  experiments.forEach((exp, index) => {
    cardContent += `<div class="col-sm-6 p-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${exp.name}</h5>
              <a href="${exp.path}" class="btn btn-primary">Go to Experiment</a>
            </div>
          </div>
        </div>`;
  });
}

displayCard();

document.getElementById("cards").innerHTML = cardContent;
