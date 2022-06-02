const baseURL = "https://bparker.api.stdlib.com/wrapbook@dev/dev",
  next = document.getElementById("begin-submit"),
  emailGate = document.getElementById("gate"),
  projDetails = document.getElementById("details"),
  projectSelect = document.getElementById("project"),
  stepTwo = document.getElementById("step-two"),
  contractSelect = document.getElementById("contract"),
  unionSelect = document.getElementById("union"),
  email = document.getElementById("email"),
  days = document.getElementById("days"),
  hours = document.getElementById("hours"),
  handlingFee = document.getElementById("handling-fee"),
  stateSelect = document.getElementById("production-state"),
  projSubmit = document.getElementById("form-submit"),
  projEmail = document.getElementById("emailproj"),
  fringeEdit = document.getElementById("fringe-edit"),
  fringeForm = document.getElementById("fringe"),
  fringeDescription = document.getElementById("fringe-description"),
  agreementOverlay = document.getElementById("aoverlay"),
  projectLoad = document.getElementById("proj_load"),
  unionLoad = document.getElementById("union_load"),
  locationLoad = document.getElementById("location_load"),
  contractLoad = document.getElementById("contract_load");
let wLocation, wProject, wUnion, contractDataName;

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
  };

  fetch(`${baseURL}/projects`)
    .then(handleError)
    .then((data) => {
      data.rows.forEach((row) => {
        let option = document.createElement("option");
        option.text = row.fields.name;
        option.value = row.fields.name;
        projectSelect.add(option);
      });
    })
    .catch(function writeError(err) {
      console.log(err);
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
  fetch(`${baseURL}/unions`)
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
    fetch(`${baseURL}}/contract`, {
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
