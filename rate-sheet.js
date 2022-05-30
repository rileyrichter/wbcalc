const root = document.getElementById("root");
const dataRow = document.getElementById("data_row");
const union = localStorage.getItem("union");
const calcModal = document.getElementById("modal");
const closeModal = document.getElementById("close");
const loadingDiv = document.getElementById("loading");
const taxesValue = localStorage.getItem("project-location");
const taxesData = localStorage.getItem("project-location-id");
const contractValue = localStorage.getItem("contract");
const contractName = localStorage.getItem("contract-name");
const hoursValue = Number(localStorage.getItem("hours"));
let wrapbookFee = 0.0149;
let contractHoursBased;
let contractGrossWages;
let contractScaleRate;
let locationFuta;
let locationLocalTaxes;
let locationMedicare;
let locationSocialSecurity;
let locationSui;
let locationTotal;
let locationWc;

function getTaxInfo() {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  fetch("https://dev--wrapbook.bparker.autocode.gg/dev/get-tax/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Tax: `${taxesData}`,
    }),
  })
    .then(handleError) // skips to .catch if error is thrown
    .then((data) => {
      locationFuta = data.fields.futa;
      locationLocalTaxes = data.fields.local_taxes;
      locationMedicare = data.fields.medicare;
      locationSocialSecurity = data.fields.social_security;
      locationSui = data.fields.sui;
      locationTotal = data.fields.total;
      locationWc = data.fields.wc;
    })
    .catch(function writeError(err) {
      console.log(err);
    })
    .finally(() => {
      getContractInfo();
    });
}

function getContractInfo() {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  fetch("https://dev--wrapbook.bparker.autocode.gg/dev/get-contract/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Contract: `${contractValue}`,
    }),
  })
    .then(handleError) // skips to .catch if error is thrown
    .then((data) => {
      contractHoursBased = data.fields.hours_based;
      contractGrossWages = data.fields.gross_wages;
      contractScaleRate = data.fields.scale_rate;
    })
    .catch(function writeError(err) {
      console.log(err);
    })
    .finally(() => {
      runSetup();
    });
}

function runSetup() {
  if (contractName == null) {
    window.location.assign(`/begin`);
  }
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  fetch(`https://bparker.api.stdlib.com/wrapbook@dev/dev/positions`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Contract: `\'${contractName}\'`,
    }),
  })
    .then(handleError)
    .then((data) => {
      data.forEach((record) => {
        // clone the row and assign the id dynamically
        let newRow = dataRow.cloneNode(true);
        newRow.id = record.id;
        // set the row dom elements to variables we can write values to
        let jobTitle = newRow.querySelector(".position");
        let unionLocal = newRow.querySelector(".union-local");
        let hourlyRate = newRow.querySelector(".hourly-rate");
        let twelveHours = newRow.querySelector(".twelvel-hours");
        let fringeRate = newRow.querySelector(".fringe-rate");
        let total = newRow.querySelector(".total");

        // write the job title to the row
        jobTitle.innerText = record.fields.job_title;

        // --------------------------------------------------
        // lets do some logic to make sure we have numbers to work with
        // we're also using logic to format text to look nice if a value doesn't exist
        // --------------------------------------------------

        // --------------------------------------------------
        // Does the record have a local union value?
        // --------------------------------------------------
        if (record.fields.union_local == null) {
          unionLocal.innerText = `\u2014`;
        } else {
          unionLocal.innerText = record.fields.union_local;
        }

        // --------------------------------------------------
        // Does the record have a hourly rate value?
        // --------------------------------------------------
        if (record.fields.hourly_rate != null) {
          hourlyRate.innerText = record.fields.hourly_rate;
        } else {
          hourlyRate.innerText = `\u2014`;
        }
        // --------------------------------------------------
        // Does the record have a wage for 12hours?
        // --------------------------------------------------
        let wageRecordValue;
        let wageRecord = record.fields.twelve_hours;

        if (wageRecord == null) {
          twelveHours.innerText = `\u2014`;
          wageRecordValue = 0;
        } else {
          wageRecordValue = wageRecord;
          twelveHours.innerText = Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(record.fields.twelve_hours);
        }

        // --------------------------------------------------
        // Lets do some maths
        // ∠░ʘ̆◡ʘ̆░／
        // --------------------------------------------------

        // --------------------------------------------------
        // Social security math => (wages * social security)
        // --------------------------------------------------
        let socialCalc = wageRecordValue * locationSocialSecurity;

        // --------------------------------------------------
        // Medicare math => (wages * medicare)
        // --------------------------------------------------
        let mediCalc = wageRecordValue * locationMedicare;

        // --------------------------------------------------
        // FUTA math => (wages * FUTA)
        // --------------------------------------------------
        let futaCalc = wageRecordValue * locationFuta;

        // --------------------------------------------------
        // SUi math => (wages * SUI)
        // --------------------------------------------------
        let suiCalc = wageRecordValue * locationSui;

        // --------------------------------------------------
        // Local taxes math => (wages * local taxes)
        // --------------------------------------------------
        let localCalc = wageRecordValue * locationLocalTaxes;

        // --------------------------------------------------
        // WC math => (wages * WC)
        // --------------------------------------------------
        let wcCalc = wageRecordValue * locationWc;

        // --------------------------------------------------
        // Gross wages math => (wages * gross wages)
        // --------------------------------------------------
        let grossCalc = wageRecordValue * contractGrossWages;

        // --------------------------------------------------
        // Scale rate math => (scale rate * scale * hours)
        // --------------------------------------------------
        let scaleCalc = 100 * contractScaleRate * hoursValue;

        // --------------------------------------------------
        // Hours based math => (hours * contract hours)
        // --------------------------------------------------
        let hoursCalc = hoursValue * contractHoursBased;

        // --------------------------------------------------
        // Total math => (wages * wrapbook fee)
        // --------------------------------------------------
        let wrapCalc = wageRecordValue * wrapbookFee;

        // --------------------------------------------------
        // Fringe total math => (add up all our calculations)
        // --------------------------------------------------
        let fringeTotal =
          socialCalc +
          mediCalc +
          futaCalc +
          suiCalc +
          localCalc +
          wcCalc +
          grossCalc +
          scaleCalc +
          hoursCalc +
          wrapCalc;

        // --------------------------------------------------
        // Fringe rate math => (fringe total / wages)
        // --------------------------------------------------
        let fringeCalc = fringeTotal / wageRecordValue;

        // --------------------------------------------------
        // Let's write all our totals to the DOM
        // --------------------------------------------------

        // Fringe percentage
        if (fringeCalc == Infinity) {
          fringeRate.innerText = `\u2014`;
        } else {
          fringeRate.innerText = Number(fringeCalc).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          });
        }

        // Fringe total
        total.innerText = Intl.NumberFormat("us-EN", {
          style: "currency",
          currency: "USD",
        }).format(fringeTotal);

        // add the row to the table
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
        item.addEventListener("click", (event) => {
          calcModal.style.display = "flex";
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
          const wagesNumber = item.querySelector(".twelvel-hours").innerText;
          let wagesValue;
          if (wagesNumber === "\u2014") {
            wagesValue = 0;
          } else {
            wagesValue = Number(wagesNumber.split("$").pop());
          }
          let requestOptions = {
            method: "post",
            headers: myHeaders,
            redirect: "follow",
            body: JSON.stringify({
              taxes: [taxesData],
              wages: wagesValue,
              contracts: [contractValue],
              hours: hoursValue,
              scalerate: 100,
              wrapbookfee: 1.49,
            }),
          };

          // Make the API call with the endpoint and the options
          fetch(
            "https://bparker.api.stdlib.com/wrapbook@dev/dev/requests",
            requestOptions
          )
            .then(handleError) // If there's an error, skip to the end and display it on canvas
            .then((data) => {
              let socialsecurityFS = Number(data.socialsecurityFS) * 100;
              let socialsecurityFS2 = socialsecurityFS.toFixed(2) + "%";
              let socialsecurityRS =
                "$" + Number(data.socialsecurityRS).toFixed(2);
              document.getElementById("socialsecurityFS").textContent =
                socialsecurityFS2;
              document.getElementById("socialsecurityRS").textContent =
                socialsecurityRS;
              let medicareFS = Number(data.medicareFS) * 100;
              let medicareFS2 = medicareFS.toFixed(2) + "%";
              let medicareRS = "$" + Number(data.medicareRS).toFixed(2);
              document.getElementById("medicareFS").textContent = medicareFS2;
              document.getElementById("medicareRS").textContent = medicareRS;
              let futaFS = Number(data.futaFS) * 100;
              let futaFS2 = futaFS.toFixed(2) + "%";
              let futaRS = new Intl.NumberFormat("us-EN", {
                style: "currency",
                currency: "USD",
              }).format(data.futaRS);
              //"$" + Number(data.futaRS).toFixed(2);
              document.getElementById("futaFS").textContent = futaFS2;
              document.getElementById("futaRS").textContent = futaRS;
              let suiFS = Number(data.suiFS) * 100;
              let suiFS2 = suiFS.toFixed(2) + "%";
              let suiRS = "$" + Number(data.suiRS).toFixed(2);
              document.getElementById("suiFS").textContent = suiFS2;
              document.getElementById("suiRS").textContent = suiRS;
              let localtaxesFS = Number(data.localtaxesFS) * 100;
              let localtaxesFS2 = localtaxesFS.toFixed(2) + "%";
              let localtaxesRS = "$" + Number(data.localtaxesRS).toFixed(2);
              document.getElementById("localtaxesFS").textContent =
                localtaxesFS2;
              document.getElementById("localtaxesRS").textContent =
                localtaxesRS;
              let wcFS = Number(data.wcFS) * 100;
              let wcFS2 = wcFS.toFixed(2) + "%";
              let wcRS = "$" + Number(data.wcRS).toFixed(2);
              document.getElementById("wcFS").textContent = wcFS2;
              document.getElementById("wcRS").textContent = wcRS;
              let grosswageFS = Number(data.grosswageFS) * 100;
              let grosswageFS2 = grosswageFS.toFixed(2) + "%";
              let grosswageRS = "$" + Number(data.grosswageRS).toFixed(2);
              document.getElementById("grosswageFC").textContent = grosswageFS2;
              document.getElementById("grosswageRS").textContent = grosswageRS;
              let scaleFS = Number(data.scaleFS) * 100;
              let scaleFS2 = scaleFS.toFixed(2) + "%";
              let scaleRS = "$" + Number(data.scaleRS).toFixed(2);
              document.getElementById("scaleFS").textContent = scaleFS2;
              document.getElementById("scaleRS").textContent = scaleRS;
              let hoursFC = Number(data.hoursFC);
              let hoursFC2 = "$" + hoursFC.toFixed(2);
              let hoursRS = "$" + Number(data.hourRS).toFixed(2);
              document.getElementById("hoursFC").textContent = hoursFC2;
              document.getElementById("hoursRS").textContent = hoursRS;
              let wrapbookfee = Number(data.wrapbookfee) * 100;
              let wrapbookfee2 = wrapbookfee.toFixed(2) + "%";
              let wrapbookRS = "$" + Number(data.wrapbookRS).toFixed(2);
              document.getElementById("wrapbookfee").textContent = wrapbookfee2;
              document.getElementById("wrapbookRS").textContent = wrapbookRS;
              let fringeBasis = Number(data.fringeBASIS) * 100;
              let fringeBasis2 = fringeBasis.toFixed(2) + "%";
              let fringeRS = "$" + Number(data.fringeTOTAL).toFixed(2);
              document.getElementById("fringeBASIS").textContent = fringeBasis2;
              document.getElementById("fringeTOTAL").textContent = fringeRS;
              let unionPercent = Number(data.unionPC) * 100;
              let unionPercent2 = unionPercent.toFixed(2) + "%";
              let unionTotal = "$" + Number(data.unionTOTAL).toFixed(2);
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
}

closeModal.onclick = (e) => {
  calcModal.style.display = "none";
};

window.addEventListener("load", (event) => {
  getTaxInfo();
});
