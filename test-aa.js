const baseURL = "https://dev--wrapbook.bparker.autocode.gg/dev";
const taxesData = localStorage.getItem("project-location-id");
let locationFuta,
  locationLocalTaxes,
  locationMedicare,
  locationSocialSecurity,
  locationSui,
  locationTotal,
  locationWc;

window.addEventListener("load", (event) => {
  getTaxInfo();
});

let getTaxInfo = async () => {
  try {
    const response = await fetch(`${baseURL}/get-tax/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Tax: `${taxesData}`,
      }),
    });
    const data = await response.json();
    mapTaxes(data);
  } catch (error) {
    console.log(error);
  }
};

mapTaxes = (data) => {
  locationFuta = data.fields.futa;
  locationLocalTaxes = data.fields.local_taxes;
  locationMedicare = data.fields.medicare;
  locationSocialSecurity = data.fields.social_security;
  locationSui = data.fields.sui;
  locationTotal = data.fields.total;
  locationWc = data.fields.wc;
};
