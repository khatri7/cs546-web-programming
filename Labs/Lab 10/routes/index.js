const routes = require("./routesAPI");

const constructorMethod = (app) => {
	app.use("/", routes);

	app.use("*", (req, res) => {
		res.status(404).json({ message: "Not Found" });
	});
};

module.exports = constructorMethod;
