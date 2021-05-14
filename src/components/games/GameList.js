import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)
    const history = useHistory()

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push({ pathname: `/games/${game.id}/edit` })
                            }}
                        >Edit</button>
                        <Link className="nav-link" to={`/games/${game.id}/detail`} ><div className="game__title">{game.title} by {game.designer}</div></Link>
                    </section>
                })
            }
        </article>
    )
}