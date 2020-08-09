console.log(15);

/* 
**  Вимоги
**  блоки виставляються в поле в рандомному порядку
**  блок може рухатись якщо є вільне місце
**  блок може штовхати інші блоки, група блоків може рухатись якщо є місце
*/


const gameArea = document.querySelector(".game-area");
const test = document.querySelector(".win");
const cellArr = [];


const fill = (root) => {
  let fragment = document.createDocumentFragment();
  
  const createEl = (col, row, num) => {
    const cell = document.createElement("div");
    
    
    cell.classList = "cell";
    cell.setAttribute("id", num );
    cell.style.top = row * 100 - 100 + "px";
    cell.style.left = col * 100 - 100 + "px";
    
      const span = document.createElement("span");
        span.innerText = num;

    cell.appendChild(span);
    cell.addEventListener('click', cellMove);
    
    return cell;
  }

  for (let row = 1; row <= 4; row++){
    for (let col = 1; col <= 4; col++){
      if (col === 4 && row === 4 ) { 
        break;
      } else {
        const num = row * 4 - 4 + col;
        console.log("col = ", col, " row = ", row, " num = ", num);
        fragment.appendChild( createEl(col, row, num) );
        cellArr.push([row, col]);
      }
    }
  }

  root.appendChild(fragment);
}

const cellMove = (event) => {
  console.log("event", event);
  // let curentRow = cellArr[cell.id][0];
  // let curentCol = cellArr[cell.id][1];
};

const empty = {
  row: 4,
  col: 4
}

// _ _ _ _[]
// _ _ _ _
// empty id = 16


fill(gameArea);
console.log("cellArr = ", cellArr);
