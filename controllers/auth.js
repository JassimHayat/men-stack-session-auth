const User = require("../models/user.js");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


router.get('/sign-up', (req,res) => {
    res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {

    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const username = req.body.username;

    /// check the password vfor validation
    if (password !== confirmPassword) {
        return res.send("Password do not match");
      }
/// see if the user exsits in the db

    const userInDatabase = await User.findOne({ username });
    if (userInDatabase) {
    return res.send("username or passwored is invalid.");
    }

/// create new regiaster


//1.encrypt password
const hashedPassword = await bcrypt.hash(password, 10);
2// replace the password
req.body.password= hashedPassword
//3. save the user
// validation logic

const user = await User.create(req.body);
res.send(`Thanks for signing up ${user.username}`);


});
  

module.exports = router;
