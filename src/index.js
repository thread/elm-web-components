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

let hasWarnedAboutMissingElmVersion = false

const elmWebComponents = {
  __elmVersion: null,
  configure(elmVersion) {
    console.log('called', elmVersion)
    if (elmVersion !== '0.18' && elmVersion !== '0.19') {
      console.error('elm-web-components: elmVersion passed was not correct.')
      console.error('elm-web-components: it must be one of "0.18" or "0.19".')
    }
    this.__elmVersion = elmVersion
  },

  register(
    name,
    ElmComponent,
    { setupPorts = () => {}, staticFlags = {}, onDetached = () => {} } = {}
  ) {
    if (!this.__elmVersion) {
      if (!hasWarnedAboutMissingElmVersion) {
        console.error(
          'elm-web-components: you need to configure the Elm version you need.'
        )
        console.error(
          'elm-web-components: call `elmWebComponents.configure()`, passing either "0.18" or "0.19".'
        )
      }
      hasWarnedAboutMissingElmVersion = true

      return
    }

    const elementPrototype = Object.create(HTMLElement.prototype)

    const elmVersion = this.__elmVersion

    elementPrototype.createdCallback = function() {
      let props = Object.assign({}, getProps(this), staticFlags)
      if (Object.keys(props).length === 0) props = undefined

      if (elmVersion === '0.19') {
        /* a change in Elm 0.19 means that ElmComponent.init now replaces the node you give it
       * whereas in 0.18 it rendered into it. To avoid Elm therefore destroying our custom element
       * we create a div that we let Elm render into
       */
        const elmDiv = document.createElement('div')

        this.appendChild(elmDiv)

        const elmElement = ElmComponent.init({
          flags: props,
          node: elmDiv,
        })
        setupPorts(elmElement.ports)
      } else if (elmVersion === '0.18') {
        const elmElement = ElmComponent.embed(this, props)
        setupPorts(elmElement.ports)
      }
    }

    elementPrototype.detachedCallback = function() {
      onDetached()
    }

    document.registerElement(name, { prototype: elementPrototype })
  },
}

module.exports = elmWebComponents
