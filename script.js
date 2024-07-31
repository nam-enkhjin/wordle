const body = document.body;

const board = document.getElementById('board');
board.style.display = 'flex';
board.style.flexDirection = 'column';
board.style.alignItems = 'center';
const words = [
    'there',
    'their',
    'about',
    'would',
    'these',
    'other',
    'words',
    'could',
    'write',
    'first',
    'water',
    'after',
    'where',
    'right',
    'think',
    'three',
    'years'
];
const index = Math.floor(Math.random() * 16) + 1;

let correctWord = words[index]

let myAudio = new Audio("game-music-loop-7-145285.mp3");
myAudio.loop = true;
myAudio.play();

const arr = [];
function setUp(){
    for(let i = 0; i<6; i++){
        const row = document.createElement('div');
        row.style.display = 'flex';
        row.style.flexDirection = 'row';
        board.appendChild(row);
        for(let j = 0; j<5; j++){
            const square = document.createElement('div');
            square.setAttribute("class", `word-${i}-${j}`)
            square.style.height = '52px';
            square.style.width = '52px';
            square.style.backgroundColor = 'rgb(15,15,15)';
            square.style.borderColor = 'rgb(48, 48, 48)';
            square.style.borderStyle = 'solid';
            square.style.margin = '3px';
            square.style.textAlign = 'center';
            square.style.fontSize = '35px';
            square.style.color = 'white';

            square.innerText = '';
            row.appendChild(square);
        }
    }
}

setUp();



let userInput ='';
let attempt = 0;
let wordPosition = 0
// document.addEventListener(    "keydown",
//     (event) => {
//         const letter = event.key;
//         if(letter.length <6 ){
//             userInput+= letter
//         }
//     })


const keysList = document.getElementsByClassName("ke");

for( const key in  keysList){
    const el = keysList[key]
    el.addEventListener("click", function(e){
        const letter = el.dataset.letter;
 
        console.log(`word-${attempt}-${wordPosition}`, userInput)
        if(letter === "enter"){
            checkWord();
        }
        else if(letter === "delete" && wordPosition >= 0 && userInput.length >= 0){
            const box = document.getElementsByClassName(`word-${attempt}-${wordPosition}`)[0]
            userInput = userInput.substring(0, userInput.length-1);
            wordPosition = wordPosition <= 0 ? 0 : wordPosition -1;
            box.textContent = ' ';  
            //deletes the word from the userInput
            
        } 
        else if(userInput.length <=5  && letter != "delete"){
            if(userInput.length +1 != 6){
                userInput+= letter;
                const box = document.getElementsByClassName(`word-${attempt}-${wordPosition}`)[0]
                box.textContent = letter;
                console.log(wordPosition)
                wordPosition = wordPosition >= 3 ? 4 : wordPosition +1
            }
        }
    })
}

function checkWord(){
    if( userInput.length < 5){
        return;
    }
    if(userInput===correctWord){
        gameOver();
    }
    for(let g = 0; g<5; g++){
        const box = document.getElementsByClassName(`word-${attempt}-${g}`)[0];

        for(let c = 0; c<5; c++){
            
            if(correctWord[c]===userInput[g]&&c!=g){
                box.style.backgroundColor = '#b59f3b';
                box.style.borderColor = '#b59f3b';
            
                break;
            }
            else if(correctWord[c]===userInput[g] && c==g){
                box.style.backgroundColor = '#538d4e';
                box.style.borderColor = '#538d4e';
            
                break;
            }
            else{
                box.style.backgroundColor = '#3a3a3c';
                box.style.borderColor = '#3a3a3c';
            }
    }}

    startLine()

console.log("duuuslooooos")
     //NEEDS ANIMATION
}

function startLine(){
    userInput =""; 
    attempt++;
    wordPosition = 0;
}
function gameOver(){
    const popUp = document.createElement('div');
    popUp.style.zIndex = '1';
    popUp.style.width = '70px';
    popUp.style.height = '30px';
    popUp.style.position = 'fixed';
    popUp.style.backgroundColor = 'white';
    popUp.style.textAlign = 'center';
    popUp.style.borderRadius = '10px';
    popUp.style.paddingTop = '10px';
    popUp.textContent = 'Phew';

    board.appendChild(popUp);
}