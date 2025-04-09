import express from "express";
import fs from "fs";

const app = express();
const usersFilePath = "users.json";
app.use(express.json());
const port = 3000;
const readFileData = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    return error.message || [];
  }
};

app.get("/", (req, res) => {
  res.json(readFileData());
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const getUserById = readFileData().find((user) => user.id == id);
  res.json(getUserById ? getUserById : "user not found");
});

app.post("/", (req, res) => {
  const data = readFileData();
  console.log(req.body);
  const id = data.length ? data[data.length - 1].id + 1 : 1;
  data.push({ ...req.body, id });
  fs.writeFileSync(usersFilePath, JSON.stringify(data));
  res.send(data);
});

app.put("/:id", (req, res) => {
  const data = readFileData();
  const id = req.params.id;
  data[id - 1] = { ...req.body, id };
  fs.writeFileSync(usersFilePath, JSON.stringify(data));
  res.send(data);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const data = readFileData().filter((user) => user.id != id);
  fs.writeFileSync(usersFilePath, JSON.stringify(data));
  res.send(data);
});
app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});
