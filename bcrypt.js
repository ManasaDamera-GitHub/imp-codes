/*  What is bcryptjs?
--> Bcrypt is a password-hashing function designed to securely store passwords.

    WHAT IS HASHING?
--> Hashing involves converting a given key or string of characters into another value.

    Salting:    To improve security,bcrypt incorporate a random number called a salt.
                This salt is unique to each password and is attached to it before hashing. 
                The combined value (password + salt) is then passed to the hashing function.

    How bcrypt works?
--> When a user creates or updates a password, bcrypt hashes the password with a randomly generated salt and a cost factor.

--> The resulting hash includes the salt and cost factor, so it can be verified later without storing the salt separately.

--> During authentication, bcrypt hashes the input password with the stored salt and cost factor, then compares it to the stored hash.
 */

let bcrypt = require("bcrypt");
const saltRound = 10; //cost factor

// Hashing a password
let password = "password123";
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.log(err);
  } else {
    let hashedPassword = hash;

    // Verifying a password
    bcrypt.compare(password, hashedPassword, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("password match: ", res); // true or false
      }
    });
  }
});
