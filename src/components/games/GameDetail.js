import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { Link } from "react-router-dom"
import { GameContext } from "./GameProvider.js"

export const GameDetail = () => {
    const { getGameById } = useContext(GameContext)
    const history = useHistory()
    const { gameId } = useParams()
    const [game, setGame] = useState({})

    useEffect(() => {
        getGameById(gameId)
            .then(setGame)
    }, [])

    return (
        <article className="games">
            <section key={`game--${game.id}`} className="game">
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: `/games/${game.id}/edit` })
                    }}
                >Edit</button>
                <div className="game__title">{game.title} by {game.designer}</div>
                <label>Description:</label>
                <div className="game__title">{game.description}</div>
                <label>Released:</label>
                <div className="game__title">{game.year_released}</div>
                <label>Players:</label>
                <div className="game__title">{game.number_of_players}</div>
                <label>Time to play:</label>
                <div className="game__title">{game.time_to_play} min.</div>
                <label>Age Recommendation:</label>
                <div className="game__title">{game.min_age_recommendation}+</div>
                <label>Categories:</label>
                {game.categories?.map(category => {
                    return <div key={category.id} className="game__title">{category.category}</div>
                })}
                <Link className="nav-link" to="/games">Back</Link>
            </section>
        </article>
    )
}