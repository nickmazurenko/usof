const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const http = require("http");
const index = require("./src/routers/index");
const config = require("./src/config/keys.config");
const session = require("express-session");
const { admin, adminRouter } = require("./adminPanel");
const memoryStore = new session.MemoryStore();
const express = require("express");

const app = express();

app.use(compression());

app.use(morgan("dev"));

app.use(cors());
app.use(
	session({
		secret: config.JWT.SECRET,
		store: memoryStore,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 10 },
	})
);
app.use(admin.options.rootPath, adminRouter);

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
