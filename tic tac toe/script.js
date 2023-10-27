
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
//need array of placeholders

let options=["","","","","","","","",""]

//place current status
let currentPlayer="X";


//boolean variable to keep track running(will stwitch when function run)
let running=true;

initializeGame()

//take care of any set up before we start
function initializeGame(){
cells.forEach(cell=>cell.addEventListener("click", cellClicked))
restartBtn.addEventListener("click",restartGame)
statusText.textContent =`${currentPlayer}'s turn`

}

function cellClicked(){
    //this refers to whatever cell we click on
    const cellIndex=this.getAttribute("cellIndex")
    if(options[cellIndex]!="" || !running){
        return;
    }
    updateCell(this,cellIndex)
    checkWinner()
}


function updateCell(cell,index){
    //updating placeholders
   options[index] =currentPlayer
   cell.textContent=currentPlayer
}


function changePlayer(){
    currentPlayer=(currentPlayer=="X") ? "O" : "X"
    statusText.content=`${currentPlayer}'s turn`
}


function checkWinner(){
    //somebody win we flip it to true
    let roundWon=false

    //store each of the array with temperory variable
//add each row
for(let i = 0; i < winConditions.length; i++){
    const condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
//iterating with all in the array, check 0 1 2 are all same add win or check the other condition
//we found empty space we continue skip the iteration
if(cellA == "" || cellB == "" || cellC == ""){
    continue;
}
//make sure all the same character
if(cellA == cellB && cellB == cellC){
    roundWon = true;
//break the condition
break;
}
}


//if won
//game is over

if(roundWon){
    statusText.textContent = `${currentPlayer} wins!`
    running = false;
}
else if(!options.includes("")){
    statusText.textContent = `Draw!`
    running = false
}
else{
    changePlayer()
}

}


function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""]
    statusText.textContent = `${currentPlayer}'s turn`
    //clear each cell
    cells.forEach(cell => cell.textContent = "")
    running = true;
}
