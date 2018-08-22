module Component exposing (..)

import Html exposing (Html, div, hr, text)


type Msg
    = NoOp


type alias Model =
    { name : String
    , age : Maybe Int
    , favouriteColour : String
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


renderAge : Maybe Int -> Html Msg
renderAge age =
    case age of
        Just x ->
            text ("And I am " ++ toString x ++ " years old.")

        Nothing ->
            text ""


view : Model -> Html Msg
view model =
    div []
        [ text ("Hello world, my name is: " ++ model.name)
        , hr [] []
        , text ("I love the colour " ++ model.favouriteColour)
        , hr [] []
        , renderAge model.age
        , hr [] []
        ]


type alias Flags =
    { name : String, age : String, favouriteColour : String }


getAgeFromFlags : Flags -> Maybe Int
getAgeFromFlags { age } =
    age |> String.toInt |> Result.toMaybe


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.name (getAgeFromFlags flags) flags.favouriteColour, Cmd.none )


main : Program Flags Model Msg
main =
    Html.programWithFlags
        { init = init, update = update, subscriptions = \_ -> Sub.none, view = view }
