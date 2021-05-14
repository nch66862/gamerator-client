import React, { useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router"
import { ReviewContext } from "./ReviewProvider.js"
import StarRatings from 'react-star-ratings';

export const ReviewList = (props) => {
    const { reviews, getReviewsByGameId } = useContext(ReviewContext)
    const history = useHistory()
    const { gameId } = useParams()

    useEffect(() => {
        getReviewsByGameId(gameId)
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: `/games/${gameId}/reviews/new` })
                }}
            >Write A Review</button>
            {
                reviews.map(review => {
                    return <section key={`review--${review.id}`} className="review">
                        <StarRatings
                            rating={review.rating}
                            starRatedColor="yellow"
                            numberOfStars={5}
                            starDimension="40px"
                            starSpacing="15px"
                        />
                        <p>{new Date(review.time_stamp).toLocaleDateString('en-us')}</p>
                        <p>{review.text}</p>
                        <p>-{review.player.user.first_name}</p>
                    </section>
                })
            }
        </article>
    )
}