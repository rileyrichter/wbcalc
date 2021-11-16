// Gets a reference to the form element
const form = document.getElementById("form-submit");

// Adds a listener for the "submit" event.
form.addEventListener("click", function (evt) {
  evt.preventDefault();
  const productionState = document.getElementById("production-state").value;
  const unionValue = document.getElementById("union").value;
  const contractValue = document.getElementById("contract").value;
  const wagesValue = Number(document.getElementById("wages").value);
  const hoursValue = Number(document.getElementById("hours").value);
  const scaleValue = Number(document.getElementById("scale").value);

  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }; //handler function that throws any encountered error

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
        scalerate: scaleValue,
        wrapbookfee: 0.0149,
      },
    ]),
  };

  fetch(
    "https://v1.nocodeapi.com/rileyrichter/airtable/ciKZoDbzdFgWoHYz?tableName=Requests",
    requestOptions
  )
    .then(handleError)
    .then((data) => {
      let socialsecurityFS = Number(data[0].fields.socialsecurityFS) * 100;
      let socialsecurityFS2 = socialsecurityFS.toFixed(2) + "%";
      let socialsecurityRS =
        "$" + Number(data[0].fields.socialsecurityRS).toFixed(2);
      document.getElementById("socialsecurityFS").textContent =
        socialsecurityFS2;
      document.getElementById("socialsecurityRS").textContent =
        socialsecurityRS;
      let medicareFS = Number(data[0].fields.medicareFS) * 100;
      let medicareFS2 = medicareFS.toFixed(2) + "%";
      let medicareRS = "$" + Number(data[0].fields.medicareRS).toFixed(2);
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
      let localtaxesRS = "$" + Number(data[0].fields.localtaxesRS).toFixed(2);
      document.getElementById("localtaxesFS").textContent = localtaxesFS2;
      document.getElementById("localtaxesRS").textContent = localtaxesRS;
      let wcFS = Number(data[0].fields.wcFS) * 100;
      let wcFS2 = wcFS.toFixed(2) + "%";
      let wcRS = "$" + Number(data[0].fields.wcRS).toFixed(2);
      document.getElementById("wcFS").textContent = wcFS2;
      document.getElementById("wcRS").textContent = wcRS;
      let grosswageFS = Number(data[0].fields.grosswageFS) * 100;
      let grosswageFS2 = grosswageFS.toFixed(2) + "%";
      let grosswageRS = "$" + Number(data[0].fields.grosswageRS).toFixed(2);
      document.getElementById("grosswageFC").textContent = grosswageFS2;
      document.getElementById("grosswageRS").textContent = grosswageRS;
      let scaleFS = Number(data[0].fields.scaleFS) * 100;
      let scaleFS2 = scaleFS.toFixed(2) + "%";
      let scaleRS = "$" + Number(data[0].fields.scaleRS).toFixed(2);
      document.getElementById("scaleFS").textContent = scaleFS2;
      document.getElementById("scaleRS").textContent = scaleRS;
      let hoursFC = Number(data[0].fields.hoursFC) * 100;
      let hoursFC2 = "$" + hoursFC.toFixed(4);
      let hoursRS = "$" + Number(data[0].fields.hoursRS).toFixed(2);
      document.getElementById("hoursFC").textContent = hoursFC2;
      document.getElementById("hoursRS").textContent = hoursRS;
      console.log(data);
    });
});
