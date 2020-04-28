const countryRoutes = (app, fs) => {

  // variables
    const dataPath = './data/timeseries.json';

// helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    // READ
    app.get('/countries', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    app.get(`/countries/:name`, (req, res) => {

        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const countryName = req.params.name;
            var jsonObj = JSON.parse(data)

            if (!jsonObj[countryName]) {
                res.status(500).send('Country not found.')
            } else {
                res.send(jsonObj[countryName]);
            }
    
        });
    });


    app.get(`/countries/:name/confirmed`, (req, res) => {

        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const countryName = req.params.name;
            var jsonObj = JSON.parse(data)

            if (!jsonObj[countryName]) {
                res.status(500).send('Country not found.')
            } else {
                res.json({ "Confirmed": jsonObj[countryName][jsonObj[countryName].length - 1].confirmed });
            }
        });
      
    });


    app.get(`/countries/:name/deaths`, (req, res) => {

        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const countryName = req.params.name;
            var jsonObj = JSON.parse(data)

            if (!jsonObj[countryName]) {
                res.status(500).send('Country not found.')
            } else {
                res.json({ "Deaths": jsonObj[countryName][jsonObj[countryName].length - 1].deaths });
            }
        });
      
    });

    app.get(`/countries/:name/recovered`, (req, res) => {

        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            const countryName = req.params.name;
            var jsonObj = JSON.parse(data)

            if (!jsonObj[countryName]) {
                res.status(500).send('Country not found.')
            } else {
                res.json({ "Recovered": jsonObj[countryName][jsonObj[countryName].length - 1].recovered });
            }
        });
      
    });
};

module.exports = countryRoutes;