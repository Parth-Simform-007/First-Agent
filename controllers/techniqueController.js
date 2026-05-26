// 🍥 Technique Controller — the hand signs that shape each jutsu request
const store = require("../data/store");

// POST /api/techniques — Register a new technique in the scroll
const addTechnique = (req, res) => {
  const { name, rating, creator, dateFound } = req.body;

  if (!name || rating === undefined || rating === null || !creator || !dateFound) {
    return res.status(400).json({
      error: "All fields are required: name, rating, creator, dateFound",
    });
  }

  if (typeof rating !== "number" || isNaN(rating)) {
    return res.status(400).json({
      error: "All fields are required: name, rating, creator, dateFound",
    });
  }

  const technique = {
    id: store.nextId++,
    name,
    rating,
    creator,
    dateFound,
  };

  store.techniques.push(technique);
  return res.status(201).json(technique);
};

// GET /api/techniques — Retrieve all techniques from the scroll
const getAllTechniques = (req, res) => {
  return res.status(200).json(store.techniques);
};

// GET /api/techniques/:id — Retrieve a single technique by its ID
const getTechniqueById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const technique = store.techniques.find((t) => t.id === id);

  if (!technique) {
    return res.status(404).json({ error: "Technique not found" });
  }

  return res.status(200).json(technique);
};

// DELETE /api/techniques/:id — Remove a technique from the scroll
const deleteTechnique = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  const index = store.techniques.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Technique not found" });
  }

  const deleted = store.techniques.splice(index, 1)[0];
  return res.status(200).json(deleted);
};

module.exports = {
  addTechnique,
  getAllTechniques,
  getTechniqueById,
  deleteTechnique,
};
