// const path = require('path'); 

const express = require('express');
const app = express();


const mongoose = require('mongoose');
const dotenv = require("dotenv")

const userRouter = require('./routers/user');

const PORT = process.env.PORT || 3030;

// require('./db');

dotenv.config();

// app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(express.json());

const cors = require('cors');


mongoose
          .connect(process.env.MONGO_URL)

          .then(() => console.log("DB Connection Successful"))
          
          .catch(err => {
                    console.log(err);
          })


app.use(cors);


app.use(userRouter);


app.get('/', (req, res) => {
          res.send('<h2>This is from index.js file</h2>');
});


// app.use((req, res, next) => {
//           res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });


app.listen(PORT, () => {
          console.log(`server started on port: ${PORT}`);
});