import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CustomerProductDetail.css";
import CustomerHeader from './CustomerHeader';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLink } from 'react-icons/fa';
import CustomerFooter from "./CustomerFooter";
import ReviewsSection from "./ReviewsSection"

const CustomerProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const [selectedImage, setSelectedImage] = useState(product?.image || "");

  if (!product) {
    return <div className="error">No product details found</div>;
  }

  // Create thumbnail images
  const thumbnailImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  // Share functions
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this product: ${product.name}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this product: ${product.name}`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`Check out this product: ${product.name} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        alert('Product link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy link');
      });
  };

  // Add to Cart function
  const handleAddToCart = () => {
    // Create cart item object
    const cartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.currentPrice.replace('₹', '').replace('¥', '')), // Convert price to number
      qty: 1, // Default quantity
      image: product.image,
      size: product.size,
      category: product.category
    };

    // Get existing cart from localStorage or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('customer_cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex > -1) {
      // If item exists, increase quantity
      existingCart[existingItemIndex].qty += 1;
    } else {
      // If item doesn't exist, add new item
      existingCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('customer_cart', JSON.stringify(existingCart));
    
    // Redirect to cart page with cart data
    navigate("/customer/cart", { state: { cart: existingCart } });
  };

  return (
    <>
      <CustomerHeader/>
      <div className="product-detail-container">
        {/* Left - Image with Thumbnails */}
        <div className="product-detail-image">
          {/* Main Image */}
          <div className="main-image-container">
            <img 
              src={selectedImage || product.image} 
              alt={product.name} 
              className="main-image"
            />
          </div>
          
          {/* Thumbnail Images */}
          <div className="thumbnail-container">
            {thumbnailImages.map((thumb, index) => (
              <div 
                key={index}
                className={`thumbnail-item ${selectedImage === thumb ? 'active' : ''}`}
                onClick={() => setSelectedImage(thumb)}
              >
                <img 
                  src={thumb} 
                  alt={`${product.name} view ${index + 1}`}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          
          {/* Category */}
          {product.category && (
            <div className="product-category">
              Category: <span>{product.category}</span>
            </div>
          )}
          
          {/* Size */}
          {product.size && (
            <div className="product-size">
              Size: <span>{product.size}</span>
            </div>
          )}

          {/* Price */}
          <div className="price">
            {product.currentPrice}{" "}
            {product.originalPrice && (
              <span className="old-price">{product.originalPrice}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button className="add-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* Product Details */}
          <h4>Product Details:</h4>
          <p>{product.description}</p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <>
              <h4>Key Features:</h4>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}

          {/* Extra Information */}
          <div className="extra-info">
            {product.seller && (
              <p><strong>Seller:</strong> {product.seller}</p>
            )}
            
            {product.manufacturer && (
              <p><strong>Manufacturer:</strong> {product.manufacturer}</p>
            )}
            
            {product.madeIn && (
              <p><strong>Made In:</strong> {product.madeIn}</p>
            )}
            
            {product.fssaiLicense && (
              <p><strong>FSSAI License:</strong> {product.fssaiLicense}</p>
            )}
            
            {product.returnable && (
              <p><strong>Returnable:</strong> {product.returnable}</p>
            )}
          </div>

          {/* Share Section with Icons */}
          <div className="share-section">
            <h4>Share Product:</h4>
            <div className="share-icons">
              <button 
                className="share-icon facebook" 
                onClick={shareOnFacebook}
                title="Share on Facebook"
              >
                <FaFacebook />
              </button>
              <button 
                className="share-icon twitter" 
                onClick={shareOnTwitter}
                title="Share on Twitter"
              >
                <FaTwitter />
              </button>
              <button 
                className="share-icon whatsapp" 
                onClick={shareOnWhatsApp}
                title="Share on WhatsApp"
              >
                <FaWhatsapp />
              </button>
              <button 
                className="share-icon copy-link" 
                onClick={copyLink}
                title="Copy Link"
              >
                <FaLink />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ReviewsSection/>
      <CustomerFooter/>
    </>
  );
};

export default CustomerProductDetail;