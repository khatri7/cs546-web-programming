//Here is where you'll set up your server as shown in lecture code
const express = require("express");
const exphbs = require("express-handlebars");
const configRoutes = require("./routes");

const static = express.static(__dirname + "/public");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", static);

app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
	console.log("Server started on port 3000!");
});
