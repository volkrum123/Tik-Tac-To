
let P1 = document.getElementById('P1');
let name1 = document.createElement('h2');
name1.textContent = `Player1`;
P1.appendChild(name1);
let symbol = document.createElement('p');
symbol.textContent = `X`;
P1.appendChild(symbol);

let P2 = document.getElementById('P2');
let name2 = document.createElement('h2');
name2.textContent = `Player2`;
P2.appendChild(name2);
let symbol2 = document.createElement('p');
symbol2.textContent = `O`;
P2.appendChild(symbol2);

let divContainer = document.getElementById('Board');

for(var i =0;i<9;i++)
{
    var subcontainer = document.createElement('div');
    subcontainer.className='cell';
    subcontainer.setAttribute('cellIndex',`${i}`);
    divContainer.appendChild(subcontainer);
}

const cells = document.querySelectorAll('.cell');
const statustext = document.querySelector('#status');
const restartbtn = document.querySelector('#restartbtn');
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

let options=["","","","","","","","",""];
let currentplayer = document.createElement('p');
currentplayer.innerHTML='X';
let running = false;

initializeGame();
function initializeGame(){
   
cells.forEach(cell => cell.addEventListener("click",cellClicked));
restartbtn.addEventListener("click",restartGame);
statustext.textContent = `${currentplayer.textContent}'s turn`;
running=true;
}
function cellClicked(){

    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != ""|| !running){
        return;
    }
   
    updateCell(this,cellIndex);
    changePlayer();
    checkWinner();
}
function updateCell(cell,index){
   if(currentplayer.textContent=="X"){
    options[index] = currentplayer.textContent;
  cell.innerHTML = `<span id="Px">${currentplayer.textContent}</span>`;
   }
   else{
    options[index] = currentplayer.textContent;
    cell.innerHTML = `<span id="Po">${currentplayer.textContent}</span>`;
   }

}
function changePlayer(){

   
    currentplayer.textContent = (currentplayer.textContent =="X") ? "O" : "X";

   // statustext.textContent = `${currentplayer} turn`;
   if(currentplayer.textContent=="X"){
    statustext.innerHTML=`<span id="Px">${currentplayer.textContent}'s</span> turn`
   }
   else{
    statustext.innerHTML=`<span id="Po">${currentplayer.textContent}'s</span> turn`
   }
   
    
}
function checkWinner(){

    let roundWon = false;

    for(let i = 0; i<winConditions.length;i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon =true;
            break;
        }
    }
    if(roundWon== true){
        if(currentplayer.textContent=="X"){
        currentplayer.textContent="O";
        statustext.textContent=`${currentplayer.textContent} wins!`;
        running=false;
        }
        else{
        currentplayer.textContent="X";
        statustext.textContent=`${currentplayer.textContent} wins!`;
        running=false;
        }
       
    }
    else if(!options.includes("")){
        statustext.textContent = "Draw!";
        running= false;
    }

}
function restartGame(){

    currentplayer.textContent="X";
    options = ["","","","","","","","",""];
    statustext.textContent=`${currentplayer.textContent}'s turn`;
    cells.forEach(cell => cell.textContent="");
    running =true;
}


