import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./games/GameList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
                <Route exact path="/games/:gameId(\d+)/edit">
                    {/* <GameForm /> */}
                </Route>
                <Route exact path="/games/new">
                    {/* <GameForm /> */}
                </Route>
                <Route exact path="/games">
                    <GameList />
                </Route>
        </main>
    </>
}