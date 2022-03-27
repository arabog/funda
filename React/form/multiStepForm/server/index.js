const express = require('express');
const cors = require('cors');
const authRouter = require('./routers/auth');
// const userRouter = require('./routers/user');

require('./db');



const app = express();
const PORT = process.env.PORT || 3060;



// const path = require('path'); 
// app.use(express.static(path.join(__dirname, '..', 'build')));



app.use(express.json());
app.use(cors());
app.use(authRouter);
// app.use('/api/users', userRouter);





app.get('/', (req, res) => {
          res.send('<h2>This is from index.js filesss</h2>');
});



// app.use((req, res, next) => {
//           res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });



app.listen(PORT, () => {
          console.log(`server started on port: ${PORT}`);
});

