import React from 'react';
import './PersonalCareProducts.css';
import { useNavigate } from 'react-router-dom';

const PersonalCareProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Vaseline Healthy Bright Serum",
      size: "400ml",
      currentPrice: "₹527.00",
      originalPrice: "₹585.00",
      category: "Vaseline",
      image: "https://blinkme.online/uploads/product/1742909598_193e3fac0fad235634c2.jpg",
      description: "Vaseline Healthy Bright Serum with advanced brightening formula that helps even out skin tone and provide radiant glow. Enriched with vitamins and moisturizing agents for 24-hour hydration.",
      seller: "Beauty Store",
      manufacturer: "Vaseline",
      madeIn: "USA",
      returnable: "yes (in 7 Days)",
      features: [
        "Brightens skin tone",
        "Provides 24-hour moisture",
        "Non-greasy formula",
        "Dermatologically tested"
      ]
    },
    {
      id: 2,
      name: "Vaseline Gluta Hya Overnight Radiance",
      size: "200 ml",
      currentPrice: "₹328.00",
      originalPrice: "₹385.00",
      category: "Vaseline",
      image: "https://blinkme.online/uploads/product/1743075265_41ba856a352aa0a6f63f.jpg",
      description: "Overnight radiance serum with Gluta-Hya formula that works while you sleep to provide intense hydration and brightening effects. Wake up to glowing, refreshed skin.",
      seller: "Skin Care Hub",
      manufacturer: "Vaseline",
      madeIn: "USA",
      returnable: "yes (in 7 Days)",
      features: [
        "Overnight brightening",
        "With Gluta-Hya complex",
        "Suitable for all skin types",
        "Fast absorbing"
      ]
    },
    {
      id: 3,
      name: "Ponds Super Light Gel Face Moisturizer",
      size: "300 ml",
      currentPrice: "₹570.00",
      originalPrice: "₹712.00",
      category: "Ponds",
      image: "https://blinkme.online/uploads/product/1743075389_e73e0063d2cf5a65b6a5.jpg",
      description: "Ponds Super Light Gel Face Moisturizer provides intense hydration without feeling heavy. Perfect for daily use with its non-sticky formula that absorbs quickly.",
      seller: "Ponds Official",
      manufacturer: "Ponds",
      madeIn: "India",
      returnable: "yes (in 7 Days)",
      features: [
        "Lightweight gel formula",
        "Non-sticky texture",
        "Quick absorption",
        "24-hour hydration"
      ]
    },
    {
      id: 4,
      name: "Tattvalogy Mango Body Butter",
      size: "100 g",
      currentPrice: "₹299.00",
      originalPrice: "₹460.00",
      category: "Tattvalogy",
      image: "https://blinkme.online/uploads/product/1743075519_2e2080e46c1f402662a5.jpg",
      description: "Tattvalogy Mango Body Butter enriched with natural mango extracts and shea butter. Provides deep nourishment and leaves skin soft and supple with a fruity fragrance.",
      seller: "Natural Care",
      manufacturer: "Tattvalogy",
      madeIn: "India",
      returnable: "yes (in 10 Days)",
      features: [
        "Natural mango extracts",
        "Enriched with shea butter",
        "Deep nourishment",
        "Fruity fragrance"
      ]
    },
    {
      id: 5,
      name: "Nivea Men Dark Spot Reduction",
      size: "75ml",
      currentPrice: "₹243.00",
      originalPrice: "₹555.00",
      category: "NIVEA MEN",
      image: "https://blinkme.online/uploads/product/1743075655_9532f98139b889ac0008.jpg",
      description: "Nivea Men Dark Spot Reduction cream specifically formulated for men's skin. Helps reduce dark spots and even out skin tone while providing moisture.",
      seller: "Men's Grooming",
      manufacturer: "Nivea",
      madeIn: "Germany",
      returnable: "yes (in 7 Days)",
      features: [
        "Reduces dark spots",
        "Specially for men",
        "Non-greasy formula",
        "Daily use cream"
      ]
    },
    {
      id: 6,
      name: "TNW The Natural Wash Face Cleanser",
      size: "100ml",
      currentPrice: "₹225.00",
      originalPrice: "₹299.00",
      category: "TNW",
      image: "https://blinkme.online/uploads/product/1743075755_9dc283dbc1b12ea6c11f.jpg",
      description: "TNW The Natural Wash Face Cleanser with natural ingredients gently cleanses without stripping natural oils. Suitable for all skin types including sensitive skin.",
      seller: "Natural Wellness",
      manufacturer: "TNW",
      madeIn: "India",
      returnable: "yes (in 10 Days)",
      features: [
        "Natural ingredients",
        "Gentle cleansing",
        "For all skin types",
        "pH balanced"
      ]
    }
  ];

  const fallbackImage = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const handleCardClick = (product) => {
    navigate(`/customer/product-detail/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); 
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.currentPrice.replace('₹', '')),
      qty: 1,
      image: product.image,
      size: product.size,
      category: product.category
    };

    const existingCart = JSON.parse(localStorage.getItem('customer_cart')) || [];
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);
    
    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].qty += 1;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('customer_cart', JSON.stringify(existingCart));
    alert(`${product.name} added to cart!`);
  };

  const calculateDiscount = (currentPrice, originalPrice) => {
    const current = parseFloat(currentPrice.replace('₹', '').replace(',', ''));
    const original = parseFloat(originalPrice.replace('₹', '').replace(',', ''));
    return Math.round(((original - current) / original) * 100);
  };

  const truncateWords = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="personal-care-section">
      <h2 className="section-title">Personal Care Products</h2>
      
      <div className="products-grid">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => handleCardClick(product)}
          >
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={handleImageError}
                loading="lazy"
              />
              <div className="discount-badge">
                {calculateDiscount(product.currentPrice, product.originalPrice)}% OFF
              </div>
            </div>
            
            <div className="product-info">
              <h3 className="product-name" title={product.name}>
                {truncateWords(product.name, 3)}
              </h3>
              
              <p className="product-size">{product.size}</p>
              
              <div className="product-prices">
                <span className="current-price">{product.currentPrice}</span>
                <span className="original-price">{product.originalPrice}</span>
              </div>
              
              <button 
                className="add-to-cart-btn"
                onClick={(e) => handleAddToCart(product, e)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalCareProducts;