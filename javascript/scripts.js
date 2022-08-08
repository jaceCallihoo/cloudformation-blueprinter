// constants
const cellSize = 30
const iconSize = 5
const numRows = 40
const numCols = 80
const menuWidth = 250

// globals
var did = {
  Grid: null,
  Results: null,
  CtxMenu: null,
  CtxName: null
}
var dragged
var nextRef = 0
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

// initialization
window.addEventListener('load', () => {
  // constant document objects
  did.Grid = document.getElementById('grid')
  did.Results = document.getElementById('search-results')
  did.CtxMenu = document.getElementById('context-menu')
  did.CtxName = document.getElementById('context-name')

  // set grid size
  did.Grid.style.gridTemplateColumns = gridTemplateString(numCols, cellSize)
  did.Grid.style.gridTemplateRows = gridTemplateString(numRows, cellSize)

  // generate grid cells
  for (let i = 0; i < numRows * numCols; i++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.style.width = `${cellSize}px`
    cell.style.height = `${cellSize}px`
    cell.addEventListener('drop', (e) => { drop(e) })
    cell.addEventListener('dragover', (e) => e.preventDefault())
    did.Grid.appendChild(cell)
  }

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
})

window.addEventListener('drop', (e) => e.preventDefault())

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

function setDragImage (e, type) {
  var dragImage = document.createElement('img')
  dragImage.src = getTypeIcon(dragged.Type)
  e.dataTransfer.setDragImage(dragImage, dragImage.height / 2, dragImage.width / 2)
}

function move (from, to) {
  // move all children
  while (from.childNodes.length > 0) {
    to.appendChild(from.childNodes[0])
  }
  // move element
  to.appendChild(from)
}

// event listeners

function sideDrag (e) {
  // set dragged
  dragged = {
    Action: 'create',
    Type: e.target.getAttribute('data-resource-type')
  }

  // set drag image
  setDragImage(e, dragged.Type)
}

function drop (e) {
  // check for valid target
  if (dragged.Action === 'create') {
    // create icon
    let icon = document.createElement('img')
    icon.classList.add('icon')
    icon.src = getTypeIcon(dragged.Type)
    icon.width = cellSize * iconSize
    icon.height = cellSize * iconSize
    icon.style.right = `${cellSize * Math.floor(iconSize / 2)}px`
    icon.style.bottom = `${cellSize * Math.floor(iconSize / 2)}px`
    icon.setAttribute('data-resource-type', dragged.Type)
    icon.setAttribute('data-reference', nextRef)

    // set context menu for icon
    icon.addEventListener('contextmenu', (e) => addContextMenu(e))

    // make icon movable
    icon.addEventListener('dragstart', (e) => moveDrag(e))

    // add to template resources
    template.Resources.push({Ref: nextRef, Name: 'defaultResourceName', Type: dragged.Type, Properties: []})

    e.target.appendChild(icon)
    nextRef++
  } else if (dragged.Action === 'move') {
    move(dragged.From, e.target)
  }
}

function moveDrag (e) {
  dragged = {
    Action: 'move',
    From: e.target,
    Type: e.target.getAttribute('data-resource-type')
  }
  // e.dataTransfer.effectAllowed = 'move' // not needed

  // set drag image
  setDragImage(e, dragged.Type)

  // hide image being dragged
  // dragged.From.style.display = 'none'
}

function addContextMenu (e) {
  e.preventDefault()
  console.log(did.CtxMenu)
  did.CtxMenu.style.width = `${menuWidth}px` // temp
  did.CtxMenu.style.height = '100px'         // temp
  did.CtxName.placeholder = 'Un-namedResource'

  let item = document.createElement('li')
  item.innerHTML = 'hello'

  did.CtxMenu.style.left = e.clientX + 'px'
  did.CtxMenu.style.top = e.clientY + 'px'
  did.CtxMenu.style.display = 'block'
}

// hide context menu on click away
document.addEventListener('click', (e) => {
  if (!e.target.closest('#context-menu')) {
    did.CtxMenu.style.display = 'none'
  }
})
