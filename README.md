# elm-web-components

A small JavaScript package to let you wrap your Elm applications up in a web component.

## Install

```
yarn add @teamthread/elm-web-components
```

## Example

Given the following Elm app:

```elm
module Main exposing (..)

import Html exposing (text, Html)

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
    Html.programWithFlags
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

Any attributes are passed into your Elm app as Flags, so make sure you use `programWithFlags` if you care about them. If you don't you can just use `Html.program` as you would normally.

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
  }
})
```

This is useful for tidying up any event listeners you might have.


## Examples

You can find full examples in the `example` directory. If you have cloned the repository, you can run `yarn run example` to run them locally.

## Changelog

**v0.3.0** [3 May 2018]

* You can now pass `onDetached` as an option. This is a callback function that will be run when component is removed from the DOM.

**v0.2.0** [1 May 2018]

* Added support for static flags via the `staticFlags` option.
* **Breaking change**: third argument to `register` now takes an object with two (optional) properties: `setupPorts` and `staticFlags`, rather than just a function for setting up the ports.
