var indentValue = '  '
function idt (num) {
  let str = ''
  for (let i = 0; i < num; i++) {
    str += indentValue
  }
  return str
}

var gen = {}

function generate () {

  // version
  if (template.Version !== 'none') {
    gen.AWSTemplateFormatVersion = template.Version
  }

  // Description
  if (template.Description !== '') {
    gen.Description = template.Description
  }

  // Metadata
  if (template.Metadata) {
    gen.Metadata = 'temp'
  }

  // Parameters
  if (template.Parameters) {
    gen.Parameters = 'temp'
  }

  // Rules
  if (template.Rules) {
    gen.Rules = 'temp'
  }

  // Mappings
  if (template.Mappings) {
    gen.Mappings = 'temp'
  }

  // Conditions
  if (template.Conditions) {
    gen.Conditions = 'temp'
  }

  // Transform
  if (template.Transform) {
    gen.Transform = 'temp'
  }

  // Resources
  gen.Resources = {}
  console.log(template.Resources.length)
  for (let i = 0; i < template.Resources.length; i++) {
    gen.Resources[`${template.Resources[i].Name}`] = {}
    // template.Generated += idt(2) + `Type: "${template.Resources[i].Type}",\n`
    // for (let j = 0; j < template.Resources[i].Properties.length; i++) {
    //
    // }
  }

  // Outputs
  if (template.Outputs) {
    gen.Outputs += 'Outputs: \n'
  }

  // console.log(template.Generated)
  console.log(JSON.stringify(gen, 'null', 2))
}
