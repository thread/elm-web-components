import 'core-js/es6/object'

const { Elm } = require('./Component.elm')

const elmWebComponents = require('../src/index')

elmWebComponents.configure('0.19')

elmWebComponents.register('demo-elm-component', Elm.Component, {
  onDetached: () => {
    console.log('this component is being removed from the DOM now')
  },
})

elmWebComponents.register('component-with-ports', Elm.ComponentWithPorts, {
  setupPorts: ports => setInterval(() => ports.newNumber.send(1), 1000),
})

elmWebComponents.register(
  'component-with-static-prop',
  Elm.ComponentWithStaticProp,
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
