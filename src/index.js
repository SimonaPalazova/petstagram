const app = require('express')();
const dbConnection = require('./config/dbConfig')

const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

require('./config/express')(app);
require('./config/routes')(app);

//app.use(errorHandler);

dbConnection()
    .then(() => console.log('DB Connected successfully!'))
    .catch(err => console.log('DB error:', err))

app.listen(3000, console.log('Listening on port 3000! Now its up to you...'));
