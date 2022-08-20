// globals
var nextRef = 0
var did = {
  Grid: null,
  Search: null,
  Results: null,
  CtxMenu: null,
  CtxName: null,
  CtxView: null,
  CtxAdd: null,
  CtxDel: null
}
var template = {
  Version: '',
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
  did.Search = document.getElementById('search')
  did.Results = document.getElementById('search-results')
  did.CtxMenu = document.getElementById('context-menu')
  did.CtxName = document.getElementById('context-name')
  did.CtxView = document.getElementById('context-view')
  did.CtxAdd = document.getElementById('context-add')
  did.CtxDel = document.getElementById('context-delete')

  initGrid()
  initTile()
  initContext()
})

function getName (ref) {
  return template.Resources.find(o => o.Ref === ref).Name
}

function getRef (tile) {
  return parseInt(tile.getAttribute('data-reference'))
}

function setByRef(ref, member, value) {
  // TODO: Speed up
  template.Resources.find(o => {
    if (o.Ref === ref) {
      o[member] = value
    }
  })
}

function getTile(ref) {
  return document.querySelectorAll(`[data-reference="${ref}"]`)[0];
}
