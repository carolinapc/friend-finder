const questions = [
    "I make friends easily.",
    "I love large parties.",
    "I believe in the importance of art.",
    "I get angry easily.",
    "I experience my emotions intensely.",
    "I prefer variety to routine.",
    "I like to solve complex problems.",
    "I often eat too much.",
    "I try to follow the rules.",
    "I like to visit new places."
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

    var disableSubmit = () => {
        $("#submit").attr("disabled", true);
        $("#submit").html('<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...').addClass('disabled');
    }
    var enableSubmit = () => {
        $("#submit").removeAttr("disabled");
        $("#submit").removeClass("disabled");
        $("#submit").html(`<i class="fas fa-check"></i> Submit`);
    }
    
    //creates the questions and its radio buttons elements
    questions.forEach((item, index) => {
        let $newHeader = $("<h5>").text(`${index+1}. ${item}`);
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
        
        disableSubmit();
        
        //remove the invalidfield class from the elements that was fixed by the user after the first submission
        $("input[type=radio]").parents('label').removeClass("invalidfield");
        
        //checks whether or not are invalid fields
        if(form.checkValidity() === false){
            form.classList.add('was-validated');
            event.preventDefault();
            event.stopPropagation();
            $("input[type=radio]:invalid").parents('label').addClass("invalidfield");

            showErrorPopup("You failed to answer some questions!");

            enableSubmit();

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

                //show the modal with the match info
                $("#body-popup").empty();
                $("#body-popup").append($("<p id='match-name' class='text-center'>").text(data.match.name));    
                $("#body-popup").append($img);
                $('#myModal').modal('show');

                //clear the fields
                $("#name").val("");
                $("#photo").val("");
                for (let i = 0; i < questions.length; i++){
                    $(`input[name='question${i}']`).prop("checked", false);
                    $(`input[name='question${i}']`).parents("label").removeClass("active");
                }
                $("#form").removeClass("was-validated");

            }
            else {
                showErrorPopup(data.message);
            }

            enableSubmit();
        });

    });
})