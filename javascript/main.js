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

  initGrid()
  initTile()
  initContext()
})
