const path = require("path");

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  require(path.join(__dirname, "development", "livereload.js"))(app);
}

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

const routes = require("./routes/static.js");
const testRoutes = require("./routes/testing/index.js");

app.use("/", routes.homeRoutes);
app.use("/games", routes.gameRoutes);
app.use("/lobby", routes.lobbyRoutes);
app.use("/profile", routes.profileRoutes);
app.use("/sign-up", routes.signUpRoutes);
app.use("/test", testRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((_request, _response, next) => {
  next(createError(404));
});
