const express = require("express");
const configRoutes = require("./routes");

const static = express.static(__dirname + "/public");

const app = express();

app.use("/public", static);

configRoutes(app);

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
