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

    //remove the invalidfield class for all the elements that are siblings of the clicked label from the radio button
    var removeClass = function (){
        $(this).siblings().removeClass("invalidfield");
    }

    var showErrorPopup = msg => {
        $("#title-popup").text("Ooops!");
        $("#body-popup").empty();    
        $("#body-popup").append($("<p>").text(msg));    
        $('#myModal').modal('show');
    }
    
    //creates the questions and its radio buttons elements
    questions.forEach((item, index) => {
        let $newHeader = $("<h5>").text(item);
        $questions.append($newHeader);

        let $newDiv = $(`<div class="btn-group btn-group-toggle" data-toggle="buttons">`);

        for (let i = 1; i <= 5; i++) {
            let tip = "";
            if (i === 1) tip = "(strongly disagree)";
            if (i === 5) tip = "(strongly agree)";

            let $newLabel = $(`<label class="btn btn-outline-primary">${i} ${tip}</label>`);
            $newLabel.click(removeClass);
            let $newRadio = $(`<input type="radio" required name="question${index}" value="${i}" autocomplete="off">`);

            $newLabel.append($newRadio);
            $newDiv.append($newLabel);
        }
        $questions.append($newDiv);
    });
    
    
    $("#submit").click(() => {
        event.preventDefault();

        //remove the invalidfield class from the elements that was fixed by the user after the first submission
        $("input[type=radio]").parents('label').removeClass("invalidfield");
        
        //checks whether or not are invalid fields
        if(form.checkValidity() === false){
            form.classList.add('was-validated');
            event.preventDefault();
            event.stopPropagation();
            $("input[type=radio]:invalid").parents('label').addClass("invalidfield");

            showErrorPopup("You failed to answer some questions!");

            return false;
        }      
        
        var person = {};
        
        person.name = $("#name").val().trim();
        person.photo = $("#photo").val().trim();

        person.scores = [];
        for (let i = 0; i < questions.length; i++){
            person.scores.push($(`input[name='question${i}']:checked`).val());
        }
        
        $.post("/api/friends", person, data => {
            if (data.success) {
                $("#title-popup").text("Closest Match");
                let $img = $(`<img src="${data.match.photo}">`);

                $("#body-popup").empty();
                $("#body-popup").append($("<p id='match-name' class='text-center'>").text(data.match.name));    
                $("#body-popup").append($img);

                $('#myModal').modal('show');
            }
            else {
                showErrorPopup(data.message);
            }
            
        });

    });
})