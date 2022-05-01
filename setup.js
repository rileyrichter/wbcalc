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
const sagContract = "sag";
const phbpContract = "phbp";
const teamstersContract = "teamsters";
const dgaContract = "dga";
const iatseContract = "iatse";

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
  //e.preventDefault();
  let submitEmail = localStorage.getItem("email");
  projEmail.value = submitEmail;
  let projectSelectValue = projectSelect.value;
  let stateSelectValue = stateSelect.value;
  let daysValue = days.value;
  let hoursValue = hours.value;
  let handlingFeeValue = handlingFee.value;
  let unionValue = unionSelect.value;
  let contractValue = contractSelect.value;
  localStorage.setItem("project-type", projectSelectValue);
  localStorage.setItem("project-location", stateSelectValue);
  localStorage.setItem("days", daysValue);
  localStorage.setItem("hours", hoursValue);
  localStorage.setItem("handling-fee", handlingFeeValue);
  localStorage.setItem("union", unionValue);
  localStorage.setItem("contract", contractValue);
  //window.location.assign(`/rate-sheet`);
};

unionSelect.onchange = function () {
  let val = this.value;
  if (val == "SAG") {
    contractSelect.options.length = 0;
    updateContractSelect(sagContract);
  } else if (val == "IATSE") {
    contractSelect.options.length = 0;
    updateContractSelect(iatseContract);
  } else if (val == "Teamsters") {
    contractSelect.options.length = 0;
    updateContractSelect(teamstersContract);
  } else if (val == "DGA") {
    contractSelect.options.length = 0;
    updateContractSelect(dgaContract);
  } else if (val == "PHBP") {
    contractSelect.options.length = 0;
    updateContractSelect(phbpContract);
  }
};

function addProjectsToSelect() {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }; //handler function that throws any encountered error

  fetch(
    "https://v1.nocodeapi.com/rileyrichter/airtable/QXbLoLHUXKiRdAdi?tableName=categories"
  )
    .then(handleError) // skips to .catch if error is thrown
    .then((data) => {
      data.records.forEach((record) => {
        let option = document.createElement("option");
        option.text = record.fields.name;
        option.value = record.id;
        projectSelect.add(option);
      });
    })
    .catch(function writeError(err) {
      // catches the error and logs it
    })
    .finally(() => {
      // we'll do something here
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
  fetch(
    "https://v1.nocodeapi.com/rileyrichter/airtable/QXbLoLHUXKiRdAdi?tableName=unions"
  )
    .then(handleError)
    .then((data) => {
      data.records.forEach((record) => {
        let option = document.createElement("option");
        option.text = record.fields.name;
        option.value = record.fields.name;
        unionSelect.add(option);
      });
    })
    .catch(function writeError(err) {
      console.error(err);
    })
    .finally(() => {
      // we'll do something here
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
  fetch(
    "https://v1.nocodeapi.com/rileyrichter/airtable/QXbLoLHUXKiRdAdi?tableName=taxes"
  )
    .then(handleError)
    .then((data) => {
      data.records.forEach((record) => {
        let option = document.createElement("option");
        option.text = record.fields.state;
        option.value = record.id;
        stateSelect.add(option);
      });
    })
    .catch(function writeError(err) {
      console.error(err);
    })
    .finally(() => {
      // we'll do something here
    });
}

function updateContractSelect(union) {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };
  fetch(
    `https://v1.nocodeapi.com/rileyrichter/airtable/QXbLoLHUXKiRdAdi?tableName=contracts&view=${union}`
  )
    .then(handleError)
    .then((data) => {
      data.records.forEach((record) => {
        let option = document.createElement("option");
        option.text = record.fields.name;
        option.value = record.id;
        contractSelect.add(option);
      });
    })
    .catch(function writeError(err) {
      console.error(err);
    })
    .finally(() => {
      // we'll do something here
    });
}
