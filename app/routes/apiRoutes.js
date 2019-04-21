var friends = require("../model/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var match = {
            name: "",
            photo: "",
            similarities: Infinity
        };

        var userData = req.body;
        var userAnswers = userData.scores;

        var difference;

        for (var i = 0; i < friends.length; i++) {
            var currentFriend = friends[i];
            difference = 0;

            for (var a = 0; a < currentFriend.scores.length; a++) {
                var currentFriendScore = currentFriend.scores[a];
                var currentUserScore = userAnswers[a];

                difference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (difference <= match.similarities) {
                match.name = currentFriend.name;
                match.photo = currentFriend.photo;
                match.similarities = difference;
            }
        }
        friends.push(userData);

        res.json(match);
    });
};