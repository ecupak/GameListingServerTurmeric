// Operations to execute for each http request.
const Game = require('../models/game');
const asyncHandler = require('express-async-handler');


// POST request to register a new game listing.
// When player begins hosting a game.
exports.games_post = asyncHandler(async (req, res, next) => {
    const new_game = new Game({
        ip4_address:        req.body.ip4_address,
        current_players:    req.body.current_players,
        max_players:        req.body.max_players
    });
    
    await new_game.save().then( (result) => {
        if (result) res.status(200);
        else res.status(500);
        
        res.send();
    });
});


// PUT request to update a game listing.
// When players join/leave game; updates current players.
exports.games_put = asyncHandler(async (req, res, next) => {
    const filter = { ip4_address:       req.body.ip4_address };
    const update = { current_players:   req.body.current_players };

    await Game.findOneAndUpdate(filter, update).then( (result) => {
        if (result) res.status(200);
        else res.status(500);
        
        res.send();
    });
});


// DELETE request on a game listing.
// When player stops hosting.
exports.games_put = asyncHandler(async (req, res, next) => {
    const filter = { ip4_address: req.body.ip4_address };    

    await Game.deleteOne(filter).then( (result) => {
        if (result) res.status(200);
        else res.status(500);
        
        res.send();
    });
});


// GET request to view game listings.
// When player searches for games to join.
exports.games_get = asyncHandler(async (req, res, next) => {
    // Only get games that can be joined.
    const games_with_vacancy = await Game.find({ current_players: {$lt: 4} });

    // Game data to return to client.
    let game_list = { };
    
    // Populate game data.
    let index = 0;
    for await (const game of games_with_vacancy) {
        game_list[index] = { 
            "ip":               game.ip4_address, 
            "current_players":  game.current_players 
        };

        ++index;
    }

    res.status(200);
    res.send(game_list);
});