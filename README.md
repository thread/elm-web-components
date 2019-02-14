# elm-web-components

A small JavaScript package to let you wrap your Elm applications up in a web component.

## NOTE: this documentation is for v0.7.0-beta, which supports V1 of the Web Elements spec. If you still need V0, please [check the docs for 0.6.1](https://github.com/thread/elm-web-components/tree/0.6.1)

## Install

```
yarn add @teamthread/elm-web-components
```

## Configuration (new in 0.6.0)

We support both Elm 0.18 and 0.19. You must configure the module so it knows which one to support:

```js
elmWebComponents.configure('0.18')
// OR:
elmWebComponents.configure('0.19')
```

You will get an error and the library will not work without this configuration step.

## Example

Given the following Elm app:

```elm
module Main exposing (..)

import Html exposing (text, Html)
import Browser

type Msg
    = NoOp


type alias Model =
    { name : String
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )

view : Model -> Html Msg
view model =
  text ("Hello world, my name is: " ++ model.name)


type alias Flags =
    { name : String }

init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.name, Cmd.none )


main : Program Flags Model Msg
main =
    Browser.element
        { init = init, update = update, subscriptions = \_ -> Sub.none, view = view }
```

You can create a custom web element that will render it like so:

```js
import elmWebComponents from '@teamthread/elm-web-components'
import ElmApp from './Main.elm'

elmWebComponents.register('demo-elm-component', ElmApp.Main)
```

And now in your HTML you can use the component:

```html
<demo-elm-component name="Jack"></demo-elm-component>
```

Any attributes are passed into your Elm app as Flags.

## Ports

You can also hook up a component that uses ports. The third argument to `elmWebComponents.register` is an object that can take a function that will be called with the ports object that Elm provides, so you can then hook into it and `subscribe` and `send` to them as you would normally:

```js
elmWebComponents.register('component-with-ports', ComponentWithPorts, {
  setupPorts: ports => {
    ports.somePort.send(1)
    ports.someOtherPort.subscribe(data => {
      // deal with port here
    })
  },
})
```

## Static Flags

Sometimes you will want to pass in flags not only via HTML attributes, but from JavaScript. The third argument to `elmWebComponents.register` takes a `staticFlags` object which will be passed in:

```js
elmWebComponents.register('component-with-ports', ComponentWithPorts, {
  setupPorts: ports => {},
  staticFlags: {
    someCustomProp: 'foo',
  },
})
```

Now, rendering the component like so:

```html
<component-with-ports name="Jack"></component-with-ports>
```

Will pass through two flags: `someCustomProp` and `name`. Note that currently if a static flag and a passed attribute have the same name, the static flag takes priority.

## Transforming flags

Sometimes you might want to pre-process the flags a bit in Javascript before giving them to Elm. For
example, all the attributes from the DOM are strings, but you might want to make one of them an
integer:

```js
elmWebComponents.register('component-with-ports', ComponentWithPorts, {
  mapFlags: flags => {
    const someId = parseInt(flags.someId)
    return Object.assign({}, flags, { someId })
  },
})
```

Rendering the component with:

```html
<component-with-ports some-id="1"></component-with-ports>
```

Will pass the flags as `{ someId : Int }`, rather than `{ someId : String }`.

## `onDetached` (new in 0.3.0)

If you need to do some work when the Elm component is removed from the DOM, you can now pass `onDetached: () => ...` as another option:

```js
elmWebComponents.register('component-with-ports', ComponentWithPorts, {
  setupPorts: ports => {},
  staticFlags: {
    someCustomProp: 'foo',
  },
  onDetached: () => {
    console.log('Called when the component is removed from the DOM')
  },
})
```

This is useful for tidying up any event listeners you might have.

## Examples

You can find full examples in the `example` directory. If you have cloned the repository, you can run `yarn run example` to run them locally.

## Polyfilling for older browsers

elm-web-components does not ship with any polyfills. You should ensure the following functions are available in all browsers you support:

* `Object.assign`
* `Object.keys`

And additionally ensure that you've included a polyfill for custom elements. We recommend [document-register-element](https://github.com/WebReflection/document-register-element).
