// adapted from https://github.com/PixelsCommander/ReactiveElements

var getProps = function(el) {
  var props = {}

  for (var i = 0; i < el.attributes.length; i++) {
    var attribute = el.attributes[i]
    var name = attribute.name
    props[name] = attribute.value
  }

  return props
}

var elmWebComponents = {
  register(name, ElmComponent, setupPorts = function() {}) {
    var elementPrototype = Object.create(HTMLElement.prototype)
    var elmElement

    elementPrototype.createdCallback = function() {
      var props = getProps(this)
      if (Object.keys(props).length === 0) props = undefined

      elmElement = ElmComponent.embed(this, props)

      setupPorts(elmElement.ports)
    }

    document.registerElement(name, { prototype: elementPrototype })
  },
}

module.exports = elmWebComponents
