import './RatingStars.css'
import { useState } from 'react';
import { BsStar } from 'react-icons/bs'

export function RatingStars({ setRatingVisible }) {

  const stars = Array(5).fill(0)
  const [rating, setRating] = useState(0)
  const [ratingCount, setRatingCount] = useState(1)

  return (
    <div className='rating-stars-container'>
      <div className='rating-stars-header'>
        <h1>Érdekel a véleményed!</h1>
        <h4>Értékeld az appot!</h4>
      </div>
      <div>
        {stars.map((_, index) => {
          return (

            <BsStar
              key={index}
              size={30}
              color={rating > index ? "orange" : ""}
              background={"orange"}
              onClick={() => {
                setRating(index + 1)
              }}
            />

          )
        })}
      </div>
      <div className='rating-stars-btns'>
        <button onClick={() => {
          if (rating > 0) {
            setRatingCount((prev) => prev + 1);
            console.log(ratingCount + "ratingCount");
            console.log(rating + "rating");
          }
          setRatingVisible(false)
        }} className='rating-stars-btn send-rating'>Send</button>
        <button onClick={() => {
          setRatingVisible(false)
        }} className='rating-stars-btn close-rating'>Close</button>
      </div>
    </div>
  )


}