import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import productsData from '../data/ProductsData';
import ProductCard from './ProductCard';
import "./styles/ProductList.css";

import { useCart } from '../components/CartContext';

const ProductList = ({ selectedCategory }) => {
    const { addToCart } = useCart();
    const [category, setSelectedCategory] = useState(selectedCategory || 'All');

    const filteredProducts = category === 'All'
        ? productsData
        : productsData.filter(product => product.category === category);

    const productsToDisplay = filteredProducts.slice(0, 11);

    return (
        <div className="product-list">
            <div className="filter-buttons">
                <button onClick={() => setSelectedCategory('All')}>All</button>
                <button onClick={() => setSelectedCategory('Headphones')}>Headphones</button>
                <button onClick={() => setSelectedCategory('Earbuds')}>Earbuds</button>
                <button onClick={() => setSelectedCategory('Earphones')}>Earphones</button>
                <button onClick={() => setSelectedCategory('Neckbands')}>Neckbands</button>
            </div>

            <div className="product-grid">
                {productsToDisplay.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}

                <Link to="/all-products" className="product-card browse-all-card">
                    <h4 className='browse'>Browse all products</h4>
                    <button className="view-details-button">View Products</button>
                </Link>
            </div>
        </div>
    );
};

export default ProductList;