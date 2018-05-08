port module ComponentWithPorts exposing (..)

import Html exposing (Html, text)


type Msg
    = NewNumber Int


type alias Model =
    { count : Int
    }


port newNumber : (Int -> msg) -> Sub msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewNumber x ->
            ( { model | count = model.count + x }, Cmd.none )


view : Model -> Html Msg
view model =
    text ("You can even use ports! The count is " ++ toString model.count)


init : ( Model, Cmd Msg )
init =
    ( Model 0, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    newNumber NewNumber


main : Program Never Model Msg
main =
    Html.program
        { init = init, update = update, subscriptions = subscriptions, view = view }
