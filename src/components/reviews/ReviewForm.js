import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import StarRatings from 'react-star-ratings';
import { ReviewContext } from "./ReviewProvider.js";


export const ReviewForm = () => {
    const history = useHistory()
    const { createReview, modifyReview } = useContext(ReviewContext)
    const { gameId, ratingId } = useParams()
    const [rating, setRating] = useState({
        gameId: gameId,
        text: "",
        rating: 0,
        timeStamp: new Date(),
    })

    const handleInputChange = (event) => {
        const newRating = { ...rating }
        newRating[event.target.name] = event.target.value
        setRating(newRating)
    }

    const handleStarChange = ( newStarRating, name) => {
        const newRating = { ...rating }
        newRating.rating = newStarRating
        setRating(newRating)
    }

    return (
        <Form className="gameForm">
            <h2 className="gameForm__title">Add a Review</h2>
            <StarRatings
                rating={rating.rating}
                starRatedColor="yellow"
                starHoverColor="yellow"
                numberOfStars={5}
                starDimension="40px"
                starSpacing="15px"
                changeRating={handleStarChange}
            />
            <fieldset>
                <div className="form-group">
                    <input type="text" name="text" required autoFocus className="form-control"
                        value={rating.text}
                        onChange={handleInputChange}
                        placeholder="what do you think?"
                    />
                </div>
            </fieldset>
            {ratingId ? <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    modifyReview(rating)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Submit Edit</button>
                :
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        createReview(rating)
                            .then(() => history.push("/games"))
                    }}
                    className="btn btn-primary">Create</button>}
        </Form>
    )
}