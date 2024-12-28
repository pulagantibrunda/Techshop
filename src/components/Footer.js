import React from 'react';
import { FaTruck, FaShieldAlt, FaGift, FaLock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div style={advantageContainerStyle}>
                <h3>Our Advantages</h3>
            </div>
            <div style={featuresContainerStyle}>
                <Feature
                    icon={<FaTruck />}
                    title="Express Delivery"
                    description="Ships in 24 hours"
                />
                <Feature
                    icon={<FaShieldAlt />}
                    title="Brand Warranty"
                    description="100% Original products"
                />
                <Feature
                    icon={<FaGift />}
                    title="Exciting Deals"
                    description="On all prepaid orders"
                />
                <Feature
                    icon={<FaLock />}
                    title="Secure Payments"
                    description="SSL/Secure certificate"
                />
            </div>
            <div style={columnsContainerStyle}>
                <div style={columnStyle}>
                    <h4>Tech-Shop</h4>
                    <p>Subscribe to our email alerts to receive early discount offers and new product info.</p>
                    <input type="email" placeholder="Email address" style={inputStyle} />
                    <button style={subscribeButtonStyle}>Subscribe</button>
                </div>
                <div style={columnStyle}>
                    <h4>Help</h4>
                    <ul style={linkListStyle}>
                        <li>FAQs</li>
                        <li>Track Order</li>
                        <li>Cancel Order</li>
                        <li>Return Order</li>
                        <li>Warranty Info</li>
                    </ul>
                </div>
                <div style={columnStyle}>
                    <h4>Policies</h4>
                    <ul style={linkListStyle}>
                        <li>Return Policy</li>
                        <li>Security</li>
                        <li>Sitemap</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
                <div style={columnStyle}>
                    <h4>Company</h4>
                    <ul style={linkListStyle}>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Service Centers</li>
                        <li>Careers</li>
                        <li>Affiliates</li>
                    </ul>
                </div>
            </div>
            <div style={bottomContainerStyle}>
                <div style={leftTextStyle}>
                    © 2024 | All Rights Reserved. Built by | Brunda Royal
                </div>
                <div style={socialIconsStyle}>
                    <FaFacebook style={iconSpacingStyle} />
                    <FaTwitter style={iconSpacingStyle} />
                    <FaInstagram style={iconSpacingStyle} />
                    <a href="https://www.linkedin.com/in/pulaganti-brundavani-4614a4299/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin style={iconSpacingStyle} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

const Feature = ({ icon, title, description }) => (
    <div style={featureStyle}>
        <div style={iconStyle}>{icon}</div>
        <div>
            <h4 style={titleStyle}>{title}</h4>
            <p style={descriptionStyle}>{description}</p>
        </div>
    </div>
);

const footerStyle = {
    padding: '20px',
    backgroundColor: 'black',
    textAlign: 'center',
};

const advantageContainerStyle = {
    marginBottom: '15px',
};

const featuresContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: '20px',
};

const featureStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '200px',
    marginBottom: '10px',
};

const iconStyle = {
    fontSize: '24px',
    marginRight: '10px',
    color: 'red',
};

const titleStyle = {
    fontSize: '16px',
    margin: '0',
    fontWeight: 'bold',
    color: '#E6E1DF',
};

const descriptionStyle = {
    margin: '0',
    fontSize: '14px',
    color: '#E6E1DF',
};

const columnsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    textAlign: 'left',
};

const columnStyle = {
    width: '220px',
    marginBottom: '20px',
};

const inputStyle = {
    width: '100%',
    padding: '8px',
    marginTop: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const subscribeButtonStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const linkListStyle = {
    listStyleType: 'none',
    padding: 0,
    lineHeight: '1.8',
    color: '#E6E1DF',
    cursor: 'pointer',
};

const bottomContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #444',
};

const leftTextStyle = {
    fontSize: '14px',
    color: '#E6E1DF',
};

const socialIconsStyle = {
    display: 'flex',
};

const iconSpacingStyle = {
    fontSize: '20px',
    color: 'red',
    marginLeft: '15px',
    cursor: 'pointer',
};

export default Footer;