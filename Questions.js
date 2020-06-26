class Question {
    constructor(question, choices, answer){
        this.question = question;
        this.choices = choices;
        this.answer = answer;
    }
}

var question1 = new Question("what CSS stand for?", [
    "Cascading Style Sheet", 
    "Cisco Style Sheet", 
    "Cascading Side Sheet"], 
    "Cascading Style Sheet");

var question2 = new Question("What HTML stand for?", [
    "HyperText Markup Language", 
    "HyperTransform Markup Language", 
    "HeaderText Managable Language"], 
    "HyperText Markup Language");

var question3 = new Question("what is a function?", [
    "A function is a block of code designed to perform task", 
    "Cunstructor of the class in JavaScript", 
    "Calculation method"], 
    "A function is a block of code designed to perform task");

var question4 = new Question("What are the two methods of forms transfer?", [
    "Get and receive", 
    "Get and post", 
    "Post and recieve"], 
    "Get and post");

var question5 = new Question("What should be the very last thing in an HTML document?", [
    "The heading", 
    "Title", 
    "Body"], 
    "Body");

var questions = [question1, question2, question3, question4, question5];