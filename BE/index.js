const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const statusRoute = require('./routes/status')
const bankRoute = require('./routes/bank')
const gameRoute = require('./routes/gameProduct')
const bankAccountRoute = require('./routes/bankAccount')
const gameAccountRoute = require('./routes/gameAccount')
const transactionRoute = require('./routes/transaction')
const telegramRoute = require('./routes/telegram')


const app = express();



app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use(express.static('dist'));



//ROUTES
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/status", statusRoute);
app.use("/v1/bank", bankRoute);
app.use("/v1/gameproduct", gameRoute);
app.use("/v1/bankaccount", bankAccountRoute);
app.use("/v1/gameaccount", gameAccountRoute);
app.use("/v1/transaction", transactionRoute);
app.use("/v1/telegram", telegramRoute);
dotenv.config();

mongoose.connect(process.env.MONGODB_URL);

app.listen(8000, () => {
    console.log('Server is Running')
});



//AUTHENTICATION


//AUTHORIZATION