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
        
        try {

            //----fields validation
            if (newFriend.name.trim() === "") {
                throw new Error("Name is required");
            }
            if (newFriend.photo.trim() === "") {
                throw new Error("Link to the photo image is required");
            }
            if (newFriend.scores.length !== 10) {
                throw new Error("You must send all the 10 questions score");
            }

            newFriend.scores.map(x => {
                if (x === "") throw new Error("All the scores must be filled");
                if (isNaN(x)) throw new Error("All the scores must be numbers");
                if (x > 5 || x < 1) throw new Error("All the scores must be from 1 to 5");
                if (!Number.isInteger(Number(x))) throw new Error("All the scores must be integers");
            });
            //----

            var lessDifference = 100; //sets an initial value higher than the greater possible number
            for (var x = 0; x < friends.length; x++){
                var person = friends[x];
                var totalDifference = 0;

                //sum all the differences on the score
                for (var i = 0; i < person.scores.length; i++){
                    totalDifference += Math.abs(Number(person.scores[i]) - Number(newFriend.scores[i])); 
                }
                
                //check if the current total difference is less than less one
                if (totalDifference < lessDifference) {
                    lessDifference = totalDifference;
                    friendMatched = person;
                }

            };

            friends.push(newFriend); //add newFriend into the Friends array
            res.json({success:true, match: friendMatched});
        } catch (err) {
            
            res.json({success:false, message: err.message})
        }
    
    });
}