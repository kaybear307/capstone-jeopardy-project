//VARIABLES
const baseURL = 'https://jservice.io/'
let categoryArray = []
let randomArray = []
let startQuestion = []
let arrayQuestions = []
let playButton = document.getElementById('playButton')
let questionDiv = document.getElementById('questionDiv')
const main = document.getElementById('main')
let scoreDiv = document.createElement('div')
scoreDiv.classList.add('scoreDiv')
let score = ['0']



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
            questionDiv.append(randomArray[Math.floor(Math.random()*(randomArray.length-1))].question)
            console.log(data)
        })
      console.log(categoryArray)
      answerInput()
      scoreCard()
  });
};

function answerInput(){
    const input = document.createElement('input')
    input.classList.add('answerInput')
    input.innerText = 'type your answer here.'
    main.append(input)

    const button = document.createElement('button')
    button.classList.add('answerButton')
    button.innerText = 'Feeling Smart!'
    main.append(button)
}

function scoreCard(){
    document.body.append(scoreDiv)
    scoreDiv.innerHTML = `Score = ${score}`
}

function clickHandle(event) {
    event.preventDefault()
    console.log(input.value)
}

playButton.addEventListener('click', function(){
    gameFetch()
    playButton.style.display = 'none'
})
