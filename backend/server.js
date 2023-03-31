const path = require("path");

const express = require("express");
const createError = require("http-errors");

const app = express();

if (process.env.NODE_ENV === "development") {
  require(path.join(__dirname, "development", "livereload.js"))(app);
}

const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "static")));

const rootRoutes = require("./routes/root");

app.use("/", rootRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((_request, _response, next) => {
  next(createError(404));
});
