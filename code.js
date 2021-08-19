//VARIABLES
const baseURL = 'https://jservice.io/'
let categoryArray = [] //Used in fetch to store a random category
let randomArray = [] //Used in fetch to store the selected category and stores the arrays up to 100
let startQuestion = [] // Used in fetch to store the first displayed question array.
let randomNum = 0
let index = []
// let randomNum = Math.floor(Math.random()*(randomArray.length-1))

let playButton = document.getElementById('playButton')
let questionDiv = document.getElementById('questionDiv')
const main = document.getElementById('main')
let input = document.createElement('input')
let submitButton = document.createElement('button')
let correctAnsDiv = document.getElementById('correctAnsDiv')
let nextButton = document.getElementById('nextButton')
let loserDiv = document.getElementById('loserDiv')
let playAgain = document.getElementById('playAgainButton')
let scoreDiv = document.getElementById('scoreDiv')
let score = 0

//FUNCTIONS
function gameFetch(){
fetch(`${baseURL}api/random`)
  .then(response => response.json())
  .then(categoryData => {
      categoryArray = categoryData[0].category_id

      fetch(`${baseURL}api/clues?category=${categoryArray}`)
        .then(response => response.json())
        .then(data => {
            randomArray = data
            console.log(randomArray)
            questionGrab()
        })
    });
};

function questionGrab(){
    console.log("category: " + categoryArray)
    startQuestion = randomArray[Math.floor(Math.random()*(randomArray.length-1))]
    questionDiv.append(startQuestion.question)
    console.log("answer: " + startQuestion.answer)
    answerInput()
    currentIndex()
    correctAnsDiv.style.display='none'
    loserDiv.style.display ='none'
}

function answerInput(){
    input.classList.add('answerInput')
    input.placeholder = 'type your answer here.'
    main.append(input)
    input.value = ''

    submitButton.classList.add('submitButton')
    submitButton.innerText = 'Feeling Smart!'
    main.append(submitButton)
}

function scoreCard(){
    scoreDiv.innerHTML = `Score = ${score}`
 }

function currentIndex(){
    index = randomArray.findIndex( element => {
        if (element.answer === startQuestion.answer) {
          return true;
        }
    });
    console.log('Current index is: ' + index);
}

function correctAnswers(){
   return correctAnsDiv.style.display='inline'
}

function incorrectAnswers(){
    return loserDiv.style.display ='inline'
}

function formToInline(){
    input.style.display = 'inline'
    submitButton.style.display = 'inline'
}

function formToDisapear(){
    input.style.display = 'none'
    submitButton.style.display = 'none'
}

// Event Listeners
submitButton.addEventListener('click', function(event){
        event.preventDefault()

        let userAnswer = input.value
        console.log("user answer: " + userAnswer)
        formToDisapear()
        if (userAnswer.toLowerCase() === startQuestion.answer.toLowerCase()) {
            score += 1
            scoreCard()
            correctAnswers()
        } else {
            score = 0
            scoreCard()
            incorrectAnswers()
        }
        randomArray.splice(index, 1)
        console.log(randomArray)
})

nextButton.addEventListener('click', function(){
    // randomNum += 1
    randomNum = Math.floor(Math.random()*(randomArray.length-1))
    questionDiv.innerHTML = ''
    formToInline()
    questionGrab()
})

playAgain.addEventListener('click', function(){
    questionDiv.innerHTML = ''
    gameFetch()
    formToInline()
})

playButton.addEventListener('click', function(){
    gameFetch()
    playButton.style.display = 'none'
})