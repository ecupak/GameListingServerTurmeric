// Create
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const game_schema = new schema({
    ip4_address: String,
    current_players: Number,
    max_players: Number
});

// Export
module.exports = mongoose.model("game", game_schema);