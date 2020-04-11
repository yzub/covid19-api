const fetch = require('node-fetch');
const fs = require('fs');

async function getData() {
      const downloadPath = 'data/timeseries.json';
      const data = await fetch('https://pomber.github.io/covid19/timeseries.json')
          .then(response => response.json())
          .then(json => JSON.stringify(json))
          .catch(error => console.error(error))
      fs.writeFileSync(downloadPath, data);
    };

module.exports = getData;