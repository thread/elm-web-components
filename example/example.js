const { Component } = require('./Component.elm')
const { ComponentWithPorts } = require('./ComponentWithPorts.elm')

const elmWebComponents = require('../src/index')

elmWebComponents.register('demo-elm-component', Component)

var setupPorts = ports => {
  console.log('I have been called', ports)
  setInterval(() => ports.newNumber.send(1), 1000)
}

elmWebComponents.register(
  'component-with-ports',
  ComponentWithPorts,
  setupPorts
)
