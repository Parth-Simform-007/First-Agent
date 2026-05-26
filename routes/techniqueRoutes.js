// 🍥 Technique Routes — the path each request follows through the Hidden Leaf
const express = require("express");
const router = express.Router();
const {
  addTechnique,
  getAllTechniques,
  getTechniqueById,
  deleteTechnique,
} = require("../controllers/techniqueController");

router.post("/", addTechnique);
router.get("/", getAllTechniques);
router.get("/:id", getTechniqueById);
router.delete("/:id", deleteTechnique);

module.exports = router;
