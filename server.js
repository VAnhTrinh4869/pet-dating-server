require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const authMiddleware = require('./middlewares/auth.middleware');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const petRoute = require('./routes/pet.route');
const apiRoute = require('./routes/api.route')

const PORT = process.env.PORT || 3000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/api/users', authMiddleware.authentication, userRoute);
app.use('/api/pets', authMiddleware.authentication, petRoute);
app.use('/api', authMiddleware.authentication, apiRoute);
app.use('/api', authRoute);

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
}); 
