const express = require("express");
const createError = require("http-errors");

const app = express();

const PORT = process.env.PORT || 3000;

const rootRoutes = require("./routes/root");

app.use("/", rootRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use((_request, _response, next) => {
  next(createError(404));
});
