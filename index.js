/* 
**  Вимоги:
**  (+) блок може рухатись якщо є вільне місце
**  (+) блоки виставляються в поле в рандомному порядку
**  (+) після кожного ходу перевіряти комбініціяю на збіг із виграшною
**  (опція) блок може штовхати інші блоки, група блоків може рухатись якщо є місце
**  (опція) можна задавати розмір поля в пікселях кратний 100
**  (-) можна рухати блоки кнопками клавіатури
*/

const gameArea = document.querySelector(".game-area");
const winField = document.querySelector(".win");
const cellArr = [];
const empty = { row: 4, col: 4 } // position of empty field
const mixBtn = document.querySelector('#mixbtn');
let mixed = false;

const winComb = {
  horisontal: [
    [1, 1], [1, 2], [1, 3], [1, 4],
    [2, 1], [2, 2], [2, 3], [2, 4],
    [3, 1], [3, 2], [3, 3], [3, 4],
    [4, 1], [4, 2], [4, 3], ],
  vertical: [
    [1, 1], [2, 1], [3, 1], [4, 1],
    [1, 2], [2, 2], [3, 2], [4, 2],
    [1, 3], [2, 3], [3, 3], [4, 3],
    [1, 4], [2, 4], [3, 4],
  ]
}

const checkWin = (cellArr, winComb) => {
  const { horisontal, vertical } = winComb;
  
  const check = (cellArr, winArr) => {
    let winflag = true;
    
    for (let i = 0; i < cellArr.length; i++) {
      if ( !(cellArr[i][0] == winArr[i][0] &&
             cellArr[i][1] == winArr[i][1]) ){
        winflag = false;
        break;
      }
    }
    // console.log("winflag", winflag);
    return winflag;
  }

  return ( check(cellArr, horisontal) || 
           check(cellArr, vertical) ) ? true : false;
} 

const createEl = (col, row, num) => {
  const cell = document.createElement("div");

  cell.classList = "cell";
  cell.setAttribute("id", num);
  cell.style.top = row * 100 - 100 + "px";
  cell.style.left = col * 100 - 100 + "px";

    const span = document.createElement("span");
    
    span.innerText = num;
    span.classList = "noselect";

  cell.appendChild(span);
  cell.addEventListener('click', cellMove);

  return cell;
}

/* This function fill game area by 15 cells */
const fill = (root) => {
  let fragment = document.createDocumentFragment();

  for (let row = 1; row <= 4; row++){
    for (let col = 1; col <= 4; col++){
      if (col === 4 && row === 4 ) { 
        break;
      } else {
        const num = row * 4 - 4 + col; // number of cell (id)
        fragment.appendChild( createEl(col, row, num) );
        cellArr.push([row, col]); // Save Cell curent position in Arr
      }
    }
  }

  root.appendChild(fragment);
}

/* return true if curent cell is neighbor with empty field */
const canMove = (row, col) => {
  return (
    ( empty.row == row && Math.abs(empty.col - col) === 1 ) 
    ||
    ( empty.col == col && Math.abs(empty.row - row) === 1 ) );
}

/* Set top or left property of cell to move it in empty position*/
const setPosition = (pos) =>  pos * 100 - 100 + "px"; 

const cellMove = (event) => {
  const currentCell = event.target.parentNode;
  const id = currentCell.id - 1;
  
  // if curent cell is neighbor with empty field
  if ( canMove(cellArr[id][0], cellArr[id][1]) ) {
    // Move DOM Node to empty field
    currentCell.style.top = setPosition(empty.row);
    currentCell.style.left = setPosition(empty.col);
    // Save Cell curent position from Arr 
    let curentRow = cellArr[id][0];
    let curentCol = cellArr[id][1];
    // Set new position for cell in Arr from empty field
    cellArr[id][0] = empty.row;
    cellArr[id][1] = empty.col;
    // Set new position for empty field
    empty.row = curentRow;
    empty.col = curentCol;
  }

  if ( checkWin(cellArr, winComb) && mixed ) {
    winField.innerText = "ОК !!!";
  };
};

const rotate = () => {
  let targetRow = empty.row;
  let targetCol = empty.col;

  //select direction to move
  if (Math.random() > 0.5){ 
    // 2 / 3 / 4
    if (targetRow < 4 && targetRow > 1) {
      targetRow += (Math.random() > 0.5 ? 1 : -1);
    } else if (targetRow == 1) {
      targetRow += 1;
    } else if (targetRow == 4) {
      targetRow -= 1;
    } 
  } else {
    if (targetCol < 4 && targetCol > 1) {
      targetCol += (Math.random() > 0.5 ? 1 : -1);
    } else if (targetCol == 1) {
      targetCol += 1;
    } else if (targetCol == 4) {
      targetCol -= 1;
    } 
  }
  // console.log("new target > ", targetRow, targetCol,); 

  // const select = (a, b) => {
  //   if (Math.random() > 0.5){
  //     b = false;
  //   } else {
  //     a = false; 
  //   }
  // }

  // const selectDirection = (up, down, left, right) => {
  //   console.log("up, down, left, right", up, down, left, right);
  //   up ? targetRow -= 1 : null;
  //   down ? targetRow += 1 : null;
  //   left ? targetCol -= 1 : null;
  //   right ? targetCol += 1 : null;
  // }


  // // Empty in the central square
  // if (canMoveUp && canMoveDown && canMoveLeft && canMoveRight){
  //   select(select(canMoveUp, canMoveDown),select(canMoveLeft, canMoveRight) );
  //   console.log("selected move > ", canMoveUp, canMoveDown, canMoveLeft, canMoveRight);
  //   selectDirection(canMoveUp, canMoveDown, canMoveLeft, canMoveRight);
  // }
  // // Empty in the vertical side
  // if (canMoveUp && canMoveDown) {
  //   select( select(canMoveUp, canMoveDown), canMoveLeft ? canMoveLeft : canMoveRight );
  //   console.log("selected move > ", canMoveUp, canMoveDown, canMoveLeft, canMoveRight);
  //   selectDirection(canMoveUp, canMoveDown, canMoveLeft, canMoveRight);
  // }
  // // Empty in the horisontal side
  // if (canMoveLeft && canMoveRight) {
  //   select(select(canMoveLeft, canMoveRight), canMoveUp ? canMoveUp : canMoveDown);
  //   console.log("selected move > ", canMoveUp, canMoveDown, canMoveLeft, canMoveRight);
  //   selectDirection(canMoveUp, canMoveDown, canMoveLeft, canMoveRight);
  // }
  // // Empty in the corner
  // if (canMoveLeft || canMoveRight ) {
  //   select(select(canMoveLeft, canMoveRight), canMoveUp ? canMoveUp : canMoveDown);
  //   console.log("selected move > ", canMoveUp, canMoveDown, canMoveLeft, canMoveRight);
  //   selectDirection(canMoveUp, canMoveDown, canMoveLeft, canMoveRight);
  // }
 
  // console.log("targetRow, targetCol", targetRow, " ", targetCol);

  const exchangeNeighborCell = (targetRow, targetCol) =>{
    const index = cellArr.findIndex( (el) => el[0] === targetRow && el[1] === targetCol );
   
    const currentCell = document.getElementById(index + 1);

    emptyPositionRow = empty.row;  // -> change to object emptyPosition{row: empty.row;, col: empty.col}
    emptyPositionCol = empty.col;
    
    cellArr[index][0] = emptyPositionRow; // -> emptyPosition.row
    cellArr[index][1] = emptyPositionCol;

    currentCell.style.top  = setPosition(empty.row);
    currentCell.style.left = setPosition(empty.col);

    empty.row = targetRow;
    empty.col = targetCol;
  }

  exchangeNeighborCell(targetRow, targetCol);
}



fill(gameArea);

mixBtn.addEventListener("click", () => {
  for (let i = 0; i <= 200; i++) {
    rotate();
  }
  winField.innerText = '';
  mixed = true;
});
