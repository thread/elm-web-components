// adapted from https://github.com/PixelsCommander/ReactiveElements

const camelize = str => {
  // adapted from https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case#2970667
  return str
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, firstChar => firstChar.toUpperCase())
    .replace(/ /g, '')
}

const getProps = el => {
  const props = {}

  for (let i = 0; i < el.attributes.length; i++) {
    const attribute = el.attributes[i]
    const name = camelize(attribute.name)
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
