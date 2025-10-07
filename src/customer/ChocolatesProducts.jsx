import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChocolatesProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Cadbury Hot Chocolate Drink Powder Mix",
      size: "200g",
      currentPrice: "₹207.00",
      originalPrice: "₹375.00",
      category: "Cadbury",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMh9hwvUrzkjfqKgp-92nRWYq9ZpZCJUGgdw&s",
      description: "Rich and creamy Cadbury hot chocolate drink powder mix made with premium cocoa. Perfect for cozy evenings and quick energy boost. Just add hot water or milk for a delicious beverage.",
      seller: "Sweet Delights",
      manufacturer: "Cadbury",
      madeIn: "India",
      returnable: "yes (in 10 Days)",
      features: [
        "Rich cocoa flavor",
        "Creamy texture",
        "Easy to prepare",
        "No preservatives"
      ]
    },
    {
      id: 2,
      name: "Hotlicks Chocolate Delight",
      size: "750g",
      currentPrice: "₹325.00",
      originalPrice: "₹350.00",
      category: "Hotlicks",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV6NGn7HXhGN_tfPJW8IQZJwHrcqpwyxGykQ&s",
      description: "Premium chocolate delight with rich cocoa and creamy texture. Perfect for desserts, baking, or as a standalone treat for chocolate lovers of all ages.",
      seller: "Choco World",
      manufacturer: "Hotlicks",
      madeIn: "India",
      returnable: "yes (in 10 Days)",
      features: [
        "Premium quality cocoa",
        "Great for baking",
        "Rich flavor",
        "Versatile usage"
      ]
    },
    {
      id: 3,
      name: "Protinex Adults Nutritional Drink Mix",
      size: "400g",
      currentPrice: "₹612.00",
      originalPrice: "₹675.00",
      category: "Protinex",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbvGiaySulq9GEdAM_iEDMW01kYAW5W40g0Q&s",
      description: "Protinex nutritional drink mix specially formulated for adults. Provides essential proteins, vitamins, and minerals for daily nutritional requirements.",
      seller: "Health Store",
      manufacturer: "Protinex",
      madeIn: "India",
      returnable: "yes (in 7 Days)",
      features: [
        "High protein content",
        "Essential vitamins",
        "For adults",
        "Easy to mix"
      ]
    },
    {
      id: 4,
      name: "Herby Angel Growth & Immunity Booster",
      size: "300g",
      currentPrice: "₹371.00",
      originalPrice: "₹400.00",
      category: "Herby Angel",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJEbkpbtm_9KjyRrlqyO6l_fMcHRVSDJrx8dsy-PdFgy86ZFBWnoTwh9GB-wFUeS3W-dQ&usqp=CAU",
      description: "Herby Angel growth and immunity booster powder with natural herbs and nutrients. Supports healthy growth and strengthens immune system.",
      seller: "Ayurvedic Store",
      manufacturer: "Herby Angel",
      madeIn: "India",
      returnable: "yes (in 7 Days)",
      features: [
        "Natural herbs",
        "Immunity booster",
        "Growth support",
        "Ayurvedic formula"
      ]
    },
    {
      id: 5,
      name: "Milo Powder Health Drink",
      size: "400g",
      currentPrice: "₹600.00",
      originalPrice: "₹560.00",
      category: "Milo",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqb9aPr3mJcpmvHI0NOTXBThGO-bqYGJRtQQ&s",
      description: "Milo chocolate malt powder health drink enriched with vitamins and minerals. Provides energy and nutrition for active lifestyles.",
      seller: "Beverage Mart",
      manufacturer: "Milo",
      madeIn: "India",
      returnable: "yes (in 10 Days)",
      features: [
        "Chocolate malt flavor",
        "Energy booster",
        "Vitamins enriched",
        "Great taste"
      ]
    },
    {
      id: 6,
      name: "Yakut Light Probiotic Drink",
      size: "5 x 65 ml",
      currentPrice: "₹100.00",
      originalPrice: "",
      category: "Yakut",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSkQF_CSSsm7mf8wuf1Oq0-DLxTRTI4Ph0Mg&s",
      description: "Yakut light probiotic drink pack containing 5 bottles. Supports gut health with beneficial probiotics and has a light, refreshing taste.",
      seller: "Dairy Corner",
      manufacturer: "Yakut",
      madeIn: "India",
      returnable: "yes (in 3 Days)",
      features: [
        "Probiotic benefits",
        "Gut health support",
        "Light formula",
        "Pack of 5 bottles"
      ]
    }
  ];

  const fallbackImage = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop";

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
    if (!originalPrice) return 0;
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
      <h2 className="section-title">Chocolates</h2>
      
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
              {product.originalPrice && calculateDiscount(product.currentPrice, product.originalPrice) > 0 && (
                <div className="discount-badge">
                  {calculateDiscount(product.currentPrice, product.originalPrice)}% OFF
                </div>
              )}
            </div>
            
            <div className="product-info">
              <h3 className="product-name" title={product.name}>
                {truncateWords(product.name, 3)}
              </h3>
              
              <p className="product-size">{product.size}</p>
              
              <div className="product-prices">
                <span className="current-price">{product.currentPrice}</span>
                {product.originalPrice && (
                  <span className="original-price">{product.originalPrice}</span>
                )}
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

export default ChocolatesProducts;