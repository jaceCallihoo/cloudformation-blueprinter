var g = {}  // generated json object

function generate () {

  // version
  if (template.Version !== '') {
    g.AWSTemplateFormatVersion = template.Version
  }

  // Description
  if (template.Description !== '') {
    g.Description = template.Description
  }

  // Metadata
  if (template.Metadata) {
    g.Metadata = {}
  }

  // Parameters
  if (template.Parameters) {
    g.Parameters = {}
  }

  // Rules
  if (template.Rules) {
    g.Rules = {}
  }

  // Mappings
  if (template.Mappings) {
    g.Mappings = {}
  }

  // Conditions
  if (template.Conditions) {
    g.Conditions = {}
  }

  // Transform
  if (template.Transform) {
    g.Transform = {}
  }

  // Resources
  g.Resources = {}
  template.Resources.forEach((resource) => {
    g.Resources[resource.Name] = {}
    g.Resources[resource.Name].Type = resource.Type

    if (resource.Properties.length > 0) {
      g.Resources[resource.Name].Properties = {}
      resource.Properties.forEach((property) => {
        g.Resources[resource.Name].Properties[property.Name] = property.Value
      })
    }
  })

  // Outputs
  if (template.Outputs) {
    g.Outputs = {}
    template.Outputs.forEach((output) => {
      g.Outputs[output.Name] = {}

      if (output.Description !== '') {
        g.Outputs[output.Name].Description = output.Description
      }

      g.Outputs[output.Name].Value = {}
      g.Outputs[output.Name].Value.Ref = template.Outputs[output].Value // maybe needs refactoring

      if (output.Export) {
        g.Outputs[output.Name].Export = {}
        g.Outputs[output.Name].Export.Name = output.Export
      }
    })
  }

  // console.log(template.Generated)
  console.log(JSON.stringify(g, null, 2))
}

function res () {
  console.log(template.Resources)
}
