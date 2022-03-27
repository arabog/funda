const User = require('../models/user');
const express = require('express');
const router = express.Router();



router.get("/api/users", async (req, res) => {
          const users = await User.find();

          console.log(users)

          res.send(users);
})


module.exports = router;