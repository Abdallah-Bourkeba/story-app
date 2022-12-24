const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const { engine } = require("express-handlebars");
const connectDB = require("./config/db");

// Load Config File
dotenv.config({ path: "./config/config.env" });

// Passport Config
require("./config/passport")(passport);

connectDB();

const app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(
	methodOverride(function (req, res) {
		if (req.body && typeof req.body === "object" && "_method" in req.body) {
			// look in urlencoded POST bodies and delete it
			let method = req.body._method;
			delete req.body._method;
			return method;
		}
	})
);

// Logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// HandleBars Helpers
const {
	formatDate,
	stripTags,
	truncate,
	editIcon,
	select,
} = require("./helpers/hbs");

// handleBars
app.engine(
	".hbs",
	engine({
		helpers: {
			formatDate,
			stripTags,
			truncate,
			editIcon,
			select,
		},
		defaultLayout: "main",
		extname: ".hbs",
	})
);
app.set("view engine", ".hbs");

// Sessions
app.use(
	session({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
	})
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
	res.locals.user = req.user || null;
	next();
});

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stories", require("./routes/stories"));

const port = process.env.PORT || 5000;

app.listen(
	port,
	console.log(`Server Run In: ${process.env.NODE_ENV} Mode On Port ${port}...`)
);
