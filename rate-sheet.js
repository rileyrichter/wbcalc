const root = document.getElementById("root");
const dataRow = document.getElementById("data_row");
const union = localStorage.getItem("union");
const calcModal = document.getElementById("modal");
const closeModal = document.getElementById("close");

// On document ready, let's fetch some data
window.addEventListener("DOMContentLoaded", (event) => {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }; //handler function that throws any encountered error

  fetch(
    `https://v1.nocodeapi.com/rileyrichter/airtable/kXGRAuNEuUpInekU?tableName=positions&view=${union}&perPage=all`
  )
    .then(handleError) // skips to .catch if error is thrown
    .then((data) => {
      data.records.forEach((record) => {
        // do something here
        let newRow = dataRow.cloneNode(true);
        newRow.id = record.id;
        let jobTitle = newRow.getElementsByClassName("position")[0];
        jobTitle.innerText = record.fields.job_title;
        let unionLocal = newRow.getElementsByClassName("union-local")[0];
        unionLocal.innerText = record.fields.union_local;
        let hourlyRate = newRow.getElementsByClassName("hourly-rate")[0];
        hourlyRate.innerText = record.fields.hourly_rate;
        let eightHours = newRow.getElementsByClassName("eight-hours")[0];
        if (record.fields.eight_hours == null) {
          eightHours.innerText = `\u2014`;
        } else {
          eightHours.innerText = `$ ${record.fields.eight_hours.toFixed(2)}`;
        }
        let tenHours = newRow.getElementsByClassName("ten-hours")[0];
        if (record.fields.ten_hours == null) {
          tenHours.innerText = `\u2014`;
        } else {
          tenHours.innerText = `$ ${record.fields.ten_hours.toFixed(2)}`;
        }
        let twelveHours = newRow.getElementsByClassName("twelvel-hours")[0];
        if (record.fields.twelve_hours == null) {
          twelveHours.innerText = `\u2014`;
        } else {
          twelveHours.innerText = `$ ${record.fields.twelve_hours.toFixed(2)}`;
        }
        let dayRate = newRow.getElementsByClassName("day-rate")[0];
        dayRate.innerText = `$213.52`;
        let fringeRate = newRow.getElementsByClassName("fringe-rate")[0];
        fringeRate.innerText = `44.50%`;
        let total = newRow.getElementsByClassName("total")[0];
        total.innerText = `$123.45`;
        let filter = record.fields.filter;
        let budget = record.fields.budget;
        let union = record.fields.union;
        let region = record.fields.region;
        let guaranteedHours = record.fields.guaranteed_hours;
        let validUntil = record.fields.valid_until;
        root.appendChild(newRow);
      });
    })
    .catch(function writeError(err) {
      // catches the error and logs it
    })
    .finally(() => {
      // last step
      dataRow.remove();
      document.querySelectorAll(".grid-row").forEach((item) => {
        item.addEventListener("click", (event) => {
          //handle click
          calcModal.style.display = "flex";
          console.log(item.id);
        });
      });
    });
});

closeModal.onclick = (e) => {
  calcModal.style.display = "none";
};
