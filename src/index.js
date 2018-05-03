// adapted from https://github.com/PixelsCommander/ReactiveElements

const getProps = el => {
  const props = {}

  for (let i = 0; i < el.attributes.length; i++) {
    const attribute = el.attributes[i]
    const name = attribute.name
    props[name] = attribute.value
  }
  return props
}

const elmWebComponents = {
  register(
    name,
    ElmComponent,
    { setupPorts = () => {}, staticFlags = {}, onDetached = () => {} } = {}
  ) {
    const elementPrototype = Object.create(HTMLElement.prototype)

    elementPrototype.createdCallback = function() {
      let props = Object.assign({}, getProps(this), staticFlags)
      if (Object.keys(props).length === 0) props = undefined

      const elmElement = ElmComponent.embed(this, props)

      setupPorts(elmElement.ports)
    }

    elementPrototype.detachedCallback = function() {
      onDetached()
    }

    document.registerElement(name, { prototype: elementPrototype })
  },
}

module.exports = elmWebComponents
