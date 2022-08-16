const cellSize = 30
const iconSize = 5
const numRows = 40
const numCols = 80
const backgroundRepeat = 3

function initGrid() {
  // set grid size
  did.Grid.style.gridTemplateColumns = gridTemplateString(numCols, cellSize)
  did.Grid.style.gridTemplateRows = gridTemplateString(numRows, cellSize)
  did.Grid.style.backgroundSize = `${cellSize * backgroundRepeat}px`

  // generate grid cells
  for (let i = 0; i < numRows * numCols; i++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.style.width = `${cellSize}px`
    cell.style.height = `${cellSize}px`
    cell.addEventListener('drop', (e) => drop(e))
    cell.addEventListener('dragover', (e) => e.preventDefault())
    did.Grid.appendChild(cell)
  }

  // make grid draggable
  // did.Grid.setAttribute('draggable', true)
  // did.Grid.addEventListener('drag', (e) => moveGrid(e))
}


// get number of rows/columns for the grid template attribute
function gridTemplateString (num, size) {
  let string = ''
  for (let i = 0; i < num; i++) {
    string += `${size}px `
  }
  return string
}
