import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'
import { CategoryContext } from "../categories/CategoryProvider.js"
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameById, modifyGame } = useContext(GameContext)
    const { getCategories, categories } = useContext(CategoryContext)
    const { gameId } = useParams()

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
        newGameState.title = event.target.value
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
                    <input type="text" name="title" required className="form-control"
                        value={currentGame.designer}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Release Year: </label>
                    <input type="text" name="title" required className="form-control"
                        value={currentGame.yearReleased}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Number of Players: </label>
                    <input type="number" name="title" required className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Time To Play: </label>
                    <input type="number" required className="form-control" value={currentGame.timeToPlay} onChange={handleInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Minimum Age: </label>
                    <input type="number" required className="form-control" value={currentGame.minAgeRecommendation} onChange={handleInputChange} />
                </div>
            </fieldset>
            <FormGroup>
                <Label for="exampleSelectMulti">Select Categories:</Label>
                <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                    <option value={0}>Select a Category...</option>
                    {categories.map(category => {
                        return <option key={category.id} value={category.id}>{category.category}</option>
                    })}
                </Input>
            </FormGroup>
            {gameId ? <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const game = {
                        id: currentGame.id,
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }
                    // Send POST request to your API
                    modifyGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Submit Edit</button>
                :
                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()
                        const game = {
                            maker: currentGame.maker,
                            title: currentGame.title,
                            numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                            skillLevel: parseInt(currentGame.skillLevel),
                            gameTypeId: parseInt(currentGame.gameTypeId)
                        }
                        // Send POST request to your API
                        createGame(game)
                            .then(() => history.push("/games"))
                    }}
                    className="btn btn-primary">Create</button>}
        </Form>
    )
}