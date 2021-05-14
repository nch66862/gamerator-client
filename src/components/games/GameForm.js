import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import { CategoryContext } from "../categories/CategoryProvider.js"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { Multiselect } from 'multiselect-react-dropdown';

export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameById, modifyGame } = useContext(GameContext)
    const { getCategories, categories } = useContext(CategoryContext)
    const { gameId } = useParams()

    const state = {
        options: categories
    };

    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        yearReleased: "",
        numberOfPlayers: 0,
        timeToPlay: 0,
        minAgeRecommendation: 1,
        categories: []
    })

    useEffect(() => {
        getCategories()
        if (gameId) {
            getGameById(gameId)
                .then(game => {
                    game.gameTypeId = game.gametype.id
                    game.skillLevel = game.skill_level
                    game.numberOfPlayers = game.number_of_players
                    delete game.gametype
                    delete game.skill_level
                    delete game.number_of_players
                    setCurrentGame(game)
                })
        }
    }, [])

    const handleInputChange = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    const onSelect = (selectedList, selectedItem) => {
        const newGameState = { ...currentGame }
        newGameState.categories.push(selectedItem.id)
        setCurrentGame(newGameState)
        console.log(newGameState)
    }

    const onRemove = (selectedList, removedItem) => {
        const newGameState = { ...currentGame }
        const index = newGameState.categories.indexOf(removedItem.id);
        if (index > -1) {
            newGameState.categories.splice(index, 1);
        }
        setCurrentGame(newGameState)
    }


    return (
        <Form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Designer: </label>
                    <input type="text" name="designer" required className="form-control"
                        value={currentGame.designer}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Release Year: </label>
                    <input type="text" name="yearReleased" required className="form-control"
                        value={currentGame.yearReleased}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <FormGroup>
                <Label for="exampleSelectMulti">Select Categories:</Label>
                <Multiselect
                    options={state.options} // Options to display in the dropdown
                    selectedValues={state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="category" // Property name to display in the dropdown options
                />
            </FormGroup>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Time To Play: </label>
                    <input name="timeToPlay" type="number" required className="form-control" value={currentGame.timeToPlay} onChange={handleInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Minimum Age: </label>
                    <input name="minAgeRecommendation" type="number" required className="form-control" value={currentGame.minAgeRecommendation} onChange={handleInputChange} />
                </div>
            </fieldset>
            {gameId ? <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    modifyGame(currentGame)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Submit Edit</button>
                :
                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()
                        // Send POST request to your API
                        createGame(currentGame)
                            .then(() => history.push("/games"))
                    }}
                    className="btn btn-primary">Create</button>}
        </Form>
    )
}