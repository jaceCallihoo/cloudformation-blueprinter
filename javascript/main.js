// constants
const cellSize = 30
const iconSize = 5
const numRows = 40
const numCols = 80
const menuWidth = 250
const backgroundRepeat = 3

// globals
var nextRef = 0
var did = {
  Grid: null,
  Results: null,
  CtxMenu: null,
  CtxName: null,
  CtxView: null,
  CtxAdd: null,
  CtxDel: null
}
var template = {
  Version: 'none',
  Description: '',
  Metadata: null,
  Parameters: null,
  Rules: null,
  Mappings: null,
  Conditions: null,
  Transform: null,
  Resources: [],
  Outputs: null
}

template.Version = "2010-09-09" // temp
template.Description = "This is my special template" // temp

// initialization
window.addEventListener('load', () => {
  // constant document objects
  did.Grid = document.getElementById('grid')
  did.Results = document.getElementById('search-results')
  did.CtxMenu = document.getElementById('context-menu')
  did.CtxName = document.getElementById('context-name')
  did.CtxView = document.getElementById('context-view')
  did.CtxAdd = document.getElementById('context-add')
  did.CtxDel = document.getElementById('context-delete')

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

  // generate resource list items
  for (let i = 0; i < resourceDictionary.length; i++) {
    // list item
    let resource = document.createElement('li')
    resource.classList.add('resource')
    resource.setAttribute('data-resource-type', resourceDictionary[i].Type)
    resource.setAttribute('draggable', true)
    resource.addEventListener('dragstart', (e) => sideDrag(e))

    // image
    let resourceIcon = document.createElement('img')
    resourceIcon.src = getTypeIcon(resourceDictionary[i].Type)
    resourceIcon.alt = resourceDictionary[i].Type
    resourceIcon.setAttribute('data-resource-type', resourceDictionary[i].Type)
    resource.appendChild(resourceIcon)

    // image caption
    let resourceCaption = document.createElement('figcaption')
    resourceCaption.innerHTML = resourceDictionary[i].Type.split('::')[2]
    resource.appendChild(resourceCaption)

    did.Results.appendChild(resource)
  }

  initContext()
})

// get number of rows/columns for the grid template attribute
function gridTemplateString (num, size) {
  let string = ''
  for (let i = 0; i < num; i++) {
    string += `${size}px `
  }
  return string
}
