function generate () {
  template.Generated = ''

  // Version
  if (template.Version !== 'none') {
    template.Generated += 'AWSTemplateFormatVersion: "' + template.Version + '"\n\n'
  }

  // Description
  if (template.Description !== '') {
    template.Generated += 'Description: \n' + template.Description + '\n\n'
  }

  // Metadata
  if (template.Metadata) {
    template.Generated += 'Metadata: \n'
  }

  // Parameters
  if (template.Parameters) {
    template.Generated += 'Parameters: \n'
  }

  // Rules
  if (template.Rules) {
    template.Generated += 'Rules: \n'
  }

  // Mappings
  if (template.Mappings) {
    template.Generated += 'Mappings: \n'
  }

  // Conditions
  if (template.Conditions) {
    template.Generated += 'Conditions: \n'
  }

  // Transform
  if (template.Transform) {
    template.Generated += 'Transform: \n'
  }

  // Resources
  template.Generated += 'Resources: \n'

  // Outputs
  if (template.Outputs) {
    template.Generated += 'Outputs: \n'
  }

  console.log(template.Generated)
}
