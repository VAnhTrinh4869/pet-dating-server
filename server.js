const express = require('express');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user.route');

const PORT = process.env.PORT || 3000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/users',userRoute);

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
}); 
