const question = document.getElementById('question')
const options = Array.from(document.getElementsByClassName('option-text'))
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion ={};
let acceptingAnswers = false;
let score= 0;
let questionCounter = 0;
let availableQuestions = [];

let questions =[];

fetch("music.json").then(res=>{
    console.log(res);
    return res.json()
}).then(loadedQuestions =>{
    questions = loadedQuestions;
    startGame();
});


//CONSTANTS

const correctBonus = 10;
const maxQuestions =10;

const startGame = () => {
    currentQuestion = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();
};

const getNewQuestion = () =>{
 
    if(availableQuestions.length < 0 || questionCounter >= maxQuestions){
        //go to end page
        localStorage.setItem('lastScore',score);
        location.assign('./end.html')
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${maxQuestions}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    options.forEach((option)=>{
        const number = option.dataset['number']
        option.innerText = currentQuestion['option'+number]
    })
    availableQuestions.splice(questionIndex,1)
    acceptingAnswers = true;

};

options.forEach((option)=>{
    option.addEventListener('click',evt =>{
        if(!acceptingAnswers) return
        acceptingAnswers = false;

        const selectedOption = evt.target;
        const selectedAnswer = selectedOption.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedOption.parentElement.classList.add(classToApply);

        if(classToApply === 'correct'){
            incrementScore(correctBonus);
        }
        //to delay the removal of css class
        setTimeout(()=>{
            selectedOption.parentElement.classList.remove(classToApply)
            getNewQuestion()
        },1000);
    })
})

const incrementScore = (num) =>{
    score +=num;
    scoreText.innerText = score;
}



