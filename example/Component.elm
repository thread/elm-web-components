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
