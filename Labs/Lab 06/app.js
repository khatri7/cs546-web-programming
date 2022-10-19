//here is where you'll set up your server as shown in lecture code.
const express = require("express");
const configRoutes = require("./routes");

const app = express();
app.use(express.json());
configRoutes(app);

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
