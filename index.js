/* 
**  Вимоги:
**  (+) блок може рухатись якщо є вільне місце
**  (-) блоки виставляються в поле в рандомному порядку
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

fill(gameArea);
console.log("cellArr = ", cellArr);
