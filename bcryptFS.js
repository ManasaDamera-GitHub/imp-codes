let bcrypt = require("bcrypt");
let fs = require("fs");

const password = "password";
const saltRound = 10;

// bcrypt.hash(password, saltRound, (err, hash) => {
//   if (err) {
//     console.log(err);
//   } else {
//     fs.writeFile("./hash.txt", hash, (err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("password hashed and stored successfully");
//       }
//     });
//   }
// });

fs.readFile("./hash.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err, "error occured");
  } else {
    let hashedPassword = data;
    bcrypt.compare(password, hashedPassword, (err, res) => {
      if (err) {
        console, log(err);
      } else {
        // console.log(res);
        if (res) {
          console.log("correct password");
        } else {
          console.log("incorrect password");
        }
      }
    });
  }
});
