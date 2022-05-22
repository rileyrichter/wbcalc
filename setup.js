const next = document.getElementById("begin-submit");
const emailGate = document.getElementById("gate");
const projDetails = document.getElementById("details");
const projectSelect = document.getElementById("project");
const stepTwo = document.getElementById("step-two");
const contractSelect = document.getElementById("contract");
const unionSelect = document.getElementById("union");
const email = document.getElementById("email");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const handlingFee = document.getElementById("handling-fee");
const stateSelect = document.getElementById("production-state");
const projSubmit = document.getElementById("form-submit");
const projEmail = document.getElementById("emailproj");
const fringeEdit = document.getElementById("fringe-edit");
const fringeForm = document.getElementById("fringe");
const fringeDescription = document.getElementById("fringe-description");
const agreementOverlay = document.getElementById("aoverlay");
const projectLoad = document.getElementById("proj_load");
const unionLoad = document.getElementById("union_load");
const locationLoad = document.getElementById("location_load");
const contractLoad = document.getElementById("contract_load");
let wLocation;
let wProject;
let wUnion;
let contractDataName;

window.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("email") !== null) {
    emailGate.style.display = "none";
    projDetails.style.display = "block";
  } else {
    emailGate.style.display = "block";
    projDetails.style.display = "none";
  }
  addProjectsToSelect();
  addUnionsToSelect();
  addLocationsToSelect();
  days.value = 1;
  hours.value = 12;
  handlingFee.value = 2;
});

projectSelect.onchange = function () {
  stepTwo.style.display = "block";
  wProject = this.value;
  checkForAgreement();
};

stateSelect.onchange = function () {
  wLocation = this.value;
  checkForAgreement();
};

unionSelect.onchange = function () {
  wUnion = this.value;
  checkForAgreement();
};

fringeEdit.onclick = (e) => {
  fringeForm.style.display = "flex";
  fringeDescription.style.display = "none";
};

next.onclick = (e) => {
  // e.preventDefault();
  emailValue = email.value;
  localStorage.setItem("email", emailValue);
  emailGate.style.display = "none";
  projDetails.style.display = "block";
};

projSubmit.onclick = (e) => {
  let submitEmail = localStorage.getItem("email");
  projEmail.value = submitEmail;
  let projectSelectValue = projectSelect.value;
  let stateSelectValue = stateSelect.value;
  let daysValue = days.value;
  let hoursValue = hours.value;
  let handlingFeeValue = handlingFee.value;
  let unionValue = unionSelect.value;
  let contractValue = contractSelect.value;
  let locationId = stateSelect.selectedOptions[0].dataset.location_id;
  let contractDataValue =
    contractSelect.selectedOptions[0].dataset.contract_name;
  localStorage.setItem("project-type", projectSelectValue);
  localStorage.setItem("project-location", stateSelectValue);
  localStorage.setItem("project-location-id", locationId);
  localStorage.setItem("days", daysValue);
  localStorage.setItem("hours", hoursValue);
  localStorage.setItem("handling-fee", handlingFeeValue);
  localStorage.setItem("union", unionValue);
  localStorage.setItem("contract", contractValue);
  localStorage.setItem("contract-name", contractDataValue);
};

function addProjectsToSelect() {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }; //handler function that throws any encountered error

  fetch("https://dev--wrapbook.bparker.autocode.gg/projects/")
    .then(handleError) // skips to .catch if error is thrown
    .then((data) => {
      data.rows.forEach((row) => {
        let option = document.createElement("option");
        option.text = row.fields.name;
        option.value = row.fields.name;
        projectSelect.add(option);
      });
    })
    .catch(function writeError(err) {
      // catches the error and logs it
    })
    .finally(() => {
      projectLoad.classList.add("invisible");
      projectLoad.remove();
    });
}

function addUnionsToSelect() {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };
  fetch("https://dev--wrapbook.bparker.autocode.gg/unions/")
    .then(handleError)
    .then((data) => {
      data.rows.forEach((row) => {
        let option = document.createElement("option");
        option.text = row.fields.name;
        option.value = row.fields.name;
        unionSelect.add(option);
      });
    })
    .catch(function writeError(err) {
      console.error(err);
    })
    .finally(() => {
      unionLoad.classList.add("invisible");
      unionLoad.remove();
    });
}

function addLocationsToSelect() {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };
  fetch("https://dev--wrapbook.bparker.autocode.gg/locations/")
    .then(handleError)
    .then((data) => {
      data.rows.forEach((row) => {
        let option = document.createElement("option");
        option.text = row.fields.state;
        option.value = row.fields.state;
        option.dataset.location_id = row.id;
        stateSelect.add(option);
      });
    })
    .catch(function writeError(err) {
      console.error(err);
    })
    .finally(() => {
      locationLoad.classList.add("invisible");
      locationLoad.remove();
    });
}

function checkForAgreement() {
  if (wLocation == null || wProject == null || wUnion == null) {
    agreementOverlay.style.display = "flex";
  } else {
    contractSelect.options.length = 0;
    contractLoad.style.display = "flex";
    contractLoad.classList.remove("invisible");
    agreementOverlay.style.display = "none";
    const handleError = (response) => {
      if (!response.ok) {
        throw Error(` ${response.status} ${response.statusText}`);
      } else {
        return response.json();
      }
    };
    fetch(`https://dev--wrapbook.bparker.autocode.gg/contract`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Location: `\'${wLocation}\'`,
        Contract: `\'${wProject}\'`,
        Union: `\'${wUnion}\'`,
      }),
    })
      .then(handleError)
      .then((data) => {
        if (Object.entries(data).length == 0) {
          contractSelect.options.length = 0;
          contractSelect.options[0] = new Option("No Contracts");
          projSubmit.disabled = true;
          projSubmit.classList.add("disabled");
        } else {
          projSubmit.disabled = false;
          projSubmit.classList.remove("disabled");
          data.forEach((row) => {
            let option = document.createElement("option");
            option.text = row.fields.name;
            option.value = row.id;
            option.dataset.contract_name = row.fields.name;
            contractSelect.add(option);
          });
        }
      })
      .catch(function writeError(err) {
        console.log(err);
      })
      .finally(() => {
        contractLoad.classList.add("invisible");
        contractLoad.style.display = "none";
      });
  }
}
