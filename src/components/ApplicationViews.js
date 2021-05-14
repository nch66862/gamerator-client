import React from "react"
import { Route } from "react-router-dom"
import { CategoryProvider } from "./categories/CategoryProvider"
import { GameDetail } from "./games/GameDetail"
import { GameForm } from "./games/GameForm"
import { GameList } from "./games/GameList"
import { GameProvider } from "./games/GameProvider"

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
                <CategoryProvider>
                    <GameProvider>
                        <GameForm />
                    </GameProvider>
                </CategoryProvider>
            </Route>
            <Route exact path="/games">
                <GameProvider>
                    <GameList />
                </GameProvider>
            </Route>
            <Route exact path="/games/:gameId(\d+)/detail">
                <GameProvider>
                    <GameDetail />
                </GameProvider>
            </Route>
        </main>
    </>
}