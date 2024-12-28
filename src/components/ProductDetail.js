import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import productsData from '../data/ProductsData';
import reviewsData from '../data/ReviewData';
import { useCart } from '../components/CartContext';
import "./styles/ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const product = productsData.find((product) => product.id === parseInt(id));
    const [mainImage, setMainImage] = useState(product ? product.images[0] : null);
    const [activeTab, setActiveTab] = useState('Specifications');
    
    const [addedProducts, setAddedProducts] = useState({});

    if (!product) {
        return <div>Product not found!</div>;
    }

    const discountPercentage = Math.round(((product.originalPrice - product.finalPrice) / product.originalPrice) * 100);

    const handleAddToCart = (product) => {
        addToCart(product);
        
        setAddedProducts((prevState) => ({
            ...prevState,
            [product.id]: true,
        }));
        
        setTimeout(() => {
            setAddedProducts((prevState) => ({
                ...prevState,
                [product.id]: false,
            }));
        }, 950);
    };

    const renderStars = (rating) => {
        const maxStars = 5;
        const normalizedRating = Math.min(rating, maxStars);
        const fullStars = Math.floor(normalizedRating);
        const hasHalfStar = normalizedRating % 1 !== 0;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="star-icon" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="star-icon" />);
        }

        while (stars.length < maxStars) {
            stars.push(<FaRegStar key={stars.length} className="star-icon" />);
        }

        return stars;
    };

    const specifications = (
        <div className="akhil-specifications">
            <ul>
                <li><strong>Brand:</strong> {product.brand}</li>
                <li><strong>Model:</strong> {product.title}</li>
                <li><strong>Generic Name:</strong> {product.category}</li>
                <li><strong>Headphone Type:</strong> {product.connectivity}</li>
                <li><strong>Connectivity:</strong> {product.connectivity}</li>
                <li><strong>Microphone:</strong> {product.type}</li>
            </ul>
        </div>
    );

    const overview = (
        <div className="akhil-overview">
            <p>The <span style={{ color: 'red' }}>{product.title}</span> in-ear truly wireless earbuds provide fabulous sound quality.</p>
            <ul>
                <li>Sound tuned to perfection</li>
                <li>Comfortable to wear</li>
                <li>Long hours playback time</li>
            </ul>
            <p>Buy the <span style={{ color: 'red' }}>{product.title}</span> , which offers you a fabulous music experience by providing you with awesome sound quality that you can never move on from. Enjoy perfect flexibility.</p>
        </div>
    );

    const reviews = (
        <div className="akhil-reviews">
            {reviewsData.map((review) => (
                <div key={review.id} className="review">
                    <div className="review-header">
                        <FaUserAlt className="review-user-icon" />
                        <div className="review-info">
                            <h4>{review.name}</h4>
                            <div className="review-meta">
                                <p className="review-date">
                                    {review.date} <span>|</span>
                                </p>
                                <div className="review-rating">
                                    {renderStars(product.ratings)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="review-text">{review.review}</p>
                </div>
            ))}
        </div>
    );

    const relatedProducts = productsData
        .filter((item) => item.category === product.category && item.id !== product.id)
        .slice(0, 4);

    const relatedProductsSection = (
        <div className="akhil-related-products">
            <h3>Related Products</h3>
            <div className="akhil-related-products-list">
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((relatedProduct) => (
                        <div key={relatedProduct.id} className="related-product">
                            <Link to={`/product/${relatedProduct.id}`}>
                                <img src={relatedProduct.images[0]} alt={relatedProduct.title} className="related-product-image" />
                            </Link>
                            <div className="related-product-rating">
                                {renderStars(product.ratings)}
                            </div>
                            <h4 className='title'>{relatedProduct.title}</h4>
                            <p className="related-product-subtitle">{relatedProduct.info}</p>
                            <hr />
                            <p className="related-product-price">
                                ₹{relatedProduct.finalPrice} <span className="original-price">₹{relatedProduct.originalPrice}</span>
                            </p>
                            <button
                                className={`view-details-button ${addedProducts[relatedProduct.id] ? 'added-to-cart-button' : ''}`}
                                onClick={() => handleAddToCart(relatedProduct)}
                            >
                                {addedProducts[relatedProduct.id] ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No related products found.</p>
                )}
            </div>
        </div>
    );

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="akhil-detail">
            <div className="akhil-detail-content">
                <div className="akhil-left-side">
                    <div className="akhil-thumbnail-images">
                        {product.images && product.images.length > 0 ? (
                            product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Product thumbnail ${index + 1}`}
                                    className="akhil-thumbnail-image"
                                    onClick={() => setMainImage(image)}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                </div>

                <div className="akhil-center-side">
                    {mainImage ? (
                        <img src={mainImage} alt="Product" className="akhil-main-image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>

                <div className="akhil-right-side">
                    <h1>{product.title}</h1>
                    <p className="akhil-subheading">{product.info}</p>
                    <div className="akhil-rating">
                        {renderStars(product.rateCount)}
                        <span className="reviews-count"> | {product.ratings} Reviews</span>
                    </div>
                    <hr />
                    <div className="akhil-price-section">
                        <p className="akhil-price">
                            ₹{product.finalPrice} <span className="akhil-original-price">₹{product.originalPrice}</span>
                        </p>
                        <p className="akhil-discount">You save: ₹{product.originalPrice - product.finalPrice} ({discountPercentage}%)</p>
                        <p className="akhil-tax-info">(Inclusive of all taxes)</p>
                    </div>
                    <hr />
                    <h4>Offers and Discounts</h4>

                    <div className="akhil-offers">
                        <p>No Cost EMI on Credit Card</p>
                        <p>Pay Later & Avail Cashback</p>
                    </div>
                    <hr />
                    <button
                        className={`akhil-add-to-cart ${addedProducts[product.id] ? 'added-to-cart-button' : ''}`}
                        onClick={() => handleAddToCart(product)}
                    >
                        {addedProducts[product.id] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>

            <div className="akhil-tabs">
                <button className={`akhil-tab-button ${activeTab === 'Specifications' ? 'active' : ''}`} onClick={() => handleTabClick('Specifications')}>Specifications</button>
                <button className={`akhil-tab-button ${activeTab === 'Overview' ? 'active' : ''}`} onClick={() => handleTabClick('Overview')}>Overview</button>
                <button className={`akhil-tab-button ${activeTab === 'Reviews' ? 'active' : ''}`} onClick={() => handleTabClick('Reviews')}>Reviews</button>
            </div>

            <div className="akhil-tab-content">
                {activeTab === 'Specifications' && specifications}
                {activeTab === 'Overview' && overview}
                {activeTab === 'Reviews' && reviews}
            </div>

            {relatedProductsSection}
        </div>
    );
};

export default ProductDetail;