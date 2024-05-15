// Create
const express = require('express');
const router = express.Router();

// Get controller
const games_controller = require('../controllers/games_controller');

// Routes


router.post("/", games_controller.games_post);


router.put("/", games_controller.games_put);


router.delete("/", games_controller.games_put);


router.get("/", games_controller.games_get);

// Export
module.exports = router;