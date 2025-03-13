/**      Implement password hashing in the previous task and store in file and compare using compare method. */

let express = require("express");
let app = express();
const port = 3000;

app.use(express.json());

let usernameValidator = (req, res, next) => {
  let inputName = req.body.username;
  let usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
  if (inputName.length == 0) {
    res.send("enter username");
  } else {
    if (usernameRegex.test(inputName)) {
      next();
    } else {
      console.log("enter a valid username");
    }
  }
};

app.post("/signup", usernameValidator, async (req, res) => {
  res.send("signed successfully");
});

app.listen(port, () => {
  console.log("server started");
});
