var express = require('express');
var router = express.Router();

// Get controller
const index_controller = require('../controllers/index_controller');

// Routes

// GET request to view page.
router.get("/", index_controller.view_get);

// Export
module.exports = router;
