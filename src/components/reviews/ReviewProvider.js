import React, { useState } from "react"

export const ReviewContext = React.createContext()

export const ReviewProvider = (props) => {
    const [ reviews, setReviews ] = useState([])

    const getReviewsByGameId = (gameId) => {
        return fetch(`http://localhost:8000/reviews/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(response => response.json())
            .then(setReviews)
    }

    const createReview = (review) => {
        return fetch("http://localhost:8000/reviews", {
            method: "POST",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(() => getReviewsByGameId(review.gameId))
    }

    const modifyReview = (review) => {
        return fetch(`http://localhost:8000/reviews/${review.id}`, {
            method: "PUT",
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(() => getReviewsByGameId(review.gameId))
    }

    return (
        <ReviewContext.Provider value={{ reviews, createReview, getReviewsByGameId, modifyReview }} >
            { props.children }
        </ReviewContext.Provider>
    )
}