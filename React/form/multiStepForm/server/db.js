const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config();


mongoose
          .connect(process.env.MONGO_URL, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true
          })

          .then(() => console.log("DB Connection Successful"))
          
          .catch(err => {
                    console.log(err);
          })