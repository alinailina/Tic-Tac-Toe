
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [6,4,2]
];


const cells = document.querySelectorAll('[data-cell]');

let turnO;

const classX = 'x';
const classO = 'o';

const board =  document.querySelector('#tic-tac-toe #board');

const msg = document.querySelector('#msg');
const msgText = document.querySelector('.msg-text');

const restartBtn = document.querySelector('#tic-tac-toe #restart-btn');

restartBtn.addEventListener('click', startGame);



startGame();

function startGame() {
    turnO = false;
    cells.forEach(cell => {
        cell.classList.remove(classX);
        cell.classList.remove(classO);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once:true});
    });
    setBoardHoverClass();
    msg.classList.remove('show');


    

}





function handleClick(e) {
    let cell = e.target;
    let currentClass = turnO ? classO : classX;
    // place mark  
    placeMark(cell, currentClass);
    
    // check for win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
      endGame(true);
  } else {
     switchTurns(); 
     setBoardHoverClass();
  }
}



function isDraw() {
    // destructure cells into an array
    return [...cells].every (cell=> {
        return cell.classList.contains(classO) ||
        cell.classList.contains(classX);
    })
}

function endGame(draw){
    if(draw) {
        msgText.innerText = 'Draw!';
    } else {
        msgText.innerText = `${turnO ? "O" : "X"} wins!`;
    }
    msg.classList.add('show');
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    turnO = !turnO;
}

function setBoardHoverClass() {
    board.classList.remove(classX);
    board.classList.remove(classO);
    if(turnO){
        board.classList.add(classO);
    } else {
        board.classList.add(classX);
    }
}

function checkWin(currentClass) {
    return winCombos.some(combo => {
        return combo.every(index => {
            return cells[index].classList.contains(currentClass);
        })
    })
}