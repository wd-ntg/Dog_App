const express = require("express");

const breedController = require("../controllers/breedController");

const router = express.Router();

router.get("/categories", breedController.getBreedsByCategory);
router.get("/list", breedController.getAllBreeds);
router.get("/detail", breedController.getBreed);

module.exports = router;
