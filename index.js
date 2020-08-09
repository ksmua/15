/* 
**  Вимоги:
**  (+) блок може рухатись якщо є вільне місце
**  (+) блоки виставляються в поле в рандомному порядку
**  (-) після кожного ходу перевіряти комбініціяю на збіг із виграшною
**  (-) блок може штовхати інші блоки, група блоків може рухатись якщо є місце
**  (опція) можна задавати розмір поля в пікселях кратний 100
*/

const gameArea = document.querySelector(".game-area");
const test = document.querySelector(".win");
const cellArr = [];
const empty = {
  row: 4,
  col: 4
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


const fill = (root) => {
  let fragment = document.createDocumentFragment();

  for (let row = 1; row <= 4; row++){
    for (let col = 1; col <= 4; col++){
      if (col === 4 && row === 4 ) { 
        break;
      } else {
        const num = row * 4 - 4 + col;
        // console.log("col = ", col, " row = ", row, " num = ", num);
        fragment.appendChild( createEl(col, row, num) );
        cellArr.push([row, col]); // Save Cell curent position in Arr
      }
    }
  }

  root.appendChild(fragment);
}

// if curent cell is neighbor with empty field 
const canMove = (row, col) => {
  return (
    ( empty.row == row && Math.abs(empty.col - col) === 1 ) 
    ||
    ( empty.col == col && Math.abs(empty.row - row) === 1 ) );
}


const cellMove = (event) => {
  const currentCell = event.target.parentNode;
  const id = currentCell.id - 1;
  
  // if curent cell is neighbor with empty field 
  if (canMove(cellArr[id][0], cellArr[id][1])) {
    // Move DOM Node to Empty field
    currentCell.style.top = empty.row * 100 - 100 + "px";
    currentCell.style.left = empty.col * 100 - 100 + "px";
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
};

const rotate = () => {
  // const canMoveUp = empty.row > 1; 
  // const canMoveDown = empty.rov < 4;
  // const canMoveLeft = empty.col > 1;
  // const canMoveRight = empty.col < 4;
  // console.log("move > ", canMoveUp, canMoveDown, canMoveLeft, canMoveRight);
  let targetRow = empty.row;
  let targetCol = empty.col;

  if(Math.random() > 0.5){
    // 2 / 3 / 4
    if (targetRow < 4 && targetRow > 1) {
      targetRow += (Math.random() > 0.5 ? 1 : -1);
    } else if (targetRow == 1) {
      targetRow += 1;
    } else if (targetRow == 4) {
      targetRow -= 1;
    } 
  } else {
    // targetCol + 1 > 4 ? targetCol -= 1 : targetCol += (Math.random() > 0.5 ? 1 : -1);
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
    const index = cellArr.findIndex((el)=>{
      return el[0] === targetRow && el[1] === targetCol});
   
    // const index = targetRow * 4 - 4 + targetCol;
    // console.log("index > ", index);
    const currentCell = document.getElementById(index + 1);

    emptyPositionRow = empty.row;
    emptyPositionCol = empty.col;
    
    cellArr[index][0] = emptyPositionRow;
    cellArr[index][1] = emptyPositionCol;
    // console.log("Arr > ", cellArr);

    currentCell.style.top = empty.row * 100 - 100 + "px";
    currentCell.style.left = empty.col * 100 - 100 + "px";

    empty.row = targetRow;
    empty.col = targetCol;
  }

  exchangeNeighborCell(targetRow, targetCol);
}

fill(gameArea);

const btn = document.querySelector('button');
btn.addEventListener("click", () => {
  for (let i = 0; i <= 200; i++) {
    rotate();
  }
});

const rotateX = (x) => {
  for (let i = 0; i <= x; i++){
    rotate();  
  }
}
