import 'core-js/es6/object'
const ElmComponent = require('./Component.elm')
const ElmComponentWithPorts = require('./ComponentWithPorts.elm')
const ElmComponentWithStaticProp = require('./ComponentWithStaticProp.elm')

const elmWebComponents = require('../src/index')

elmWebComponents.configure('0.18')

elmWebComponents.register('demo-elm-component', ElmComponent.Component, {
  onDetached: () => {
    console.log('this component is being removed from the DOM now')
  },
})

elmWebComponents.register(
  'component-with-ports',
  ElmComponentWithPorts.ComponentWithPorts,
  {
    setupPorts: ports => setInterval(() => ports.newNumber.send(1), 1000),
  }
)

elmWebComponents.register(
  'component-with-static-prop',
  ElmComponentWithStaticProp.ComponentWithStaticProp,
  {
    staticFlags: { styles: { helloWorld: 'helloWorld-123' } },
  }
)

const button = document.getElementById('remove')
button.addEventListener('click', () => {
  const component = document.querySelector('demo-elm-component')
  console.log('got component', component)
  component.parentElement.removeChild(component)
})
