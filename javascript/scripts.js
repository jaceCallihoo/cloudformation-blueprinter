// constants
const cellSize = 30
const iconSize = 5
const numRows = 40
const numCols = 80
const menuWidth = 100

// globals
var dragged             // id number of the currently dragged
var resourceList = []
var nextRef = 0
var template = {
  'Version': 'none',
  'Description': '',
  'Metadata': null,
  'Parameters': null,
  'Rules': null,
  'Mappings': null,
  'Conditions': null,
  'Transform': null,
  'Resources': [],
  'Outputs': null,
  'Generated': ''
}

// initialization
window.addEventListener('load', () => {
  // constant document objects
  const grid = document.getElementById('grid')
  const results = document.getElementById('search-results')

  // set grid size
  grid.style.gridTemplateColumns = gridTemplateString(numCols, cellSize)
  grid.style.gridTemplateRows = gridTemplateString(numRows, cellSize)

  // generate grid cells
  for (let i = 0; i < numRows * numCols; i++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.style.width = `${cellSize}px`
    cell.style.height = `${cellSize}px`
    cell.addEventListener('drop', (e) => { drop(e) })
    cell.addEventListener('dragover', (e) => e.preventDefault())
    grid.appendChild(cell)
  }

  // generate resource list items
  for (let i = 0; i < resourceDictionary.length; i++) {
    // list item
    let resource = document.createElement('li')
    resource.classList.add('resource')
    resource.setAttribute('data-resource-type', resourceDictionary[i].Type)
    resource.setAttribute('draggable', true)
    resource.addEventListener('dragstart', (e) => dragStart(e))

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

    results.appendChild(resource)
  }
})

// helpers

// get number of rows/columns for the grid template attribute
function gridTemplateString (num, size) {
  let string = ''
  for (let i = 0; i < num; i++) {
    string += `${size}px `
  }
  return string
}

function getTypeIcon (type) {
  return `images/${type.replace('::', '-').replace('::', '-')}.svg`
}

// event listeners

function dragStart (e) {
  dragged = e.target.getAttribute('data-resource-type')

  // set drag image
  var dragImage = document.createElement('img')
  dragImage.src = getTypeIcon(dragged)
  e.dataTransfer.setDragImage(dragImage, dragImage.height / 2, dragImage.width / 2)
}

function drop (e) {
  let icon = document.createElement('img')
  icon.classList.add('icon')
  icon.src = getTypeIcon(dragged)
  icon.width = cellSize * iconSize
  icon.height = cellSize * iconSize
  icon.style.right = `${cellSize * Math.floor(iconSize / 2)}px`
  icon.style.bottom = `${cellSize * Math.floor(iconSize / 2)}px`
  icon.setAttribute('data-reference', nextRef)

  // set context menu for icon
  icon.addEventListener('contextmenu', (e) => { addContextMenu(e) })

  // make icon movable
  icon.addEventListener('dragstart', (e) => moveStart(e))

  // add to template resources
  template.Resources.push({ref: nextRef, type: dragged, properties: []})

  e.target.appendChild(icon)
  dragged = ''
  nextRef++
}

function moveStart (e) {
  dragged = e.target
  // e.dataTransfer.effectAllowed = 'move' // not needed

  // set drag image
  var dragImage = document.createElement('img')
  dragImage.src = getTypeIcon(dragged)
  e.dataTransfer.setDragImage(dragImage, dragImage.height / 2, dragImage.width / 2)

  // hide image being dragged
  dragged.style.display = 'none'
}

function moveEnd (e) {
  //

  // remove old tile from html
}

function addContextMenu (e) {
  e.preventDefault()
  let menu = document.createElement('div')
  menu.classList.add('context-menu')
  menu.width = `${menuWidth}px`
}

// ////
if (resourceList[0]) {}
