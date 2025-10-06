import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReadyInTwoMinProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Maggi Masala 2 Minutes Noodles",
      size: "100g",
      currentPrice: "₹55.00",
      originalPrice: "₹60.00",
      category: "Maggi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUs4B8kR3yQ_SM2JMZPT3XbdZTUmRw2oczAQ&s",
      description: "Maggi 2-Minute Masala Noodles is an instant noodles brand manufactured by Nestle. Made with the choicest quality spices. Each portion provides 15% of your daily iron requirement. Ready in 2 minutes, perfect for a quick meal.",
      seller: "Lime",
      manufacturer: "Nestle",
      madeIn: "India",
      returnable: "yes (in 1 Days)",
      features: [
        "Ready in 2 minutes",
        "Rich masala taste",
        "15% daily iron requirement",
        "Perfect for quick meals"
      ],
      fssaiLicense: "123456789012",
      isInstantFood: true
    },
    {
      id: 2,
      name: "Maggi 2 - Minute Instant Noodles",
      size: "840 g (12 x 70 g)",
      currentPrice: "₹160.00",
      originalPrice: "₹180.00",
      category: "Maggi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAzbRr4F07bKgl3_k2Nxcirukup3DbiQ9lyQ&s",
      description: "Maggi 2-Minute Instant Noodles pack of 12. Perfect for parties, gatherings, or stocking up. Each pack delivers the authentic Maggi taste you love with the same great quality.",
      seller: "Lime",
      manufacturer: "Nestle",
      madeIn: "India",
      returnable: "yes (in 1 Days)",
      features: [
        "Pack of 12 noodles",
        "Economical bundle",
        "Same great taste",
        "Perfect for parties"
      ],
      fssaiLicense: "123456789012",
      isInstantFood: true
    },
    {
      id: 3,
      name: "Maggi 100 gm pack",
      size: "100 Gm",
      currentPrice: "₹50.00",
      originalPrice: "₹55.00",
      category: "Maggi",
      image: "https://tiimg.tistatic.com/fp/1/007/746/100-gram-food-grade-spicy-delicious-maggi-masala-instant-cuppa-noodles-822.jpg",
      description: "Classic Maggi noodles in convenient 100g pack. The perfect quick meal solution for students and working professionals. Ready in just 2 minutes with authentic taste.",
      seller: "Quick Mart",
      manufacturer: "Nestle",
      madeIn: "India",
      returnable: "yes (in 1 Days)",
      features: [
        "Classic taste",
        "100g single pack",
        "Quick preparation",
        "Student favorite"
      ],
      fssaiLicense: "123456789012",
      isInstantFood: true
    },
    {
      id: 4,
      name: "Yippee Korean Fiery Hot Noodles",
      size: "150g",
      currentPrice: "₹96.00",
      originalPrice: "₹86.00",
      category: "Yippee",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHjw2Hhbwb_QZqbKAH2RvhtZAygYv9YNtfIet5Xg1fWHtbtpnKwkdn1i5D2zjyZ-yWgfc&usqp=CAU",
      description: "Yippee Korean Fiery Hot Noodles with authentic Korean-style spicy flavor. For those who love extra heat in their meals. Ready in minutes with explosive flavor.",
      seller: "Spice World",
      manufacturer: "Yippee",
      madeIn: "India",
      returnable: "yes (in 2 Days)",
      features: [
        "Korean-style spicy",
        "Fiery hot flavor",
        "Authentic taste",
        "150g pack"
      ],
      isInstantFood: true
    },
    {
      id: 5,
      name: "Maggi Nutrilicious Masala",
      size: "290 g",
      currentPrice: "₹109.00",
      originalPrice: "₹116.00",
      category: "Maggi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrPgYk5QJFJXwz65zXCLxYv8wiVrrRWuYlCLYeBsPgDZPRX4WGUx0MhSydCHKKreQfnvg&usqp=CAU",
      description: "Maggi Nutrilicious Masala Noodles with added nutrition. Enjoy the same great taste with added health benefits. Perfect for health-conscious individuals.",
      seller: "Health Store",
      manufacturer: "Nestle",
      madeIn: "India",
      returnable: "yes (in 1 Days)",
      features: [
        "Added nutrition",
        "Same great taste",
        "Healthier option",
        "290g pack"
      ],
      fssaiLicense: "123456789012",
      isInstantFood: true
    },
    {
      id: 6,
      name: "Knorr Mast Masala Soupy Noodles",
      size: "70g",
      currentPrice: "₹20.00",
      originalPrice: "",
      category: "Knorr",
      image: "https://www.jiomart.com/images/product/original/490675856/knorr-mast-masala-instant-soupy-noodles-75-g-product-images-o490675856-p590107000-2-202409131647.jpg?im=Resize=(420,420)",
      description: "Knorr Mast Masala Soupy Noodles - a delicious and comforting soup mix that's ready in minutes. Perfect for cold days or light meals with rich masala flavor.",
      seller: "Soup Corner",
      manufacturer: "Knorr",
      madeIn: "India",
      returnable: "yes (in 3 Days)",
      features: [
        "Ready in minutes",
        "Rich masala flavor",
        "Comforting taste",
        "70g convenient pack"
      ],
      isInstantFood: true
    }
  ];

  const fallbackImage = "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop";

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  const handleCardClick = (product) => {
    navigate(`/customer/product-detail/${product.id}`, { state: { product } });
  };

  // Add to Cart function
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

  // Calculate discount percentage
  const calculateDiscount = (currentPrice, originalPrice) => {
    if (!originalPrice) return 0;
    const current = parseFloat(currentPrice.replace('₹', '').replace(',', ''));
    const original = parseFloat(originalPrice.replace('₹', '').replace(',', ''));
    return Math.round(((original - current) / original) * 100);
  };

  // Function to truncate product name to 3 words
  const truncateWords = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="personal-care-section">
      <h2 className="section-title">Ready in 2 Min</h2>
      
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

export default ReadyInTwoMinProducts;