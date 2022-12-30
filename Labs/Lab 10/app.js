const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const configRoutes = require("./routes");

const SECRET = "thismyreallysecuresecret";
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	session({
		name: "AuthCookie",
		secret: SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// logging middleware
const loggingMiddleware = (req, _res, next) => {
	console.log(
		`[${new Date().toUTCString()}]: ${req.method} ${req.path} (${
			req.session.user ? "Authenticated User" : "Non-Authenticated User"
		})`
	);
	next();
};
app.use("/", loggingMiddleware);

// authentication middleware
const authenticationMiddleware = (req, res, next) => {
	if (!req.session.user)
		return res.status(403).render("forbiddenAccess", {
			title: "Forbidden",
		});
	next();
};
app.use("/protected", authenticationMiddleware);

configRoutes(app);

app.listen(PORT || 3000, () => {
	console.log(`Server started on port ${PORT || 3000}!`);
});
