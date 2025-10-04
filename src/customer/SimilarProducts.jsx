import React from 'react';
import './PersonalCareProducts.css';   // ✅ same CSS file reused
import { useNavigate } from 'react-router-dom';


const SimilarProducts = () => {
  const navigate = useNavigate();

  const products = [
    {
      id: 101,
      name: "Ferrero Rocher Chocolate Box",
      size: "300 g",
      currentPrice: "₹799.00",
      originalPrice: "₹950.00",
      category: "Ferrero",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbHVQQv3OJl7p2bQtGHE6G4bC7UH94dD2kbw&s",
      description: "Premium Ferrero Rocher chocolates with crunchy hazelnut center wrapped in fine chocolate. Perfect for gifting.",
      seller: "Sweet Treats",
      manufacturer: "Ferrero",
      madeIn: "Italy",
      returnable: "yes (in 7 Days)",
      features: [
        "Premium quality chocolate",
        "Hazelnut filling",
        "Ideal for gifting",
        "Imported from Italy"
      ]
    },
    {
      id: 102,
      name: "Lindt Swiss Classic Dark Chocolate",
      size: "100 g",
      currentPrice: "₹350.00",
      originalPrice: "₹420.00",
      category: "Lindt",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpZHsP3rD9p6dgko2cZSnVgHpvADf9yrh0v65-wg1qaQwIxRaTaYdpxtga1_8habUqB2k&usqp=CAU",
      description: "Smooth and rich Swiss dark chocolate from Lindt, made with premium cocoa for an intense flavor.",
      seller: "Choco World",
      manufacturer: "Lindt",
      madeIn: "Switzerland",
      returnable: "yes (in 7 Days)",
      features: [
        "Rich dark chocolate",
        "Made in Switzerland",
        "Premium cocoa blend",
        "Smooth texture"
      ]
    },
    {
      id: 103,
      name: "Amul Dark Chocolate",
      size: "150 g",
      currentPrice: "₹120.00",
      originalPrice: "₹150.00",
      category: "Amul",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1BtPQdWGRBAkzZ8wknHroIzyCc_bEy7qishz_4UQOMyeX6JadidwAZgI8ZTZZx_QXkEo&usqp=CAU",
      description: "Indian-made Amul dark chocolate with rich cocoa taste and smooth melt-in-mouth texture.",
      seller: "Amul Store",
      manufacturer: "Amul",
      madeIn: "India",
      returnable: "yes (in 5 Days)",
      features: [
        "Rich cocoa",
        "Affordable",
        "Smooth melt",
        "Made in India"
      ]
    },
    {
  id: 104,
  name: "Parle-G Original Glucose Biscuits",
  size: "800 g",
  currentPrice: "₹90.00",
  originalPrice: "₹110.00",
  category: "Parle",
  image: "https://www.jiomart.com/images/product/original/491538751/parle-g-original-glucose-biscuits-45-g-product-images-o491538751-p491538751-0-202304281334.jpg?im=Resize=(420,420)",
  description: "Classic Parle-G biscuits with glucose-rich taste loved by all ages. Perfect with tea or milk.",
  seller: "Parle Store",
  manufacturer: "Parle Products Pvt Ltd",
  madeIn: "India",
  returnable: "yes (in 7 Days)",
  features: [
    "Glucose-rich energy",
    "Crispy and light",
    "Loved by kids and adults",
    "Affordable family pack"
  ]
},
{
  id: 105,
  name: "Britannia Good Day Cashew Cookies",
  size: "600 g",
  currentPrice: "₹145.00",
  originalPrice: "₹180.00",
  category: "Britannia",
  image: "https://globalfoodmarts.com/cdn/shop/files/Britannia_Good_Day_Cashew_Cookies_216g_800x800_6336c63a-d9b8-4b2e-b372-fcd3e26011b3.jpg?v=1745092439",
  description: "Delicious Britannia Good Day cookies loaded with crunchy cashews, baked to golden perfection.",
  seller: "Britannia Store",
  manufacturer: "Britannia Industries",
  madeIn: "India",
  returnable: "yes (in 7 Days)",
  features: [
    "Crunchy cashews",
    "Golden baked",
    "Rich buttery taste",
    "Ideal tea-time snack"
  ]
},
{
  id: 106,
  name: "Oreo Chocolate Creme Biscuits",
  size: "300 g",
  currentPrice: "₹120.00",
  originalPrice: "₹140.00",
  category: "Oreo",
  image: "https://rukminim2.flixcart.com/image/480/480/xif0q/cookie-biscuit/m/m/2/-original-imagtfezjyzdgmqq.jpeg?q=90",
  description: "Oreo sandwich cookies with smooth chocolate creme filling. A global favorite snack for all ages.",
  seller: "Mondelez Store",
  manufacturer: "Mondelez International",
  madeIn: "India",
  returnable: "yes (in 7 Days)",
  features: [
    "Chocolate creme filling",
    "Crunchy sandwich biscuits",
    "Internationally popular",
    "Perfect for desserts and shakes"
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
    navigate("/customer/cart", { state: { cart: existingCart } });
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="personal-care-section">
      <h2 className="section-title m-3">Similar Products</h2>
      
      <div className="products-grid">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onClick={() => handleCardClick(product)}
            style={{ cursor: 'pointer' }}
          >
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={handleImageError}
                loading="lazy"
              />
            </div>
            <div className="product-category">{product.category}</div>
            
            <h3 className="product-name" title={product.name}>
              {truncateText(product.name, 40)}
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
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
