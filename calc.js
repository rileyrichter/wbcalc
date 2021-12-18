// On page load and when the DOM is ready
window.addEventListener("DOMContentLoaded", (event) => {
  // Set the union select field as a var
  let unionSelect = document.getElementById("union");
  // When the union select field is changed, perform this function
  let contractSelect = document.getElementById("contract");
  unionSelect.onchange = function () {
    // Set val as the current value of the union select
    let val = this.value;
    // If they select SAG, then
    if (val == "SAG") {
      // Set all the SAG options in an array
      let sagOptions = [
        {
          text: "SAG Commercial Agreement",
          value: "recJcUe1ingx1E9IC",
        },
        {
          text: "SAG Feature Principle Performer",
          value: "recIZuhNI3x062FSm",
        },
        {
          text: "SAG Feature Background Performer",
          value: "recEhLkttesl6nGGD",
        },
        {
          text: "SAG New Media Principle Performer",
          value: "recP4r9xdeIRtWcGV",
        },
        {
          text: "SAG New Media Background Performer",
          value: "recgc46eTpiEOIdy1",
        },
        {
          text: "SAG Sound Recording Performer",
          value: "receoQJ0Vmjj0fG3j",
        },
        {
          text: "SAG Video Game Principle Performer",
          value: "recI81gISPSPT6oiU",
        },
      ];
      // Show the contract options
      document.getElementById("contract-wrapper").style.display = "block";
      // Hide the hours and scale options
      document.getElementById("hours-scale").style.display = "none";
      // Remove any options that are already set
      document.getElementById("contract").options.length = 0;
      // Set the options of the select field to SAG
      sagOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } // If they select Iatse
    else if (val == "Iatse") {
      // Set all the IATSE options in an array
      let iatseOptions = [
        {
          text: "IATSE Music Video Under 500K Budget",
          value: "recPV7ftdEyawqrGM",
        },
        {
          text: "IATSE Music Video Over 500K Budget",
          value: "recpX1KKlgZug7UUW",
        },
        {
          text: "IATSE NON-AICP Commercial LA",
          value: "rec6Y6SAV1FWQbNLm",
        },
        {
          text: "IATSE AICP Commercial LA",
          value: "recGVp1TlnSW3HIKL",
        },
        {
          text: "IATSE 161",
          value: "recl7DhdXldFAhvDg",
        },
        {
          text: "IATSE 600",
          value: "recyQpdx2Gsd6OY2c",
        },
        {
          text: "IATSE 52",
          value: "recKchZAzKlpyEeZ6",
        },
        {
          text: "IATSE 829",
          value: "rec4bdVpcJNwUlSBw",
        },
        {
          text: "IATSE 798",
          value: "rec7CUeMBWZirirlo",
        },
      ];
      // Show the contract options
      document.getElementById("contract-wrapper").style.display = "block";
      // Show the hours and scale option
      document.getElementById("hours-scale").style.display = "flex";
      // Remove any options that are already set
      document.getElementById("contract").options.length = 0;
      // Set the options of the select field to IATSE
      iatseOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } // If they select Teamsters
    else if (val == "Teamsters") {
      // Set all the IATSE options in an array
      let teamsterOptions = [
        {
          text: "Teamsters AICP Commercial LA Drivers",
          value: "recSEWRh5YcLuo9xm",
        },
        {
          text: "Teamsters NON-AICP Commercial LA Drivers",
          value: "recp4Olh4lSZuAvOd",
        },
        {
          text: "Teamsters AICP Commercial LA Location Managers",
          value: "recxhDtZmODu7c2Ev",
        },
        {
          text: "Teamsters NON-AICP Commercial Location Managers",
          value: "recKhcNMMnl2tQfXR",
        },
        {
          text: "Teamsters Music Video Under 500K Budget Drivers",
          value: "rec7rTTc0siJi4OCX",
        },
        {
          text: "Teamsters Music Video Over 500K Budget Drivers",
          value: "rec6i5q4hjMyI34xO",
        },
        {
          text: "Teamsters Music Video Under 500K Budget Location Managers",
          value: "recqFDjSqxRZetBbl",
        },
        {
          text: "Teamsters Music Video Over 500K Budget Location Managers",
          value: "recUUKUnWTMxcJ7U1",
        },
        {
          text: "Teamsters Music Video Music Video Agreement",
          value: "recMr4PRZHlj4WF5a",
        },
        {
          text: "Teamsters Music Video Commercial AICP Agreement",
          value: "recqCROKTBz5umzyQ",
        },
      ];
      // Show the contract options
      document.getElementById("contract-wrapper").style.display = "block";
      // Show the hours and scale option
      document.getElementById("hours-scale").style.display = "flex";
      // Remove any options that are already set
      document.getElementById("contract").options.length = 0;
      // Set the options of the select field to Teamsters
      teamsterOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } // If they select DGA
    else if (val == "DGA") {
      // Set all the DGA options in an array
      let dgaOptions = [
        {
          text: "DGA Commercial AICP Agreement",
          value: "recn2B0dJl28OJNwL",
        },
      ];
      // Show the contract options
      document.getElementById("contract-wrapper").style.display = "block";
      // Hide the hours and scale options
      document.getElementById("hours-scale").style.display = "none";
      // Remove any options that are already set
      document.getElementById("contract").options.length = 0;
      // Set the options of the select field to Teamsters
      dgaOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } // If they select PHBP
    else if (val == "PHBP") {
      // Set all the PHBP options in an array
      let phbpOptions = [
        {
          text: "PHBP Commercial Agreement",
          value: "recECrrLitsvmIMPw",
        },
      ];
      // Show the contract options
      document.getElementById("contract-wrapper").style.display = "block";
      // Hide the hours and scale options
      document.getElementById("hours-scale").style.display = "none";
      // Remove any options that are already set
      document.getElementById("contract").options.length = 0;
      // Set the options of the select field to Teamsters
      phbpOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    } // If they select nonunion
    else if (val == "nonunion") {
      // Set all the non-union options in an array
      let nuOptions = [
        {
          text: "Non-Union",
          value: "recnvHz9k8uf20ovK",
        },
      ];
      // Hide the contract options
      document.getElementById("contract-wrapper").style.display = "none";
      // Hide the hours and scale options
      document.getElementById("hours-scale").style.display = "none";
      // Set a nonunion option for contract to make the API call work as expected
      // Remove any options that are already set
      document.getElementById("contract").options.length = 0;
      // Set the options of the select field to Teamsters
      nuOptions.forEach((option) =>
        contractSelect.add(
          new Option(option.text, option.value, option.selected)
        )
      );
    }
  };
});

// Sets the form as a variable
const form = document.getElementById("form-submit");

// Adds a listener for the "submit" event.
form.addEventListener("click", function (evt) {
  // Don't let the form submit
  evt.preventDefault();
  // Hide the form
  document.getElementById("formwrapper").style.display = "none";
  // Show the loading div
  document.getElementById("loading").style.display = "flex";

  // Get the values in the form and set them as variables, converting some to numbers for the API calls
  const productionState = document.getElementById("production-state").value;
  const unionValue = document.getElementById("union").value;
  const contractValue = document.getElementById("contract").value;
  const wagesValue = Number(document.getElementById("wages").value);
  const hoursValue = Number(document.getElementById("hours").value);
  const scaleValue = Number(document.getElementById("scale").value);

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
        scalerate: scaleValue,
        wrapbookfee: 0.0149,
      },
    ]),
  };

  // Make the API call with the endpoint and the options
  fetch(
    "https://v1.nocodeapi.com/rileyrichter/airtable/ciKZoDbzdFgWoHYz?tableName=Requests",
    requestOptions
  )
    .then(handleError) // If there's an error, skip to the end and display it on canvas
    .then((data) => {
      // This is just a pattern to parse the data and write it to the canvas
      // Get the social security percent and do the math to make it a percent
      // Set it to 2 decimals and add the percentage sign
      // Get the dollar amount and put a dollar sign in front and set it to 2 decimals
      // Get the elements form percentage and amount and write to canvas
      // Rinse and repeat for each different element
      // Note this varies a little for some lines
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
      let hoursFC = Number(data[0].fields.hoursFC);
      let hoursFC2 = "$" + hoursFC.toFixed(4);
      let hoursRS = "$" + Number(data[0].fields.hourRS).toFixed(2);
      document.getElementById("hoursFC").textContent = hoursFC2;
      document.getElementById("hoursRS").textContent = hoursRS;
      let wrapbookfee = Number(data[0].fields.wrapbookfee) * 100;
      let wrapbookfee2 = wrapbookfee.toFixed(2) + "%";
      let wrapbookRS = "$" + Number(data[0].fields.wrapbookRS).toFixed(2);
      document.getElementById("wrapbookfee").textContent = wrapbookfee2;
      document.getElementById("wrapbookRS").textContent = wrapbookRS;
      let fringeBasis = Number(data[0].fields.fringeBASIS) * 100;
      let fringeBasis2 = fringeBasis.toFixed(2) + "%";
      let fringeRS = "$" + Number(data[0].fields.fringeTOTAL).toFixed(2);
      document.getElementById("fringeBASIS").textContent = fringeBasis2;
      document.getElementById("fringeTOTAL").textContent = fringeRS;
      let unionPercent = Number(data[0].fields.unionPC) * 100;
      let unionPercent2 = unionPercent.toFixed(2) + "%";
      let unionTotal = "$" + Number(data[0].fields.unionTOTAL).toFixed(2);
      document.getElementById("unionTOTAL").textContent = unionTotal;
      document.getElementById("unionPC").textContent = unionPercent2;
    })
    .catch(function writeError(err) {
      // catch the error and write it to the page
      document.getElementById("loading").style.display = "none";
      document.getElementById("error").style.display = "block";
      document.getElementById("status").textContent = err;
    })
    .finally(() => {
      // Show the results section and hide the original form section
      document.getElementById("data").style.display = "none";
      document.getElementById("result").style.display = "block";
    });
});

// Click the button to refresh the page and start over
document.getElementById("again").addEventListener("click", () => {
  location.reload();
});
