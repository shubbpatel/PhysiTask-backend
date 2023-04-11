const express = require("express");
const router = express.Router();
const {
//   getProject,
  updateProject,
//   deleteProject,
} = require("../controllers/projects");

// router.get("/:id", getProject);
router.put("/projectupdate/:id", updateProject);
// router.delete("/projectdelete/:id", deleteProject);

module.exports = router;
