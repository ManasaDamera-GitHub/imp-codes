let express = require("express");
let path = require("path");
let multer = require("multer");
const fs = require("fs");

let app = express();

const newPath = path.join(__dirname, "pictures");
console.log(newPath);

if (!fs.existsSync(newPath)) {
  fs.mkdir(newPath, () => {
    console.log("folder created");
  });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, newPath);
  },
  filename: function (req, file, cb) {
    cb(null, file, originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/data", upload.single("profile"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

app.listen(3000, () => {
  console.log("server created successfully");
});
