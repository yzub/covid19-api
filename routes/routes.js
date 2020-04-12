const countryRoutes = require('./countries.js');

const appRouter = (app, fs) => {

    // we've added in a default route here that handles empty routes
    // at the base API url
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // run our country route module
    countryRoutes(app, fs);
};

// this line is unchanged
module.exports = appRouter;