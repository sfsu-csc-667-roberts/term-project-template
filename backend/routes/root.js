const express = require("express");
const router = express.Router();

router.get("/", (_request, response) => {
  response.render("home", { title: "667 Term Project" });
});

module.exports = router;
