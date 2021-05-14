import React from "react"
import { Route } from "react-router-dom"
import { CategoryProvider } from "./categories/CategoryProvider"
import { GameDetail } from "./games/GameDetail"
import { GameForm } from "./games/GameForm"
import { GameList } from "./games/GameList"
import { GameProvider } from "./games/GameProvider"
import { ReviewList } from "./reviews/ReviewList"
import { ReviewProvider } from "./reviews/ReviewProvider"
import { ReviewForm } from "./reviews/ReviewForm"

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
            <Route exact path="/games/:gameId(\d+)/reviews">
                <GameProvider>
                    <ReviewProvider>
                        <ReviewList />
                    </ReviewProvider>
                </GameProvider>
            </Route>
            <Route exact path="/games/:gameId(\d+)/reviews/new">
                <GameProvider>
                    <ReviewProvider>
                        <ReviewForm />
                    </ReviewProvider>
                </GameProvider>
            </Route>
        </main>
    </>
}