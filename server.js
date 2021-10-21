const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/client/build/"));

app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
