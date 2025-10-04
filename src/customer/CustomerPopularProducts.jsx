import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerPopularProducts.css";
import CustomerHeader from "./CustomerHeader";
import CustomerFooter from "./CustomerFooter";
import { FiFilter } from "react-icons/fi"; 

const CustomerPopularProducts = () => {
  const navigate = useNavigate();

  const products = [
    { id: 1, img: "https://cdn1.foodviva.com/static-content/food-images/juice-recipes/strawberry-juice-recipe/strawberry-juice-recipe.jpg", name: "Fresh Strawberry Juice", price: 90, category: "Fruits & Vegetables" },
    { id: 2, img: "https://img.freepik.com/free-photo/elevated-view-raw-vegetables-wooden-tray_23-2147870976.jpg", name: "Organic Vegetables Pack", price: 60, category: "Fruits & Vegetables" },
    { id: 3, img: "https://luvflowercake.com/wp-content/uploads/2023/08/1-41.webp", name: "Dairy Milk Pack", price: 200, category: "Dairy & Eggs" },
    { id: 4, img: "https://img.freepik.com/free-photo/front-view-fresh-red-apples-dark-background-color-tree-mellow-ripe-vitamine-apple-pear-juice-food-diet_140725-158134.jpg", name: "Fresh Apples", price: 120, category: "Fruits & Vegetables" },
    { id: 5, img: "https://5.imimg.com/data5/SELLER/Default/2023/10/357378088/BC/JB/KD/33662479/1121-steam-basmati-rice-500x500.jpeg", name: "Steam Basmati Rice", price: 105, category: "Oil & Rice" },
    { id: 6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYWtEEDqzCz9g-dy5fQJ4gGmAGS1S-NOydw&s", name: "SunFlower Oil", price: 100, category: "Oil & Rice" },
  ];

  const categories = [
    "Fruits & Vegetables",
    "Dairy & Eggs",
    "Snacks",
    "Oil & Rice",
    "Coke & Drinks",
    "Instant Food",
    "Pet Care",
    "Tea Coffee",
    "Cleaning Essentials",
    "Bakery Biscuits",
    "Home Office",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(200);
  const [sortOrder, setSortOrder] = useState("none"); 
  const [cartMessage, setCartMessage] = useState(""); 
  const [cartCount, setCartCount] = useState(
    JSON.parse(localStorage.getItem("cart"))?.reduce((sum, item) => sum + item.qty, 0) || 0
  );

  const [showMobileFilters, setShowMobileFilters] = useState(false); 

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceChange = (e) => setMaxPrice(Number(e.target.value));
  const handleSortChange = (e) => setSortOrder(e.target.value);

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = existingCart.findIndex((item) => item.id === product.id);

    if (existingProductIndex >= 0) {
      existingCart[existingProductIndex].qty += 1;
    } else {
      existingCart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCartCount(existingCart.reduce((sum, item) => sum + item.qty, 0));

    setCartMessage(`"${product.name}" added to cart!`);
    setTimeout(() => setCartMessage(""), 2000);
  };

  // Filtered products
  let filteredProducts = products.filter((p) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const priceMatch = p.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  // Sorting
  if (sortOrder === "lowToHigh") filteredProducts.sort((a, b) => a.price - b.price);
  else if (sortOrder === "highToLow") filteredProducts.sort((a, b) => b.price - a.price);

  const handleGoToCheckout = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    navigate("/customer/checkout", { state: { cart } });
  };

  return (
    <>
      <CustomerHeader />

      {cartMessage && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 9999,
          }}
        >
          {cartMessage}
        </div>
      )}

      <div className="popular-products-page container mt-4">
        <div className="row">
          {/* sidebar */}
          <div className={`col-md-3 ${showMobileFilters ? "d-block" : "d-none d-md-block"}`}>
            <div className="filter-box p-3 shadow-sm rounded mb-3">
              <h5>Category</h5>
              <ul className="list-unstyled">
                {categories.map((cat) => (
                  <li key={cat}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    />{" "}
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-box p-3 shadow-sm rounded">
              <h5>Price Range</h5>
              <input
                type="range"
                min="0"
                max="200"
                value={maxPrice}
                onChange={handlePriceChange}
                className="w-100"
              />
              <p className="mt-2">
                Up to: <strong>₹{maxPrice}</strong>
              </p>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-md-9">
            {/* Heading + Sort + Cart + Mobile Filter Icon */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Popular Products</h5>

              <div className="d-flex align-items-center">
                {/* Mobile filter icon */}
                <button
                  className="btn d-md-none me-2"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  style={{ fontSize: "24px", background: "transparent", border: "none" }}
                >
                  <FiFilter />
                </button>

                <select value={sortOrder} onChange={handleSortChange} className="form-select form-select-sm me-3">
                  <option value="none">Sort by</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>

                <button
                  className="btn position-relative"
                  onClick={handleGoToCheckout}
                  style={{ fontSize: "24px", background: "transparent", border: "none" }}
                >
                  🛒
                  {cartCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        backgroundColor: "green",
                        color: "#fff",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px",
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="col-md-4 col-6 mb-4">
                    <div className="card h-100 product-card">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="card-img-top mt-3"
                        style={{ height: "160px", objectFit: "contain" }}
                      />
                      <div className="card-body text-center">
                        <h6 className="card-title">{product.name}</h6>
                        <p className="text-success fw-bold">₹{product.price}</p>
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: "#8fe394ff" }}
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center w-100">
                  <img
                    src="https://cdn.dribbble.com/userupload/25433054/file/original-d1d71c3e80d9ffb2b54db21b69fbd896.gif"
                    alt="No products"
                    style={{ width: "200px" }}
                  />
                  <p className="mt-3 text-danger fw-bold">
                    Products are not available now.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CustomerFooter />
    </>
  );
};

export default CustomerPopularProducts;
