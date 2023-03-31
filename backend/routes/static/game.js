const express = require("express");

const router = express.Router();

router.get("/:id", (request, response) => {
  const { id } = request.params;

  if (id !== "42") {
    response.redirect("/");
  } else {
    response.render("game", { title: "Term Project (Game)", id });
  }
});

module.exports = router;
