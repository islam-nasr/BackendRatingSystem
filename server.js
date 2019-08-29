// import libraries
const express = require("express");
const cors = require("cors");
// passport middleware
// import middleware
const loggerMiddleware = require("./api/middleware/logger");
// import db configuration
const sequelize = require("./config/DBConfig");
// create the app
const app = express();
// import route handlers
const equations = require("./api/routes/equation.router");
const instances = require("./api/routes/instance.router");
const objects = require("./api/routes/object.router");
const ranks = require("./api/routes/rank.router");
const ratings = require("./api/routes/rating.router");
const scales = require("./api/routes/scale.router");
const serviceList = require("./api/routes/serviceList.router");

// init middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(loggerMiddleware);
// test postgres connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to postgres 💪 .");
  })
  .catch(err => {
    console.error("Unable to connect to postgres 😳 .", err);
  });
// Direct to Route Handlers
// routes
//app.use("/api/v1/RatingSystem/equations", equations);
app.use("/api/v1/RatingSystem/instances", instances);
app.use("/api/v1/RatingSystem/objects", objects);
app.use("/api/v1/RatingSystem/ranks", ranks);
app.use("/api/v1/RatingSystem/ratings", ratings);
app.use("/api/v1/RatingSystem/scales", scales);
app.use("/", serviceList);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const eraseDatabaseOnSync = false;
sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(() => console.log("Synced models with database 💃 ."))
  .then(() => {
    // walletPopulate()
  })
  .catch(error =>
    console.log("Could not sync models with database 🤦 .", error)
  );
const port = process.env.PORT || 5002;
app.listen(port, () => console.log(`Server up and running on ${port} 👍 .`));
