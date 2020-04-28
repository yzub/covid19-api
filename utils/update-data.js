const fetch = require("node-fetch");
const fs = require("fs");

async function updateData() {
  let resultsArray = [];
  const downloadPath = "data/global.json";
  await fetch("https://api.covid19api.com/all")
    .then((response) => response.json())
    .then((data) => {
      const result = {};
      data.map((item) => {
        if (result[item.Date]) {
          const current = result[item.Date];
          result[item.Date] = {
            Confirmed: current.Confirmed + item.Confirmed,
            Recovered: current.Recovered + item.Recovered,
            Deaths: current.Deaths + item.Deaths,
            Active: current.Active + item.Active,
          };
        } else {
          result[item.Date] = {
            Confirmed: item.Confirmed,
            Recovered: item.Recovered,
            Deaths: item.Deaths,
            Active: item.Active,
          };
        }
      });

      resultsArray = Object.keys(result).map((i) => {
        return {
          Confirmed: result[i].Confirmed,
          Recovered: result[i].Recovered,
          Deaths: result[i].Deaths,
          Active: result[i].Active,
          Date: i,
        };
      });
    })
    .catch((error) => console.error(error));
  fs.writeFileSync(downloadPath, JSON.stringify(resultsArray));
}

module.exports = updateData;
