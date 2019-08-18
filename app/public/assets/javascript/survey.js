const questions = [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    "Question 6",
    "Question 7",
    "Question 8",
    "Question 9",
    "Question 10"
];


$(document).ready(() => {
    var $questions = $("#questions");
    
    questions.forEach((item, index) => {
        let $newHeader = $("<h5>").text(item);
        $questions.append($newHeader);

        for (let i = 1; i <= 5; i++){
            let $newDiv = $(`<div class="form-check form-check-inline">`);
            let $newRadio = $(`<input class="form-check-input question${index}" type="radio" name="question${index}" value="${i}">`);
            let $newLabel = $(`<label class="form-check-label" for="question${index}"> ${i} </label>`);

            $newDiv.append($newRadio);
            $newDiv.append($newLabel);
            $questions.append($newDiv);
        }

    });

    $("#submit").click(() => {
        event.preventDefault();
        var person = {};

        person.name = $("#name").val();
        person.photo = $("#photo").val();

        person.scores = [];
        for (let i = 0; i < questions.length; i++){
            person.scores.push($(`input[name='question${i}']:checked`).val());
        }

        console.log(person);
        $.post("/api/friends", person, data => {
            
            console.log(data); 
        });

    });
})