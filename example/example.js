const { Component } = require('./Component.elm')
const { ComponentWithPorts } = require('./ComponentWithPorts.elm')
const { ComponentWithStaticProp } = require('./ComponentWithStaticProp.elm')

const elmWebComponents = require('../src/index')

elmWebComponents.register('demo-elm-component', Component, {
  onDetached: () => {
    console.log('this component is being removed from the DOM now')
  },
})

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

const button = document.getElementById('remove')
button.addEventListener('click', () => {
  const component = document.querySelector('demo-elm-component')
  component.parentElement.removeChild(component)
})
