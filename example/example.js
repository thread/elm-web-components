const { Component } = require('./Component.elm')
const { ComponentWithPorts } = require('./ComponentWithPorts.elm')

const elmWebComponents = require('../src/index')

elmWebComponents.register('demo-elm-component', Component)

elmWebComponents.register('component-with-ports', ComponentWithPorts, ports =>
  setInterval(() => ports.newNumber.send(1), 1000)
)
