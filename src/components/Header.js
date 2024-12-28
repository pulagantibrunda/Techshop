import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; 
import { useCart } from '../components/CartContext';
import productsData from '../data/ProductsData';
import "./styles/Header.css";


const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showUserOptions, setShowUserOptions] = useState(false);

    const { getTotalItems } = useCart();
    const searchRef = useRef();
    const searchInputRef = useRef();

    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    const navigate = useNavigate();  

    const toggleSearch = () => {
        setShowSearch(prev => !prev);
        setShowUserOptions(false);
    };

    const toggleUserOptions = () => {
        setShowUserOptions(prev => !prev);
        setShowLogin(false);
        setShowRegister(false);
        setShowSearch(false);
    };

    const toggleLogin = () => {
        setShowLogin(!showLogin);
        setShowRegister(false);
        setShowUserOptions(false);
    };

    const toggleRegister = () => {
        setShowRegister(!showRegister);
        setShowLogin(false);
        setShowUserOptions(false);
    };

    const handleCloseOverlays = () => {
        setShowLogin(false);
        setShowRegister(false);
        setShowUserOptions(false);
        setShowSearch(false);
        setSearchResults([]);
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            handleCloseOverlays();
        }
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query) {
            const filteredResults = productsData.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults.slice(0, 5)); 
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery) {
            alert(`Searching for: ${searchQuery}`);
        }
        setShowSearch(false);
        setSearchResults([]);
    };

    const handleSelectSuggestion = (productId) => {
        setShowSearch(false);  
        setSearchResults([]);   
        navigate(`/product/${productId}`);  
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerHeight < 500) {
                setIsKeyboardOpen(true);
            } else {
                setIsKeyboardOpen(false);
            }
        };

        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isKeyboardOpen && searchInputRef.current) {
            searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [isKeyboardOpen]);

    return (
        <>
            {showSearch && (
                <div className="overlay" onClick={handleOverlayClick}>
                    <div ref={searchRef} className="search-overlay-content">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="search-overlay-form"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="search-input"
                                ref={searchInputRef}
                            />
                        </form>

                        {searchResults.length > 0 && (
                            <div className="suggestions-dropdown">
                                {searchResults.map((product) => (
                                    <div
                                        key={product.id}
                                        className="suggestion-item"
                                        onClick={() => handleSelectSuggestion(product.id)}
                                    >
                                        {product.title}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {(showLogin || showRegister) && (
                <div className="login-overlay" onClick={handleOverlayClick}>
                    <div
                        className="login-register-form"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FaTimes className="close-icon" onClick={handleCloseOverlays} />
                        <h2 className="form-title">{showLogin ? 'Login' : 'Signup'}</h2>
                        {showLogin ? (
                            <>
                                <p>New to Tech-shop? <button className="login-register-btn" onClick={toggleRegister}>Create an account</button></p>
                                <input type="text" placeholder="Username" className="login-register-input" autoComplete="off" />
                                <input type="password" placeholder="Password" className="login-register-input" autoComplete="new-password" />
                                <button className="login-register-button">Login</button>
                            </>
                        ) : (
                            <>
                                <p>Already have an account? <button className="login-register-btn" onClick={toggleLogin}>Login</button></p>
                                <input type="text" placeholder="Username" className="login-register-input" autoComplete="off" />
                                <input type="email" placeholder="Email" className="login-register-input" autoComplete="off" />
                                <input type="password" placeholder="Password" className="login-register-input" autoComplete="new-password" />
                                <input type="password" placeholder="Confirm Password" className="login-register-input" autoComplete="Confirm-password" />
                                <button className="login-register-button">Signup</button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <header className="header">
                <div className="logo">
                    <Link to="/" className="logo-link">
                        <h1>TechShop</h1>
                    </Link>
                </div>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item" onClick={toggleSearch} title="Search">
                            <FaSearch className="icon" />
                        </li>

                        <li className="nav-item" title="Cart">
                            <Link to="/cart" className="cart-link">
                                <FaShoppingCart className="icon" />
                                {getTotalItems() > 0 && (
                                    <span className="badge">{getTotalItems()}</span>
                                )}
                            </Link>
                        </li>

                        <li className="nav-item" title="Login / Signup">
                            <div className="user-icon-container">
                                <FaUser className="icon" onClick={toggleUserOptions} />
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
            {showUserOptions && (
                <div className="user-options-container">
                    <div className="user-greeting">
                        <h3 className="hello">Hello!</h3>
                        <p>Access account manage orders</p>
                    </div>

                    <div className="account-section">
                        <div className="button-container">
                            <button onClick={toggleLogin} className="button">Login</button><span>/</span>
                            <button onClick={toggleRegister} className="button">Register</button>
                        </div>
                    </div>

                    <hr className="divider" />

                    <div className="login-prompt">
                        <p>Please login</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;