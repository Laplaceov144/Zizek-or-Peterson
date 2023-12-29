
// AJAX fetch function
async function loadData() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}


// DOM elements
const quote = document.getElementById('quote');
const buttons = document.querySelectorAll('.btn');
const scoreBox = document.querySelector('.score-box');
const scoreText = document.querySelector('#score');
const zizekBtn = document.querySelector('.zizek-btn');
const ptrsnBtn = document.querySelector('.ptrsn-btn');
const zizekImg = document.querySelector('#zizek-img');
const ptrsnImg = document.querySelector('#ptrsn-img');
const quiz = document.getElementById('quiz');

// function that shuffles the order of quotes
function shuffle(arr) {
  for(let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// set starting quote
let pickedNumber = 0;
let currentAuthor = "";


// main async function
window.addEventListener('DOMContentLoaded', async function () {
  const data = await loadData();
  
  // function that shows a quote based on randomly picked number
  function showQuote(n) {
    const item = data[n];
    quote.textContent = `"${item.quote}"`;
    currentAuthor = item.author;
  }
  
  // shuffle the order of quotes
  let numbers = Array.from({ length: data.length}, (_, index) => index);
  numbers = shuffle(numbers);
  const item = data[pickedNumber];
  quote.textContent = `"${item.quote}"`;
  currentAuthor = item.author;

  // updating score
  let score = 0;

  zizekBtn.addEventListener('click', function () {
    if(currentAuthor == 'zizek') {
      score++;
      scoreBox.style.backgroundColor = "green";
     } else { 
      scoreBox.style.backgroundColor = "red"; 
      zizekImg.classList.remove("img-transform");
    }
    scoreText.innerText = score;
  });

  ptrsnBtn.addEventListener('click', function () {
    if(currentAuthor == 'peterson') {
      score++;
      scoreBox.style.backgroundColor = "green";
    } else { 
      scoreBox.style.backgroundColor = "red"; 
    }
    scoreText.innerText = score;
  });

  // show random quote, picking from a set of quotes so they don't repeat
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function () {
      if(currentAuthor == 'zizek') {
        zizekImg.classList.add('img-transform');
        ptrsnImg.classList.remove('img-transform');
      }
      if(currentAuthor == 'peterson') {
        ptrsnImg.classList.add('img-transform');
        zizekImg.classList.remove('img-transform');
      }
      
      if(numbers.length == 22) {
        quiz.style.display = 'block';
      } else {
        quiz.style.display = 'none';
      }

      if(numbers.length > 0 && numbers[0] != 0) {
        pickedNumber = numbers.shift();
      } else if(numbers[0] == 0) {
        numbers.shift();
        pickedNumber = numbers.shift();
      } else {
        alert(`You scored ${score} points!`);
        location.reload();
      }
    
      showQuote(pickedNumber);
    });
  });

});









