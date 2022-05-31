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
const downloadButton = document.getElementById("download");
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
let allObjects = [];

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
    .then(handleError)
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
    .then(handleError)
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
        let newRow = dataRow.cloneNode(true);
        newRow.id = record.id;
        let jobTitle = newRow.querySelector(".position");
        let unionLocal = newRow.querySelector(".union-local");
        let hourlyRate = newRow.querySelector(".hourly-rate");
        let twelveHours = newRow.querySelector(".twelvel-hours");
        let fringeRate = newRow.querySelector(".fringe-rate");
        let total = newRow.querySelector(".total");
        jobTitle.innerText = record.fields.job_title;
        if (record.fields.union_local == null) {
          unionLocal.innerText = `\u2014`;
        } else {
          unionLocal.innerText = record.fields.union_local;
        }
        if (record.fields.hourly_rate != null) {
          hourlyRate.innerText = record.fields.hourly_rate;
        } else {
          hourlyRate.innerText = `\u2014`;
        }
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
        let socialCalc = wageRecordValue * locationSocialSecurity;
        let mediCalc = wageRecordValue * locationMedicare;
        let futaCalc = wageRecordValue * locationFuta;
        let suiCalc = wageRecordValue * locationSui;
        let localCalc = wageRecordValue * locationLocalTaxes;
        let wcCalc = wageRecordValue * locationWc;
        let grossCalc = wageRecordValue * contractGrossWages;
        let scaleCalc = 100 * contractScaleRate * hoursValue;
        let hoursCalc = hoursValue * contractHoursBased;
        let wrapCalc = wageRecordValue * wrapbookFee;
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
        let unionTotal = grossCalc + scaleCalc + hoursCalc;
        let unionBasis = unionTotal / wageRecordValue;
        let fringeCalc = fringeTotal / wageRecordValue;
        if (fringeCalc == Infinity) {
          fringeRate.innerText = `\u2014`;
        } else {
          fringeRate.innerText = Number(fringeCalc).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          });
        }
        total.innerText = Intl.NumberFormat("us-EN", {
          style: "currency",
          currency: "USD",
        }).format(fringeTotal);
        let newObject = {
          name: record.fields.job_title,
          social_basis: Number(locationSocialSecurity).toLocaleString(
            undefined,
            {
              style: "percent",
              minimumFractionDigits: 2,
            }
          ),
          social_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(socialCalc),
          medicare_basis: Number(locationMedicare).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
          medicare_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(mediCalc),
          futa_basis: Number(locationFuta).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
          futa_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(futaCalc),
          sui_basis: Number(locationSui).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
          sui_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(suiCalc),
          local_taxes_basis: Number(locationLocalTaxes).toLocaleString(
            undefined,
            {
              style: "percent",
              minimumFractionDigits: 2,
            }
          ),
          local_taxes_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(localCalc),
          wc_basis: Number(locationWc).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
          wc_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(wcCalc),
          gross_wages_basis: contractGrossWages,
          gross_wages_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(grossCalc),
          scale_rate_basis: Number(contractScaleRate).toLocaleString(
            undefined,
            {
              style: "percent",
              minimumFractionDigits: 2,
            }
          ),
          scale_rate_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(scaleCalc),
          hours_based_basis: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(contractHoursBased),
          hours_based_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(hoursCalc),
          wrapbook_fee_basis: Number(wrapbookFee).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
          wrapbook_fee_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(wrapCalc),
          fringe_rate_basis: Number(fringeCalc).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
          fringe_rate_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(fringeTotal),
          union_total_basis: Number(unionBasis).toLocaleString(undefined, {
            style: "percent",
            minimumFractionDigits: 2,
          }),
          untion_total_result: Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
          }).format(unionTotal),
        };

        allObjects.push(newObject);

        root.appendChild(newRow);
      });
    })
    .catch(function writeError(err) {
      console.log(err);
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
          const handleError = (response) => {
            if (!response.ok) {
              throw Error(` ${response.status} ${response.statusText}`);
            } else {
              return response.json();
            }
          };
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
          fetch(
            "https://bparker.api.stdlib.com/wrapbook@dev/dev/requests",
            requestOptions
          )
            .then(handleError)
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
  downloadButton.addEventListener("click", download);
});

function convertToCSV(objArray) {
  let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line != "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
    items.unshift(headers);
  }
  let jsonObject = JSON.stringify(items);
  let csv = this.convertToCSV(jsonObject);
  let exportedFilenmae = fileTitle + ".csv" || "export.csv";
  let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    let link = document.createElement("a");
    if (link.download !== undefined) {
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function download() {
  var headers = {
    name: "Name",
    social_basis: "Social Security Basis",
    social_result: "Social Security Result",
    medicare_basis: "Medicare Basis",
    medicare_result: "Medicare Result",
    futa_basis: "FUTA Basis",
    futa_result: "FUTA Result",
    sui_basis: "Supplemental Unemployment Insurance Basis",
    sui_result: "Supplemental Unemployment Insurance Result",
    local_taxes_basis: "Local Taxes Basis",
    local_taxes_result: "Local Taxes Result",
    wc_basis: "Workers Compensation Basis",
    wc_result: "Workers Compensation Result",
    gross_wages_basis: "Gross Wages Basis",
    gross_wages_result: "Gross Wages Result",
    scale_rate_basis: "Scale Rate Basis",
    scale_rate_result: "Scale Rate Result",
    hours_based_basis: "Hours Based Basis",
    hours_based_result: "Hours Based Result",
    wrapbook_fee_basis: "Wrapbook Fee Basis",
    wrapbook_fee_result: "Wrapbook Fee Result",
    fringe_rate_basis: "Fringe Rate Basis",
    fringe_rate_result: "Fringe Rate Result",
    union_total_basis: "Union Total Basis",
    untion_total_result: "Union Total Result",
  };

  let newDate = new Date().toLocaleTimeString();
  let fileTitle = `Wrapbook Rate Sheet ${newDate}`;
  exportCSVFile(headers, allObjects, fileTitle);
}
