let locator = 0;
let score = 0;
let timerID;
let barID;
let height, barTop;

let userAnswers = [];


let barWidth;
function generateQuestionsIntoTheDOM() {
    locator++;
    startTimer();

    let main = document.querySelector("main");

    let virtualFragment = document.createDocumentFragment(); 

    let questionsContainer = document.createElement("DIV");
    questionsContainer.classList.add("questions-container");

    let questionsElement;

    for (let index = 0; index < questions.length; index++) {
        
        questionsElement = document.createElement("DIV");
        questionsElement.classList.add("single-question");

        let title = document.createElement("H3");
        title.innerHTML = `Question ${index+1}/${questions.length}`; 
        title.classList.add("title");
        
        let question = document.createElement("P");
        question.innerHTML = questions[index].question;
        question.classList.add("question");

        let choices = document.createElement("DIV");
        choices.classList.add("choices");

        for (let i = 0; i < questions[index].choices.length; i++) {
            let choice = document.createElement("P");
            choice.innerHTML = questions[index].choices[i];
            choice.classList.add("choice");

            choices.appendChild(choice);
        }
        choices.addEventListener("click", userChoice);
        questionsElement.appendChild(title);
        questionsElement.appendChild(question);
        questionsElement.appendChild(choices);

        questionsContainer.appendChild(questionsElement);
    }

    virtualFragment.appendChild(questionsContainer);

    let nextBtn = document.createElement("DIV");
    nextBtn.innerHTML = "Next"
    nextBtn.classList.add("next");

    virtualFragment.appendChild(nextBtn);

    main.innerHTML = "";
    nextBtn.addEventListener("click", nextBtnAction);
    main.appendChild(virtualFragment);

    
}

function addEventToTheStartQuiz() {
    document.querySelector(".start-container").addEventListener("click", generateQuestionsIntoTheDOM);
}

function startTimer() {
    timerID = setInterval(function(){
        let timer = document.querySelector(".timer");
        let time = Number(timer.textContent);
        timer.textContent = time - 1;

        if(time === 60){
            height = "50%";
            barTop = "10px";
        }else if(time === 59){
            height = "60%";
            barTop = "7px";
        }else if(time === 58){
            height = "70%";
            barTop = "6px";
        }else if(time === 57){
            height = "80%";
            barTop = "4px";
        }else if(time === 56){
            height = "90%";
            barTop = "2px";
        }else{
            height = "100%";
            barTop = "0px";
        }

        if(time === 1){
            stopTimer();
        }
    }, 1000);


    barID = setInterval(function(){
        let bar = document.querySelector(".bar");
        bar.style.height = height;
        bar.style.top = barTop;
        
        barWidth = Number(bar.style.width.split("%")[0]);
        bar.style.width = `${0.16667 + barWidth}%`;
    },100);
}

function displayResult(){
    let scorePoint = 0;

    console.log(userAnswers);
    
    let main = document.querySelector("main");

    let virtualFragment = document.createDocumentFragment();
    
    let result = document.createElement("DIV");
    result.classList.add("result");

    let score = document.createElement("H2");
    score.classList.add("score");

    
    let choicesResult = document.createElement("DIV");
    choicesResult.classList.add("choice-results");

    for (let index = 0; index < questions.length; index++) {
        
        let p = document.createElement("P");
        p.classList.add("choice-result");
        
        let icon = document.createElement("I");
        icon.classList.add("far");

        if(userAnswers[index] === questions[index].answer){
            scorePoint++;
            p.classList.add("correct");
            icon.classList.add("fa-check-circle");
        } else if(questions[index].choices.includes(userAnswers[index])){
            p.classList.add("wrong");
            icon.classList.add("fa-times-circle");
        } else if(userAnswers[index] === undefined){
            p.classList.add("unanswered");
            icon.classList.add("fa-times-circle");
        }

        p.appendChild(icon);
        p.innerHTML += questions[index].question;
        
        choicesResult.appendChild(p);
    }

    let className;
    if(scorePoint > 2)
        className= "high-score";
    else 
        className = "low-score";
    
    score.classList.add(className);
    let resetBtn = document.createElement("DIV");
    resetBtn.classList.add("reset-btn");
    resetBtn.innerHTML = "Reset";

    resetBtn.addEventListener("click", function(){
        location.reload();
    });
    score.innerHTML = `${scorePoint} of ${questions.length}`;
    result.appendChild(score);
    result.appendChild(choicesResult);
    result.appendChild(resetBtn);

    virtualFragment.appendChild(result);

    main.innerHTML = "";
    main.appendChild(result);
    
}

function stopTimer(){
    clearInterval(timerID);
    clearInterval(barID);
    displayResult();
}
let answeredCounter = 0;
function nextBtnAction(eve) {
    let selectedElements = document.querySelectorAll(".user-choice");
    if(selectedElements.length < locator ){
        alert("Please, You Need to Choose an Answer!!!");
        return;
    }else{
        console.log(locator);
        
        userAnswers.push(selectedElements[locator-1].innerHTML);
        console.log(selectedElements[locator-1].innerHTML);
        
    }
    locator++;
    
    if(locator === 6){
        stopTimer();
        return;
    }
        

    if(locator === 5){
        eve.target.innerHTML = "Submit";
    }
        
    let questionSlider = document.querySelector(".questions-container");
    let slideValue = questionSlider.style.left.split("%")[0];
    questionSlider.style.left = `${slideValue-100}%`;
    
}

function userChoice(eve){
    if(eve.target.classList.contains("choice")){
        let choicesContainer = eve.target.parentNode;
        for (const choice of choicesContainer.children) {
            choice.classList.remove("user-choice");
        }
        eve.target.classList.add("user-choice");
        
    }

}

addEventToTheStartQuiz();