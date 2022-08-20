const tileNameMinWidth = '3ch'

var dragged

window.addEventListener('drop', (e) => e.preventDefault())

function initTile() {
  search.addEventListener('keyup', (e) => refineSearch(e))
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
}

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
  if (!dragged) {
    return
  }
  if (dragged.Action === 'create') {
    // create tile
    let tile = document.createElement('div')
    tile.classList.add('tile')
    tile.style.width = cellSize * tileSize + 'px'
    tile.style.height = cellSize * tileSize + 'px'
    tile.style.right = cellSize * Math.floor(tileSize / 2) + 'px'
    tile.style.bottom = cellSize * Math.floor(tileSize / 2) + 'px'
    tile.setAttribute('data-resource-type', dragged.Type)
    tile.setAttribute('data-reference', nextRef)
    tile.setAttribute('draggable', true)

    // create icon
    let icon = document.createElement('img')
    icon.classList.add('tile-image')
    icon.src = getTypeIcon(dragged.Type)
    icon.setAttribute('draggable', false)
    tile.appendChild(icon)

    // create the name
    let name = document.createElement('input')
    name.classList.add('tile-caption')
    name.style.bottom = '0px'
    name.style.maxWidth = tile.style.width
    name.style.minWidth = tileNameMinWidth
    name.style.width = tileNameMinWidth
    name.addEventListener('input', tileNameInput)
    tile.appendChild(name)

    // set context menu for icon
    tile.addEventListener('contextmenu', (e) => showContextMenu(e))

    // make icon movable
    tile.addEventListener('dragstart', (e) => moveDrag(e))

    // add to template resources
    template.Resources.push({Ref: nextRef, Name: '', Type: dragged.Type, Properties: [ {Name: 'AvailabilityZone', Value: 'us-east-1a'}, { Name: 'ImageId', Value: 'ami-0ff8a91507f77f867'} ]})

    e.target.appendChild(tile)
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

  // set drag image
  setDragImage(e, dragged.Type)
}

function setDragImage (e, type) {
  var dragImage = document.createElement('img')
  dragImage.src = getTypeIcon(dragged.Type)
  e.dataTransfer.setDragImage(dragImage, dragImage.height / 2, dragImage.width / 2)
}

function getTypeIcon (type) {
  return `images/${type.replace('::', '-').replace('::', '-')}.svg`
}

function move (from, to) {
  to.appendChild(from)
}

function refineSearch(e) {
  let input = did.Search.value.toUpperCase()
  let list = document.getElementsByClassName('resource')
  for (let i = 0; i < list.length; i++) {
    if (list[i].getAttribute('data-resource-type').split('::')[2].toUpperCase().indexOf(input) > -1) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}

function tileNameInput(e) {
  // resize input
  e.target.style.width = e.target.value.length + 2 + "ch";

  // update template name
  let ref = getRef(e.target.parentElement)
  setByRef(ref, 'Name', e.target.value)
}
