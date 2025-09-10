import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function POSProducts() {
  const navigate = useNavigate();
  const shopId = localStorage.getItem("shop_id");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Add offline support
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("shop_id", shopId);
          
        if (error) throw error;
        setProducts(data);
        localStorage.setItem('cached_products', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching products:', error);
        // Use cached data if available
        const cached = localStorage.getItem('cached_products');
        if (cached) setProducts(JSON.parse(cached));
      }
    }
    if (shopId) load();
  }, [shopId]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .eq("shop_id", shopId);
          
        if (error) throw error;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    if (shopId) loadCategories();
  }, [shopId]);

  const [isCartVisible, setIsCartVisible] = useState(true);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pos_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('pos_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === p.id);
      if (existing) {
        const updated = prev.map((item) =>
          item.id === p.id ? { ...item, qty: item.qty + 1 } : item
        );
        return updated;
      }
      return [...prev, { ...p, qty: 1 }];
    });
    setIsCartVisible(true); // Show cart when adding items
  };

  const goToCheckout = () => {
    navigate("/pos/checkout", { state: { cart } });
  };

  // Add keyboard shortcuts
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'F4') goToCheckout();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const updateCartQuantity = (productId, change) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === productId) {
          const newQty = Math.max(0, item.qty + change);
          return newQty === 0 ? null : { ...item, qty: newQty };
        }
        return item;
      }).filter(Boolean); // Remove items with quantity 0
    });
  };

  // Modify filtered products to exclude out of stock items
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
      product.stock > 0
    );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProductImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl("");
    }
  };

  const addNewProduct = async () => {
    if (!newProductName || !newProductPrice || !newProductImage) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from('product-images')
        .upload(`public/${newProductImage.name}`, newProductImage);

      if (uploadError) throw uploadError;

      // Get the public URL of the uploaded image
      const imageUrl = `https://your-supabase-url.supabase.co/storage/v1/object/public/product-images/public/${newProductImage.name}`;

      // Insert new product into the database
      const { error } = await supabase
        .from("products")
        .insert([
          {
            name: newProductName,
            price: newProductPrice,
            image_url: imageUrl,
            shop_id: shopId,
            stock: 0 // Only include stock field
          }
        ]);

      if (error) throw error;

      // Update local state
      setProducts((prev) => [
        ...prev,
        {
          id: Date.now(), // Temporary ID, Supabase will assign a real one
          name: newProductName,
          price: newProductPrice,
          image_url: imageUrl,
          shop_id: shopId,
          stock: 0
        }
      ]);

      // Clear form
      setNewProductName("");
      setNewProductPrice("");
      setNewProductImage(null);
      setPreviewUrl("");
      setShowModal(false);
    } catch (error) {
      console.error('Error adding new product:', error);
    }
  };

  // Add cart toggle button
  const CartToggleButton = () => (
    <button
      onClick={() => setIsCartVisible(!isCartVisible)}
      style={{
        position: 'fixed',
        right: isCartVisible ? '320px' : '20px',
        bottom: '20px',
        backgroundColor: '#38a169',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: 1000,
      }}
    >
      🛒 {cart.length > 0 && <span>({cart.reduce((sum, item) => sum + item.qty, 0)})</span>}
    </button>
  );

  return (
    <>
      {/* POS Header/Menu */}
      <header
        style={{
          background: "#ffffffff",
          padding: "16px 0",
          marginBottom: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.5em",
              color: "#2f855a",
            }}
          >
            Udane POS
          </div>
          <nav>
            <Link
              to="/pos/dashboard"
              style={{
                marginRight: 20,
                color: "#2f855a",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/pos/products"
              style={{
                marginRight: 20,
                color: "#2f855a",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Products
            </Link>
            <Link
              to="/pos/manage-products"
              style={{
                marginRight: 20,
                color: "#2f855a",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Manage Products
            </Link>
            <Link
              to="/pos/order"
              style={{
                color: "#2f855a",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Orders
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Layout */}
      <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#ffffffff" }}>
        {/* Product List - adjust width when cart is visible */}
        <div style={{ 
          flex: 1,
          padding: "30px",
          marginRight: isCartVisible ? '300px' : '0',
          transition: 'margin-right 0.3s ease'
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ color: "#2f855a" }}>Products</h2>
          </div>

          {/* Remove stockAlerts div */}

          {/* Add category filter */}
          <div style={{marginBottom: "20px"}}>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{padding: "8px", borderRadius: "6px"}}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Add search input */}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #e2e8f0",
                fontSize: "16px"
              }}
            />
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginTop: "20px" }}>
            {filteredProducts.filter(p => selectedCategory === 'all' || p.category_id === selectedCategory).map((p) => (
              <div
                key={p.id}
                onClick={() => addToCart(p)}
                style={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "15px",
                  minWidth: "160px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "6px", marginBottom: "10px" }}
                  />
                )}
                <div style={{ fontWeight: "600", color: "#2d3748" }}>{p.name}</div>
                <div style={{ color: "#4a5568" }}>₹{p.price}</div>
                <div style={{ color: "#e53e3e", fontSize: "0.9em", marginTop: "5px" }}>
                  {p.stock === 0 ? 'Out of stock' : `${p.stock} in stock`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Cart */}
        <CartToggleButton />
        
        {/* Sliding Cart Panel */}
        <div style={{
          position: 'fixed',
          top: 0,
          right: isCartVisible ? 0 : '-300px',
          width: '300px',
          height: '100vh',
          backgroundColor: "#38a169",
          padding: "30px",
          transition: 'right 0.3s ease',
          overflowY: 'auto',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
          zIndex: 999,
        }}>
          {/* Cart Section */}
          <div style={{
            flex: 1,
            backgroundColor: "#38a169",
            padding: "30px",
            borderLeft: "3px solid #ffffffff",
          }}>
            <h3 style={{ color: "#ffffffff", marginBottom: "20px" }}>🛒 Cart</h3>

            {cart.length === 0 ? (
              <p style={{ color: "#ffffffff" }}>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} style={{ 
                  marginBottom: "15px", 
                  backgroundColor: "rgba(255,255,255,0.1)",
                  padding: "10px",
                  borderRadius: "8px"
                }}>
                  <div style={{ color: "#fff", marginBottom: "8px" }}>{item.name}</div>
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center" 
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCartQuantity(item.id, -1);
                        }}
                        style={styles.quantityButton}
                      >
                        -
                      </button>
                      <span style={{ color: "#fff" }}>{item.qty}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCartQuantity(item.id, 1);
                        }}
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                    <div style={{ color: "#fff" }}>₹{item.qty * item.price}</div>
                  </div>
                </div>
              ))
            )}

            <hr style={{ margin: "20px 0" }} />
            <strong style={{ color: "#fff" }}>
              Total: ₹{cart.reduce((sum, item) => sum + item.qty * item.price, 0)}
            </strong>
            
            <button
              onClick={goToCheckout}
              disabled={cart.length === 0}
              style={styles.checkoutButton}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}>
          <div style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "400px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          }}>
            <h3 style={{ marginBottom: "20px", color: "#2f855a" }}>Add New Product</h3>

            <input
              type="text"
              placeholder="Product Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <input
              type="number"
              placeholder="Price"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <input type="file" accept="image/*" onChange={handleImageChange} />

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  borderRadius: "8px",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button
                onClick={() => {
                  setShowModal(false);
                  setNewProductImage(null);
                  setPreviewUrl("");
                }}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#e53e3e",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={addNewProduct}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#38a169",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}    
    </>
  );
}

const styles = {
  quantityButton: {
    backgroundColor: "#2f855a",
    color: "white",
    border: "none",
    borderRadius: "4px",
    width: "24px",
    height: "24px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  checkoutButton: {
    marginTop: "20px",
    padding: "12px 18px",
    backgroundColor: "#2f855a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    width: "100%",
    cursor: "pointer",
    opacity: 1
  }
};