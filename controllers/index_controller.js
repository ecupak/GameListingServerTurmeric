const Host = require('../models/game');
const asyncHandler = require('express-async-handler');

// GET request of number of active games (hosts).
exports.view_get = asyncHandler(async (req, res, next) => {
    const hosts = await Host.countDocuments({}).exec();

    res.render("index", {
        title: "Mana Mash",
        host_count: hosts
    });
});