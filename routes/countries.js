const countryRoutes = (app, fs) => {

    // variables
    const dataPath = 'https://github.com/pomber/covid19/blob/master/docs/timeseries.json';

    // READ
    app.get('/countries', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
};

module.exports = countryRoutes;