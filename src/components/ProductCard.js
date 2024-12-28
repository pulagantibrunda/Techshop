import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import "./styles/ProductCard.css";

const ProductCard = ({ product, addToCart }) => {
    const [added, setAdded] = useState(false);  

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="star-icon" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="star-icon" />);
        }
        while (stars.length < 5) {
            stars.push(<FaRegStar key={stars.length} className="star-icon" />);
        }

        return stars;
    };

    const handleAddToCart = (product) => {
        addToCart(product);  
        setAdded(true);  
        setTimeout(() => {
            setAdded(false); 
        }, 950);
    };

    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.images[0]} alt={product.title} className="product-image" />
                <h4 className="product-title">{product.brand} - {product.title}</h4>
                <p className="product-info">{product.info}</p>
                <div className="price-section">
                    <span className="final-price">₹{product.finalPrice}</span>
                    {product.originalPrice > product.finalPrice && (
                        <span className="original-price">₹{product.originalPrice}</span>
                    )}
                </div>
                <div className="ratings text-danger">
                    {renderStars(product.rateCount)}
                </div>
            </Link>

            <button 
                className={`view-details-button ${added ? 'added-to-cart-button' : ''}`} 
                onClick={() => handleAddToCart(product)}
            >
                {added ? 'Added to Cart' : 'Add to Cart'}
            </button>
        </div>
    );
};

export default ProductCard;