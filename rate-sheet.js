const root = document.getElementById("root");
const dataRow = document.getElementById("data_row");
const union = localStorage.getItem("union");
const calcModal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const loadingDiv = document.getElementById("loading");
const taxesValue = localStorage.getItem("project-location");
const contractValue = localStorage.getItem("contract");
const hoursValue = localStorage.getItem("hours");

window.addEventListener("DOMContentLoaded", (event) => {
  if (union == null) {
    window.location.assign(`/begin`);
  }
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  fetch(
    `https://v1.nocodeapi.com/rileyrichter/airtable/QXbLoLHUXKiRdAdi?tableName=positions&view=${union}&perPage=all`
  )
    .then(handleError)
    .then((data) => {
      data.records.forEach((record) => {
        let newRow = dataRow.cloneNode(true);
        newRow.id = record.id;
        let jobTitle = newRow.getElementsByClassName("position")[0];
        jobTitle.innerText = record.fields.job_title;
        let unionLocal = newRow.getElementsByClassName("union-local")[0];
        if (record.fields.union_local == null) {
          unionLocal.innerText = `\u2014`;
        } else {
          unionLocal.innerText = record.fields.union_local;
        }
        let hourlyRate = newRow.getElementsByClassName("hourly-rate")[0];
        if (record.fields.hourly_rate != null) {
          hourlyRate.innerText = record.fields.hourly_rate;
        } else {
          hourlyRate.innerText = `\u2014`;
        }
        let twelveHours = newRow.getElementsByClassName("twelvel-hours")[0];
        if (record.fields.twelve_hours == null) {
          twelveHours.innerText = `\u2014`;
        } else {
          twelveHours.innerText = `$ ${record.fields.twelve_hours.toFixed(2)}`;
        }
        let fringeRate = newRow.getElementsByClassName("fringe-rate")[0];
        fringeRate.innerText = `44.50%`;
        let total = newRow.getElementsByClassName("total")[0];
        total.innerText = `$123.45`;
        root.appendChild(newRow);
      });
    })
    .catch(function writeError(err) {
      // catches the error and logs it
    })
    .finally(() => {
      dataRow.remove();
      root.classList.add("fade-in");
      loadingDiv.remove();
      document.querySelectorAll(".grid-row").forEach((item) => {
        const wagesNumber = item.closest("#twelve_hours").innerText;
        wagesNumber.split("$");
        wagesValue = wagesNumber[1];
        item.addEventListener("click", (event) => {
          calcModal.style.display = "flex";
          console.log(item.id);
          document.getElementById("calc-loading").style.display = "flex";
          document.getElementById("results").style.display = "none";

          // Get the values in the form and set them as variables, converting some to numbers for the API calls

          // Set up the handle error
          const handleError = (response) => {
            if (!response.ok) {
              throw Error(` ${response.status} ${response.statusText}`);
            } else {
              return response.json();
            }
          };

          // Set the headers for the API call
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          let requestOptions = {
            method: "post",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify([
              {
                taxes: [productionState],
                wages: wagesValue,
                contracts: [contractValue],
                hours: hoursValue,
                scalerate: 100,
                wrapbookfee: 0.0149,
              },
            ]),
          };

          // Make the API call with the endpoint and the options
          fetch(
            "https://v1.nocodeapi.com/rileyrichter/airtable/QXbLoLHUXKiRdAdi?tableName=requests",
            requestOptions
          )
            .then(handleError) // If there's an error, skip to the end and display it on canvas
            .then((data) => {
              let socialsecurityFS =
                Number(data[0].fields.socialsecurityFS) * 100;
              let socialsecurityFS2 = socialsecurityFS.toFixed(2) + "%";
              let socialsecurityRS =
                "$" + Number(data[0].fields.socialsecurityRS).toFixed(2);
              document.getElementById("socialsecurityFS").textContent =
                socialsecurityFS2;
              document.getElementById("socialsecurityRS").textContent =
                socialsecurityRS;
              let medicareFS = Number(data[0].fields.medicareFS) * 100;
              let medicareFS2 = medicareFS.toFixed(2) + "%";
              let medicareRS =
                "$" + Number(data[0].fields.medicareRS).toFixed(2);
              document.getElementById("medicareFS").textContent = medicareFS2;
              document.getElementById("medicareRS").textContent = medicareRS;
              let futaFS = Number(data[0].fields.futaFS) * 100;
              let futaFS2 = futaFS.toFixed(2) + "%";
              let futaRS = "$" + Number(data[0].fields.futaRS).toFixed(2);
              document.getElementById("futaFS").textContent = futaFS2;
              document.getElementById("futaRS").textContent = futaRS;
              let suiFS = Number(data[0].fields.suiFS) * 100;
              let suiFS2 = suiFS.toFixed(2) + "%";
              let suiRS = "$" + Number(data[0].fields.suiRS).toFixed(2);
              document.getElementById("suiFS").textContent = suiFS2;
              document.getElementById("suiRS").textContent = suiRS;
              let localtaxesFS = Number(data[0].fields.localtaxesFS) * 100;
              let localtaxesFS2 = localtaxesFS.toFixed(2) + "%";
              let localtaxesRS =
                "$" + Number(data[0].fields.localtaxesRS).toFixed(2);
              document.getElementById("localtaxesFS").textContent =
                localtaxesFS2;
              document.getElementById("localtaxesRS").textContent =
                localtaxesRS;
              let wcFS = Number(data[0].fields.wcFS) * 100;
              let wcFS2 = wcFS.toFixed(2) + "%";
              let wcRS = "$" + Number(data[0].fields.wcRS).toFixed(2);
              document.getElementById("wcFS").textContent = wcFS2;
              document.getElementById("wcRS").textContent = wcRS;
              let grosswageFS = Number(data[0].fields.grosswageFS) * 100;
              let grosswageFS2 = grosswageFS.toFixed(2) + "%";
              let grosswageRS =
                "$" + Number(data[0].fields.grosswageRS).toFixed(2);
              document.getElementById("grosswageFC").textContent = grosswageFS2;
              document.getElementById("grosswageRS").textContent = grosswageRS;
              let scaleFS = Number(data[0].fields.scaleFS) * 100;
              let scaleFS2 = scaleFS.toFixed(2) + "%";
              let scaleRS = "$" + Number(data[0].fields.scaleRS).toFixed(2);
              document.getElementById("scaleFS").textContent = scaleFS2;
              document.getElementById("scaleRS").textContent = scaleRS;
              let hoursFC = Number(data[0].fields.hoursFC);
              let hoursFC2 = "$" + hoursFC.toFixed(4);
              let hoursRS = "$" + Number(data[0].fields.hourRS).toFixed(2);
              document.getElementById("hoursFC").textContent = hoursFC2;
              document.getElementById("hoursRS").textContent = hoursRS;
              let wrapbookfee = Number(data[0].fields.wrapbookfee) * 100;
              let wrapbookfee2 = wrapbookfee.toFixed(2) + "%";
              let wrapbookRS =
                "$" + Number(data[0].fields.wrapbookRS).toFixed(2);
              document.getElementById("wrapbookfee").textContent = wrapbookfee2;
              document.getElementById("wrapbookRS").textContent = wrapbookRS;
              let fringeBasis = Number(data[0].fields.fringeBASIS) * 100;
              let fringeBasis2 = fringeBasis.toFixed(2) + "%";
              let fringeRS =
                "$" + Number(data[0].fields.fringeTOTAL).toFixed(2);
              document.getElementById("fringeBASIS").textContent = fringeBasis2;
              document.getElementById("fringeTOTAL").textContent = fringeRS;
              let unionPercent = Number(data[0].fields.unionPC) * 100;
              let unionPercent2 = unionPercent.toFixed(2) + "%";
              let unionTotal =
                "$" + Number(data[0].fields.unionTOTAL).toFixed(2);
              document.getElementById("unionTOTAL").textContent = unionTotal;
              document.getElementById("unionPC").textContent = unionPercent2;
            })
            .catch(function writeError(err) {
              console.log(err);
              /* document.getElementById("result").style.display = "none";
              document.getElementById("loading").style.display = "none";
              document.getElementById("error").style.display = "block";
              document.getElementById("status").textContent = err; */
            })
            .finally(() => {
              document.getElementById("results").style.display = "block";
              document.getElementById("calc-loading").style.display = "none";
            });
        });
      });
    });
});

closeModal.onclick = (e) => {
  calcModal.style.display = "none";
};
