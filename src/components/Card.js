import React from 'react'
import '../css/Card.css'

const Card = ({ title, imageUrl, _id, getOneRecipe }) => {

    const imageStyle = {
        backgroundImage: `url(${imageUrl || ''})`
    }

    const onCardClick = () => {
        getOneRecipe(_id)
    }

    return (
        <div onClick={onCardClick} className="Card">
            <div className="image" style={imageStyle}></div>
            <p className="title">{title}</p>
        </div>
    )
}

export default Card
