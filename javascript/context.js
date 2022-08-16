var contexted

function showContextMenu (e) {
  contexted = e.target
  let ref = parseInt(contexted.getAttribute('data-reference'))
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
