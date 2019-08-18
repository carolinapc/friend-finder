var friends = require("../data/friends");

module.exports = app => {

    //list all friends as an array of json
    app.get("/api/friends", (req, res) => {
        res.json(friends); 
    });

    //add new friend and respond with the compatible friend object
    app.post("/api/friends", (req, res) => {
        let newFriend = req.body;
        let friendMatched;

        let lessDifference = 100; //sets an initial value higher than the greater possible number
        friends.forEach(friend => {
            let totalDifference = 0;

            //sum all the differences on the score
            for (let i = 0; i < 10; i++){
                totalDifference += Math.abs(friend.score[i] - newFriend[i]); 
            }
            //check if the current total difference is less than less one
            if (totalDifference < lessDifference) {
                lessDifference = totalDifference;
                friendMatched = friend;
            }

        });

        friends.push(newFriend);

        res.json(friendMatched);

    });
}