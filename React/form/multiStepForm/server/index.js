const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require("dotenv")

const userRouter = require('./routers/user');

const PORT = process.env.PORT || 3030;

// require('./db');

dotenv.config();

const cors = require('cors');


app.use(express.json());


mongoose
          .connect(process.env.MONGO_URL)

          .then(() => console.log("DB Connection Successful"))
          
          .catch(err => {
                    console.log(err);
          })


app.use(cors);


app.use(userRouter);


app.listen(PORT, () => {
          console.log(`server started on port: ${PORT}`);
});