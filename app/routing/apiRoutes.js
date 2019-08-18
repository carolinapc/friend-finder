var friends = require("../data/friends");

module.exports = app => {

    //list all friends as an array of json
    app.get("/api/friends", (req, res) => {
        res.json(friends); 
    });

    //add new friend and respond with the compatible friend object
    app.post("/api/friends", (req, res) => {
        var newFriend = req.body;
        var friendMatched;
        
        var lessDifference = 100; //sets an initial value higher than the greater possible number
        for(person of friends) {
            var totalDifference = 0;

            //sum all the differences on the score
            for (var i = 0; i < person.scores.length; i++){
                totalDifference += Math.abs(parseInt(person.scores[i]) - parseInt(newFriend.scores[i])); 
            }
            
            //check if the current total difference is less than less one
            if (totalDifference < lessDifference) {
                lessDifference = totalDifference;
                friendMatched = person;
            }

        };

        friends.push(newFriend);
        res.json(friendMatched);
        
    });
}