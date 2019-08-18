var friends = [
    {
        "name":"Ahmed",
        "photo":"data:image/jpeg;base64,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",
        "scores":[
            5,
            1,
            4,
            4,
            5,
            1,
            2,
            5,
            4,
            1
          ]
      }
];

module.exports = friends;