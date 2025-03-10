let express = require("express");
let app = express();

app.use(express.json());

let usernameValidation = (req, res, next) => {
  let inputName = req.body.username;
  let usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
  if (inputName.length <= 0) {
    res.status(404).send("Enter your username");
  } else if (usernameRegex.test(inputName)) {
    next();
  } else {
    res.status(404).send("Invalid username");
  }
};

let passwordValidator = (req, res, next) => {
  let inputPassword = req.body.password;
  let passRegex = /^[a-zA-Z0-9@]{3,15}$/;
  if (inputPassword.length <= 0) {
    res.status(404).send("Enter password");
  } else if (passRegex.test(inputPassword)) {
    next();
  } else {
    res.status(404).send("Enter valid password");
  }
};

app.post("/signup", usernameValidation,passwordValidator, (req, res) => {
  res.send("user registered successfully");
});
app.post("/login", passwordValidator,passwordValidator, (req, res) => {
  res.send("login successful");
});
app.listen(3000, () => {
  console.log("server created");
});
