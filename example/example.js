const { Component } = require('./Component.elm')
const { ComponentWithPorts } = require('./ComponentWithPorts.elm')
const { ComponentWithStaticProp } = require('./ComponentWithStaticProp.elm')

const elmWebComponents = require('../src/index')

elmWebComponents.register('demo-elm-component', Component)

elmWebComponents.register('component-with-ports', ComponentWithPorts, {
  setupPorts: ports => setInterval(() => ports.newNumber.send(1), 1000),
})

elmWebComponents.register(
  'component-with-static-prop',
  ComponentWithStaticProp,
  {
    staticFlags: { styles: { helloWorld: 'helloWorld-123' } },
  }
)
