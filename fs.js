let express = require("express");
const fs = require("fs");
let app = express();
// console.log(app);

app.get("/", (req, res) => {
  res.send("hello world");
  let data = fs.readFile("./new.json", "utf8");
  res.send(data);
});

app.post("/names", async (req, res) => {
  try {
    let inputData = req.body.name;
    let existData = JSON.parse(await fs.readFile("./new.json", "utf8"));
    let isExistAlready = existing.find((x, y) => {
      return x.name == inputData.name;
    });
    console.log(isExistAlready, "exist");
    if (isExistAlready) {
      res.status(400).send({ message: "username already exists" });
    } else {
      existData.push(inputData);
      let updatedData = existData;
      await fs.writeFile("./new.json", JSON.stringify(updatedData));
      res.send("data inserted");
    }
  } catch (error) {
    res.send(error);
  }
});

app.listen(3000, () => {
  console.log("server created");
});
