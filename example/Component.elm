module Component exposing (..)

import Html exposing (text, div, Html)


type Msg
    = NoOp


type alias Model =
    { name : String
    , age : Maybe Int
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


renderAge : Maybe Int -> Html Msg
renderAge age =
    case age of
        Just x ->
            text ("And I am " ++ (toString x) ++ " years old.")

        Nothing ->
            text ""


view : Model -> Html Msg
view model =
    div []
        [ text ("Hello world, my name is: " ++ model.name)
        , renderAge model.age
        ]


type alias Flags =
    { name : String, age : String }


getAgeFromFlags : Flags -> Maybe Int
getAgeFromFlags { age } =
    age |> String.toInt |> Result.toMaybe


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.name (getAgeFromFlags flags), Cmd.none )


main : Program Flags Model Msg
main =
    Html.programWithFlags
        { init = init, update = update, subscriptions = \_ -> Sub.none, view = view }
