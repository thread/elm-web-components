# elm-web-components

A small JavaScript package to let you wrap your Elm applications up in a web component.

## Install

```
yarn add @teamthread/elm-web-components
```

## Example

Given the following Elm app:

```elm
module Component exposing (..)

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

elmWebComponents.register('demo-elm-component', Component)
```

And now in your HTML you can use the component:

```html
<demo-elm-component name="Jack"></demo-elm-component>
```

Any attributes are passed into your Elm app as Flags, so make sure you use `programWithFlags` if you care about them. If you don't you can just use `Html.program` as you would normally.

## Ports

You can also hook up a component that uses ports. The third argument to `elmWebComponents.register` is a function that will be called with the ports object that Elm provides, so you can then hook into it and `subscribe` and `send` to them as you would normally:

```js
elmWebComponents.register('component-with-ports', ComponentWithPorts, ports =>
  ports.somePort.send(1)
  ports.someOtherPort.subscribe(...)
)
```

You can find a full example of this in the `example` directory.
