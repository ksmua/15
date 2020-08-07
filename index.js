console.log(15);

/* 
**  блоки виставляються в поле в рандомному порядку
**  блок може рухатись якщо є вільне місце
**  блок може штовхати інші блоки, група блоків може рухатись якщо є місце
*/

// function allowDrop(event) {
//   console.log("allowDrop");
//   event.preventDefault();
// }

// function drop(event) {
//   console.log("Drop", event);
//   event.preventDefault();
//   var data = event.dataTransfer.getData("Text");
//   console.log("data = ", data);

//   event.target.appendChild(document.getElementById(data));
// }

// function dragStart(event) {
//   console.log("dragStart", event);
//   event.dataTransfer.setData("Text", event.target.id);
// }



const gameArea = document.querySelector(".game-area");
const test = document.querySelector(".win");

const fill = (root) => {
  let fragment = document.createDocumentFragment();
  
  const createEl = (col, row) => {
    const cell = document.createElement("div");
    const num = row * 4 - 4 + col;
    // console.log("col = ",  col, " row = ", row, " num = ", num);
    
    cell.classList = "cell";
    cell.setAttribute("id", num );
    cell.style.top = row * 100 - 100 + "px";
    cell.style.left = col * 100 - 100 + "px";
    
      const span = document.createElement("span");
        span.innerText = num;

    cell.appendChild(span);
    
    return cell;
  }

  for (let row = 1; row <= 4; row++){
    for (let col = 1; col <= 4; col++){
      if (col === 4 && row === 4 ) { 
        break;
      } else {
        fragment.appendChild( createEl(col, row) );
      }
    }
  }

  root.appendChild(fragment);
}

fill(gameArea);

