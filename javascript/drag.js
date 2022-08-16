var dragged

window.addEventListener('drop', (e) => e.preventDefault())


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


function moveGrid (e) {
  e.preventDefault()
  var startX = did.Grid.style.top
  // console.log(startX)
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
