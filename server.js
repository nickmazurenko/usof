const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const http = require("http");
const index = require("./server/routers/index");

const express = require("express");

const app = express();

app.use(compression());

app.use(morgan("dev"));

app.options("*", cors());
app.use(cors({ origin: "http://localhost:5000" }));

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/api", index);

const PORT = 5000;

const server = http.createServer(app);

server.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
