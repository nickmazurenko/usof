const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const http = require("http");
const index = require("./src/routers/index");
const config = require("./src/config/keys.config");

const express = require("express");

const app = express();

app.use(compression());

app.use(morgan("dev"));

app.use(cors());

app.use(helmet());

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", index);

const server = http.createServer(app);
server.listen(config.SERVER.PORT, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log(`Server is running on port ${config.SERVER.PORT}`);
	}
});
