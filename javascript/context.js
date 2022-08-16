var contexted

window.addEventListener('contextmenu', (e) => e.preventDefault())

function initContext() {
  did.CtxMenu.addEventListener('input', (e) => updateResourceName(e))
  did.CtxName.addEventListener('focus', (e) => e.target.select())
  did.CtxView.addEventListener('click', (e) => {})
  did.CtxAdd.addEventListener('click', (e) => {})
  did.CtxDel.addEventListener('click', (e) => deleteTile())
}

function showContextMenu (e) {
  contexted = e.target
  let ref = getRef(contexted)
  did.CtxName.value = getName(ref)

  did.CtxMenu.style.left = e.clientX + 'px'
  did.CtxMenu.style.top = e.clientY + 'px'
  did.CtxMenu.style.display = 'block'
}

// hide context menu on click away
document.addEventListener('click', (e) => {
  if (!e.target.closest('#context-menu')) { // if not inside the menu
    did.CtxMenu.style.display = 'none'      // hide
  }
})

function deleteTile () {
  contexted.remove()
  did.CtxMenu.style.display = 'none'
  template.Resources = template.Resources.filter(o => o.Ref !== getRef(contexted))
}

function updateResourceName (e) {
  let ref = parseInt(contexted.getAttribute('data-reference'))
  template.Resources.find(o => {
    if (o.Ref === ref) {
      o.Name = did.CtxName.value
    }
  })
}

function getName (ref) {
  return template.Resources.find(o => o.Ref === ref).Name
}

function getRef (tile) {
  return parseInt(tile.getAttribute('data-reference'))
}
