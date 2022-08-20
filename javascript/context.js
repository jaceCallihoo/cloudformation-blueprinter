var contexted

window.addEventListener('contextmenu', (e) => e.preventDefault())

function initContext() {
  did.CtxName.addEventListener('input', (e) => tileNameContext(e))
  did.CtxName.addEventListener('focus', (e) => e.target.select())
  did.CtxName.addEventListener('keypress', (e) => contextNameKeypress(e))
  did.CtxView.addEventListener('click', (e) => {})
  did.CtxAdd.addEventListener('click', (e) => {})
  did.CtxDel.addEventListener('click', (e) => deleteTile())
}

function showContextMenu (e) {

  // dont show context menu on input
  if (e.target.tagName === 'INPUT') {
    return
  }

  contexted = e.currentTarget
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

function tileNameContext (e) {
  // update template name
  let ref = parseInt(contexted.getAttribute('data-reference'))
  setByRef(ref, 'Name', did.CtxName.value)

  // update tile input name
  let tileInput = getTile(ref).getElementsByTagName('input')[0]
  tileInput.style.width = e.target.value.length + 2 + "ch";
  tileInput.value = did.CtxName.value
}

function contextNameKeypress(e) {
  if (e.key === 'Enter') {
    did.CtxName.blur()
  }
}
