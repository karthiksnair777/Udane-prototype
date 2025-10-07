import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CustomerSubCategory.css";
import CustomerHeader from "./CustomerHeader";
import CustomerFooter from "./CustomerFooter";

function CustomerSubCategory() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("popularity");
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isCartLoaded, setIsCartLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('subcategoryCart');
    console.log('Loading cart from localStorage:', savedCart);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        console.log('Cart loaded successfully:', parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
    setIsCartLoaded(true);
  }, []);

  useEffect(() => {
    if (isCartLoaded) {
      console.log('Saving cart to localStorage:', cart);
      localStorage.setItem('subcategoryCart', JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  const subCategoryData = {
    "Dairy, Bread & Eggs": {
      subcategories: ["Milk", "Cheese", "Butter", "Yogurt", "Eggs", "Bread", "Paneer"],
      products: [
        {
          id: 1,
          name: "Amul Taaza Milk",
          weight: "500ml",
          currentPrice: "₹30.00",
          originalPrice: "₹35.00",
          image: "https://5.imimg.com/data5/JU/LT/EG/ANDROID-31742962/product-jpeg.jpeg",
          category: "Milk"
        },
        {
          id: 2,
          name: "Amul Butter",
          weight: "100g",
          currentPrice: "₹50.00",
          originalPrice: "₹55.00",
          image: "https://rukminim2.flixcart.com/image/480/640/xif0q/butter/y/h/k/-original-imagkjwdz8whgxkq.jpeg?q=90",
          category: "Butter"
        },
        {
          id: 3,
          name: "Farm Fresh Eggs",
          weight: "6 pieces",
          currentPrice: "₹60.00",
          originalPrice: "₹65.00",
          image: "https://www.farm2forkdelivery.ca/cdn/shop/articles/Brown_eggs.jpg?v=1732734591&width=1100",
          category: "Eggs"
        }
      ]
    },
    "Fruits & Vegetables": {
      subcategories: ["Fresh Fruits", "Fresh Vegetables", "Exotic Fruits", "Leafy Greens", "Organic", "Seasonal"],
      products: [
        {
          id: 4,
          name: "Fresh Apples",
          weight: "1kg",
          currentPrice: "₹120.00",
          originalPrice: "₹140.00",
          image: "https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/false/eyJpZCI6IjBmODA2N2Q1YTJkOGYxMzBlNzdhOWJiY2YwMTQ0ODdjIiwic3RvcmFnZSI6InB1YmxpY19zdG9yZSJ9?signature=24d754cdf9f231689382f7b099ac7a6fb22ddf1c73c87319b0af44700321c400",
          category: "Fresh Fruits"
        },
        {
          id: 5,
          name: "Organic Tomatoes",
          weight: "500g",
          currentPrice: "₹25.00",
          originalPrice: "₹30.00",
          image: "https://www.realfoodco.co.za/cdn/shop/products/tomatoes_1024x1024.jpg?v=1596629169",
          category: "Organic"
        }
      ]
    },
    "Juice & Drinks": {
      subcategories: ["Fruit Juices", "Soft Drinks", "Energy Drinks", "Health Drinks", "Soda"],
      products: [
        {
          id: 6,
          name: "Real Fruit Juice",
          weight: "1L",
          currentPrice: "₹90.00",
          originalPrice: "₹110.00",
          image: "https://rukminim2.flixcart.com/image/704/844/xif0q/drinks-juice/o/c/u/-original-imahb3fcjnr9hnet.jpeg?q=90",
          category: "Fruit Juices"
        }
      ]
    },
    "Chicken Meat & Fish": {
      subcategories: ["Chicken", "Mutton", "Fish", "Eggs", "Frozen Meat"],
      products: [
        {
          id: 7,
          name: "Fresh Chicken Breast",
          weight: "500g",
          currentPrice: "₹180.00",
          originalPrice: "₹200.00",
          image: "https://0bb8856ba8259ec33e3d-a40599a114f3a4c6d0979c3ffe0b2bf5.ssl.cf2.rackcdn.com/0230576000000_CL_hyvee_default_large.jpeg",
          category: "Chicken"
        }
      ]
    },
    "Chocolates, Candies & Ice Creams": {
      subcategories: ["Chocolates", "Candies", "Ice Cream", "Gums", "Lollipops", "Diet Chocolates"],
      products: [
        {
          id: 8,
          name: "Dairy Milk Chocolate",
          weight: "50g",
          currentPrice: "₹40.00",
          originalPrice: "₹45.00",
          image: "https://rukminim2.flixcart.com/image/480/640/xif0q/chocolate/a/o/g/-original-imahyus4gduaenyk.jpeg?q=90",
          category: "Chocolates"
        }
      ]
    },
    "Bakery Biscuits": {
      subcategories: ["Cookies", "Biscuits", "Cakes", "Rusks", "Crackers"],
      products: [
        {
          id: 9,
          name: "Parle-G Biscuits",
          weight: "200g",
          currentPrice: "₹20.00",
          originalPrice: "₹25.00",
          image: "https://img1.exportersindia.com/product_images/bc-full/dir_59/1765063/parle-g-glucose-biscuits-1319854.jpg",
          category: "Biscuits"
        }
      ]
    },
    "Tea Coffee": {
      subcategories: ["Tea Bags", "Leaf Tea", "Instant Coffee", "Green Tea", "Herbal Tea"],
      products: [
        {
          id: 11,
          name: "Taj Mahal Tea",
          weight: "500g",
          currentPrice: "₹250.00",
          originalPrice: "₹280.00",
          image: "https://tajstores.co.uk/wp-content/uploads/2019/03/DSC_0002-7-scaled.jpg",
          category: "Leaf Tea"
        }
      ]
    },
    "Instant Food": {
      subcategories: ["Noodles", "Pasta", "Ready to Eat", "Soups", "Breakfast Cereals", "Instant Mixes"],
      products: [
        {
          id: 12,
          name: "Maggi Noodles",
          weight: "70g",
          currentPrice: "₹12.00",
          originalPrice: "₹15.00",
          image: "https://5.imimg.com/data5/SELLER/Default/2022/7/MU/PJ/SD/5742893/maggi-noodles-500x500.jpg",
          category: "Noodles"
        }
      ]
    },
    "Masala Oil": {
      subcategories: [  "Cooking Oil", "Masala Powders", "Whole Spices"],
      products: [
        {
          id: 13,
          name: "MDH Garam Masala",
          weight: "100g",
          currentPrice: "₹45.00",
          originalPrice: "₹60.00",
          image: "https://m.media-amazon.com/images/I/51Rv14rB3UL.jpg",
          category: "Masala Powders"
        },
        {
          id: 14,
          name: "Fortune Oil",
          weight: "1L",
          currentPrice: "₹180.00",
          originalPrice: "₹200.00",
          image: "https://www.quickpantry.in/cdn/shop/products/fortune-soyabean-oil-5-l-quick-pantry.jpg?v=1710538017",
          category: "Cooking Oil"
        }
      ]
    },
    "Cleaning Essentials": {
      subcategories: ["Floor Cleaners", "Toilet Cleaners", "Detergents", "Dishwash", "Glass Cleaners"],
      products: [
        {
          id: 15,
          name: "Lizol Floor Cleaner",
          weight: "1L",
          currentPrice: "₹150.00",
          originalPrice: "₹170.00",
          image: "https://cdn.dmart.in/images/products/JUN150000624xx18JUN24_5_B.jpg",
          category: "Floor Cleaners"
        }
      ]
    },
    "Home Office": {
      subcategories: ["Stationery", "Notebooks", "Pens", "Office Supplies", "Electronics", "Furniture"],
      products: [
        {
          id: 16,
          name: "Classmate Notebook",
          weight: "200 pages",
          currentPrice: "₹80.00",
          originalPrice: "₹90.00",
          image: "https://images.jdmagicbox.com/quickquotes/images_main/classmate-notebook-24-0-cm-x-18-0-cm-172-pages-unruled-quarter-back-pressed-inside-center-sewn-pack-of-6-376302843-nxuks.jpg",
          category: "Notebooks"
        }
      ]
    },
    "Personal care": {
      subcategories: ["Shampoo", "Soap", "Skincare", "Haircare", "Deodorants"],
      products: [
        {
          id: 17,
          name: "Dove Soap",
          weight: "100g",
          currentPrice: "₹45.00",
          originalPrice: "₹50.00",
          image: "https://m.media-amazon.com/images/I/71FmeVBY1GL._UF1000,1000_QL80_.jpg",
          category: "Soap"
        }
      ]
    },
    "Pet Care": {
      subcategories: ["Dog Food", "Cat Food", "Pet Toys", "Grooming", "Healthcare", "Accessories"],
      products: [
        {
          id: 18,
          name: "Pedigree Dog Food",
          weight: "3kg",
          currentPrice: "₹450.00",
          originalPrice: "₹500.00",
          image: "https://cdn11.bigcommerce.com/s-8brse8hrm/images/stencil/1280x1280/products/55261/166636/2679285-1__35093.1712613875.jpg?c=1",
          category: "Dog Food"
        }
      ]
    }
  };

  const currentData = subCategoryData[categoryName] || {
    subcategories: [],
    products: []
  };

  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = currentData.products.filter(product => {
    const matchesSubCategory = selectedSubCategory === "All" || product.category === selectedSubCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubCategory && matchesSearch;
  });

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    
    const productWithQty = {
      ...product,
      qty: 1,
      price: parseFloat(product.currentPrice.replace('₹', ''))
    };
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id 
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        newCart = [...prevCart, productWithQty];
      }
      
      console.log('Updated cart:', newCart);
      return newCart;
    });
    
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleBuyNow = (product, e) => {
    e.stopPropagation();
    
    const productWithQty = {
      ...product,
      qty: 1,
      price: parseFloat(product.currentPrice.replace('₹', ''))
    };
    
    navigate("/customer/checkout", { 
      state: { 
        cart: [productWithQty] 
      } 
    });
  };

  const handleCartClick = () => {
    navigate("/customer/cart", { state: { cart } });
  };

  const handleBreadcrumbClick = (path) => {
    navigate(path);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.currentPrice.replace('₹', '')) - parseFloat(b.currentPrice.replace('₹', ''));
      case "price-high":
        return parseFloat(b.currentPrice.replace('₹', '')) - parseFloat(a.currentPrice.replace('₹', ''));
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0; 
    }
  });

  const cartItemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <CustomerHeader />
      <div className="subcat-page-container">
        {showToast && (
          <div className="subcat-toast-notification">
            {toastMessage}
          </div>
        )}

        <div className="subcat-breadcrumb">
          <span 
            className="subcat-breadcrumb-link" 
            onClick={() => handleBreadcrumbClick('/customer/home')}
          >
            Home
          </span> &gt;{" "}
          <span 
            className="subcat-breadcrumb-link" 
            onClick={() => handleBreadcrumbClick('/customer/categories')}
          >
            Category
          </span> &gt;{" "}
          <span className="subcat-current">{categoryName}</span>
        </div>

        {/* Header Section */}
        <div className="subcat-header">
          <h1 className="subcat-title">Buy {categoryName} Online</h1>
          
          <div className="subcat-filters">
            <button 
              className={`subcat-filter-btn ${selectedSubCategory === "All" ? "subcat-active" : ""}`}
              onClick={() => setSelectedSubCategory("All")}
            >
              All
            </button>
            {currentData.subcategories.map((subcat, index) => (
              <button
                key={index}
                className={`subcat-filter-btn ${selectedSubCategory === subcat ? "subcat-active" : ""}`}
                onClick={() => setSelectedSubCategory(subcat)}
              >
                {subcat}
              </button>
            ))}
          </div>

          <div className="subcat-controls">
            <div className="subcat-search-box">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="subcat-search-input"
              />
            </div>
            <div className="subcat-sort-cart-container">
              <div className="subcat-sort-dropdown">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="subcat-sort-select"
                >
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
              <div className="subcat-cart-icon-container" onClick={handleCartClick}>
                <div className="subcat-cart-icon">
                  🛒
                  {cartItemCount > 0 && (
                    <span className="subcat-cart-badge">{cartItemCount}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="subcat-products-count">
          {sortedProducts.length} Products found
        </div>

        <div className="subcat-products-grid">
          {sortedProducts.map((product) => (
            <div 
              key={product.id} 
              className="subcat-product-card"
            >
              <div className="subcat-product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="subcat-product-details">
                <h3 className="subcat-product-name">{product.name}</h3>
                <p className="subcat-product-weight">{product.weight}</p>
                <div className="subcat-product-pricing">
                  <span className="subcat-current-price">{product.currentPrice}</span>
                  <span className="subcat-original-price">{product.originalPrice}</span>
                </div>
                <div className="subcat-product-actions">
                  <button 
                    className="subcat-add-to-cart-btn"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="subcat-buy-now-btn"
                    onClick={(e) => handleBuyNow(product, e)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="subcat-no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>
      <CustomerFooter />
    </>
  );
}

export default CustomerSubCategory;