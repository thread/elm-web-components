module ComponentWithStaticProp exposing (..)

import Html exposing (text, div, Html)
import Html.Attributes exposing (class)


type Msg
    = NoOp


type alias Styles =
    { helloWorld : String }


type alias Model =
    { name : String
    , age : Maybe Int
    , styles : Styles
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
    div [ class model.styles.helloWorld ]
        [ text ("Hello world, my name is: " ++ model.name)
        , renderAge model.age
        , text "I have a CSS class applied via a static prop that was passed in"
        ]


type alias Flags =
    { name : String, age : String, styles : Styles }


getAgeFromFlags : Flags -> Maybe Int
getAgeFromFlags { age } =
    age |> String.toInt |> Result.toMaybe


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( Model flags.name (getAgeFromFlags flags) flags.styles, Cmd.none )


main : Program Flags Model Msg
main =
    Html.programWithFlags
        { init = init, update = update, subscriptions = \_ -> Sub.none, view = view }
