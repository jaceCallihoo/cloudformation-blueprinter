var gen = {}

function generate () {

  // version
  if (template.Version !== '') {
    gen.AWSTemplateFormatVersion = template.Version
  }

  // Description
  if (template.Description !== '') {
    gen.Description = template.Description
  }

  // Metadata
  if (template.Metadata) {
    gen.Metadata = {}
  }

  // Parameters
  if (template.Parameters) {
    gen.Parameters = {}
  }

  // Rules
  if (template.Rules) {
    gen.Rules = {}
  }

  // Mappings
  if (template.Mappings) {
    gen.Mappings = {}
  }

  // Conditions
  if (template.Conditions) {
    gen.Conditions = {}
  }

  // Transform
  if (template.Transform) {
    gen.Transform = {}
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
    gen.Outputs = {}
  }

  // console.log(template.Generated)
  console.log(JSON.stringify(gen, null, 2))
}
