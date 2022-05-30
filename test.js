let newId = "rec4iclh7A7kzjWN9";

fetch("https://dev--wrapbook.bparker.autocode.gg/dev/get-contract/", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    Contract: `${newId}`,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
