import './RatingStars.css'
import axios from 'axios'
import { useState } from 'react';
import { BsStar } from 'react-icons/bs'

export function RatingStars({ setRatingVisible }) {
  const stars = Array(5).fill(0)
  const [ratings, setRatings] = useState(0)

  

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
              color={ratings > index ? "orange" : ""}
              onClick={() => {
                setRatings(index + 1)
              }}
            />

          )
        })}
      </div>
      <div className='rating-stars-btns'>
        <button onClick={() => {
          axios.put('/api/ratings/', { ratings: ratings })
          setRatingVisible(false)
        }} className='rating-stars-btn send-rating'>Send</button>
        <button onClick={() => {
          setRatingVisible(false)
        }} className='rating-stars-btn close-rating'>Close</button>
      </div>
    </div>
  )


}