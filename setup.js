const next = document.getElementById("begin-submit");
const emailGate = document.getElementById("gate");
const projDetails = document.getElementById("details");
const projects = document.getElementById("project");
const stepTwo = document.getElementById("step-two");
const contractSelect = document.getElementById("contract");
const unionSelect = document.getElementById("union");
const email = document.getElementById("email");
const projectType = document.getElementById("project");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const handlingFee = document.getElementById("handling-fee");
const prodLocation = document.getElementById("production-state");
const projSubmit = document.getElementById("form-submit");

projects.onchange = function () {
  stepTwo.style.display = "block";
};

next.onclick = (e) => {
  // e.preventDefault();
  localStorage.setItem("email", email);
  emailGate.style.display = "none";
  projDetails.style.display = "block";
};

projSubmit.onclick = (e) => {
  // e.preventDefault();
  let projectTypeValue = projectType.value;
  let prodLocationValue = prodLocation.value;
  let daysValue = days.value;
  let hoursValue = hours.value;
  let handlingFeeValue = handlingFee.value;
  let unionValue = unionSelect.value;
  let contractValue = contractSelect.value;
  localStorage.setItem("project-type", projectTypeValue);
  localStorage.setItem("project-location", prodLocationValue);
  localStorage.setItem("days", daysValue);
  localStorage.setItem("hours", hoursValue);
  localStorage.setItem("handling-fee", handlingFeeValue);
  localStorage.setItem("union", unionValue);
  localStorage.setItem("contract", contractValue);
  // window.location.assign(`/rate-sheet`);
};

window.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("email") !== null) {
    emailGate.style.display = "none";
    projDetails.style.display = "block";
  } else {
    emailGate.style.display = "block";
    projDetails.style.display = "none";
  }

  unionSelect.onchange = function () {
    let val = this.value;
    if (val == "SAG") {
      let sagOptions = [
        {
          text: "SAG Commercial Agreement",
          value: "reckjD2rysywf9Kdj",
        },
        {
          text: "SAG Feature Principle Performer",
          value: "recj6d5dY8PZkxgn3",
        },
        {
          text: "SAG Feature Background Performer",
          value: "recfou8TJjKkkShbk",
        },
        {
          text: "SAG New Media Principle Performer",
          value: "recqbaXXtj0QHrNbC",
        },
        {
          text: "SAG New Media Background Performer",
          value: "recRjNUE9uAD2dO3I",
        },
        {
          text: "SAG Sound Recording Performer",
          value: "recPvzxqbrBieKhy0",
        },
        {
          text: "SAG Video Game Principle Performer",
          value: "recjfK488UaO7BZNB",
        },
      ];
      document.getElementById("contract").options.length = 0;
      sagOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } else if (val == "Iatse") {
      let iatseOptions = [
        {
          text: "IATSE Music Video Under 500K Budget",
          value: "recq2Q3TtJQ9KV2bt",
        },
        {
          text: "IATSE Music Video Over 500K Budget",
          value: "rec04KyaBlhtuCvpD",
        },
        {
          text: "IATSE NON-AICP Commercial LA",
          value: "recH5PG0b6XV4Gog3",
        },
        {
          text: "IATSE AICP Commercial LA",
          value: "rech28PjBsaVhcjfs",
        },
        {
          text: "IATSE 161",
          value: "recWem5DdqvEOM68X",
        },
        {
          text: "IATSE 600",
          value: "rec9X81XiLKckjzxT",
        },
        {
          text: "IATSE 52",
          value: "reclj0N0PPDoM9PuN",
        },
        {
          text: "IATSE 829",
          value: "recFiWJPsO5v8Qt6d",
        },
        {
          text: "IATSE 798",
          value: "recIJD2cR1hhFN2Q5",
        },
      ];
      document.getElementById("contract").options.length = 0;
      iatseOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } else if (val == "Teamsters") {
      let teamsterOptions = [
        {
          text: "Teamsters AICP Commercial LA Drivers",
          value: "rectLFFHl3uKITK23",
        },
        {
          text: "Teamsters NON-AICP Commercial LA Drivers",
          value: "rec0bx9HkqaYI56jU",
        },
        {
          text: "Teamsters AICP Commercial LA Location Managers",
          value: "rec8omhpCTVtlHD9c",
        },
        {
          text: "Teamsters NON-AICP Commercial Location Managers",
          value: "recloVBc2sD1HlQsy",
        },
        {
          text: "Teamsters Music Video Under 500K Budget Drivers",
          value: "recIyCHCgxAIwzp7E",
        },
        {
          text: "Teamsters Music Video Over 500K Budget Drivers",
          value: "recHpOeuxo4xWyF2v",
        },
        {
          text: "Teamsters Music Video Under 500K Budget Location Managers",
          value: "rec1Mm7iGC9YsYcG2",
        },
        {
          text: "Teamsters Music Video Over 500K Budget Location Managers",
          value: "recv1tINcY4wqeIpI",
        },
        {
          text: "Teamsters Music Video Music Video Agreement",
          value: "recnyNDhfMDiirgAR",
        },
        {
          text: "Teamsters Music Video Commercial AICP Agreement",
          value: "rec1JACa9GR4IRa3x",
        },
      ];
      document.getElementById("contract").options.length = 0;
      teamsterOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } else if (val == "DGA") {
      let dgaOptions = [
        {
          text: "DGA Commercial AICP Agreement",
          value: "recY9kODZqk72eo1s",
        },
      ];
      document.getElementById("contract").options.length = 0;
      dgaOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } else if (val == "PHBP") {
      let phbpOptions = [
        {
          text: "PHBP Commercial Agreement",
          value: "recfJafbyyKuAdnkd",
        },
      ];
      document.getElementById("contract").options.length = 0;
      phbpOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } else if (val == "nonunion") {
      let nuOptions = [
        {
          text: "Non-Union",
          value: "recbc5AmbVWBFd1Zr",
        },
      ];
      document.getElementById("contract").options.length = 0;
      nuOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    }
  };
});
