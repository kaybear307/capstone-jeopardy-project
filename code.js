//VARIABLES
const baseURL = 'https://jservice.io/'
let categoryArray = [] //Used in fetch to store a random category
let randomArray = [] //Used in fetch to store the selected category and stores the arrays up to 100
let startQuestion = [] // Used in fetch to store the first displayed question array.
let randomNum = 0
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
let scoreDiv = document.createElement('div')
scoreDiv.classList.add('scoreDiv')
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
            startQuestion = randomArray[randomNum]
            questionDiv.append(startQuestion.question)
            console.log(randomArray)
            console.log(startQuestion.answer)
            
        })
      console.log(categoryArray)
      answerInput()
    
      
  });
  
};

function answerInput(){
    input.classList.add('answerInput')
    input.placeholder = 'type your answer here.'
    main.append(input)
    
    
    submitButton.classList.add('submitButton')
    submitButton.innerText = 'Feeling Smart!'
    main.append(submitButton)

    submitButton.addEventListener('click', function(event){
        event.preventDefault()
        let userAnswer = input.value
        console.log(userAnswer)
        formToDisapear()
        if (userAnswer.toLowerCase() === startQuestion.answer.toLowerCase()) {
            console.log('true')
            score += 1
            scoreCard()
            return correctAnsDiv.style.display='inline'
        } else {
            console.log('false')
            score = 0
            scoreCard()
            return loserDiv.style.display ='inline'
        }
        
    })
    input.value = ''
    
}

function scoreCard(){
    document.body.append(scoreDiv)
    scoreDiv.innerHTML = `Score = ${score}`
    console.log("score" + score)
}

// submitButton.addEventListener('click', function(){
//     formToDisapear()
// })

nextButton.addEventListener('click', function(){
    answerInput()
    randomNum += 1
    startQuestion = randomArray[randomNum]
    questionDiv.innerHTML = ''
    questionDiv.append(startQuestion.question)
    console.log(startQuestion.answer)
    winnerDisapear()
    formToInline()
    
})

playAgain.addEventListener('click', function(){
    questionDiv.innerHTML = ''
    gameFetch()
    loserDisapear()
    formToInline()
    console.log(playAgain)
})

function winnerDisapear(){
    nextButton.style.display = 'none'
    correctAnsDiv.style.display = 'none'
}

function loserDisapear(){
    loserDiv.style.display = 'none'
    playAgain.style.display = 'none'
}

function formToInline(){
    input.style.display = 'inline'
    submitButton.style.display = 'inline'
}

function formToDisapear(){
    input.style.display = 'none'
    submitButton.style.display = 'none'
}

playButton.addEventListener('click', function(){
    gameFetch()
    playButton.style.display = 'none'
})
