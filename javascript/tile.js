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
    icon.addEventListener('contextmenu', (e) => showContextMenu(e))

    // make icon movable
    icon.addEventListener('dragstart', (e) => moveDrag(e))

    // add to template resources
    template.Resources.push({Ref: nextRef, Name: '', Type: dragged.Type, Properties: [ {Name: 'AvailabilityZone', Value: 'us-east-1a'}, { Name: 'ImageId', Value: 'ami-0ff8a91507f77f867'} ]})

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
  // move all children
  while (from.childNodes.length > 0) {
    to.appendChild(from.childNodes[0])
  }
  // move element
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
