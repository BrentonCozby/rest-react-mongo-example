import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Card.css'

const Card = ({ title, imageUrl, _id, getOneRecipe }) => {

    const imageStyle = {
        backgroundImage: `url(${imageUrl || ''})`
    }

    const onCardClick = () => {
        getOneRecipe(_id)
    }

    return (
        <Link onClick={onCardClick} className="Card" to={`/recipes/${_id}`}>
            <div className="image" style={imageStyle}></div>
            <p className="title">{title}</p>
        </Link>
    )
}

export default Card
