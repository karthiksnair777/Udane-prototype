import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import POSHeader from "../components/POSHeader";

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
        // Check if adding one more would exceed stock
        if (existing.qty >= p.stock) {
          alert(`Only ${p.stock} items available in stock`);
          return prev;
        }
        return prev.map((item) =>
          item.id === p.id ? { ...item, qty: item.qty + 1 } : item
        );
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
          // Find the product to check stock
          const product = products.find(p => p.id === productId);
          if (!product) return item;

          // Calculate new quantity
          const newQty = Math.max(0, item.qty + change);
          
          // Check stock limit when increasing
          if (change > 0 && newQty > product.stock) {
            alert(`Only ${product.stock} items available in stock`);
            return item;
          }

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
      <POSHeader />
      <div style={styles.mainContainer}>
        <div style={styles.contentContainer}>
          <div style={styles.productSection}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ color: "#2f855a" }}>Products</h2>
            </div>

            {/* Remove stockAlerts div */}

            {/* Add category filter */}
            <div style={styles.filterBar}>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={styles.categorySelect}
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
                style={styles.searchInput}
              />
            </div>

            <div style={styles.productGrid}>
              {filteredProducts.filter(p => selectedCategory === 'all' || p.category_id === selectedCategory).map((p) => (
                <div
                  key={p.id}
                  onClick={() => addToCart(p)}
                  style={styles.productCard}
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

          <div style={{
            position: 'fixed',
            top: 0,
            right: isCartVisible ? 0 : '-340px',
            width: '340px',
            height: '100vh',
            backgroundColor: '#38a169',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 999,
            transition: 'right 0.3s ease'
          }}>
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h3 style={{ color: "#fff", margin: 0 }}>🛒 Cart</h3>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {cart.length === 0 ? (
                <p style={{ color: "#fff" }}>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '10px'
                  }}>
                    <div style={{ color: "#fff", marginBottom: "8px" }}>{item.name}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          updateCartQuantity(item.id, -1);
                        }} style={styles.quantityButton}>-</button>
                        <span style={{ color: "#fff" }}>{item.qty}</span>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          updateCartQuantity(item.id, 1);
                        }} style={styles.quantityButton}>+</button>
                      </div>
                      <div style={{ color: "#fff" }}>₹{item.qty * item.price}</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <div style={{ color: "#fff", marginBottom: "15px" }}>
                Total: ₹{cart.reduce((sum, item) => sum + item.qty * item.price, 0)}
              </div>
              <button
                onClick={goToCheckout}
                disabled={cart.length === 0}
                style={styles.checkoutButton}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          <CartToggleButton />
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
  // Layout & Container styles
  mainContainer: {
    maxWidth: '100vw',
    minHeight: '100vh',
    backgroundColor: '#f7fafc'
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    padding: '12px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#2f855a',
    textDecoration: 'none'
  },
  nav: {
    display: 'flex',
    gap: '20px',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  mobileMenu: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  },
  navLink: {
    color: '#2f855a',
    textDecoration: 'none',
    fontWeight: 500,
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'background 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(47, 133, 90, 0.1)'
    }
  },
  activeNavLink: {
    backgroundColor: '#2f855a',
    color: 'white',
    '&:hover': {
      backgroundColor: '#2f855a'
    }
  },

  // Content Layout
  contentContainer: {
    display: 'flex',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '20px',
    gap: '30px',
    '@media (max-width: 1024px)': {
      flexDirection: 'column'
    }
  },
  productSection: {
    flex: '1 1 auto',
    '@media (min-width: 1024px)': {
      marginRight: props => props.isCartVisible ? '320px' : '0'
    }
  },
  filterBar: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    '@media (max-width: 768px)': {
      flexDirection: 'column'
    }
  },
  searchInput: {
    flex: 1,
    minWidth: '200px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '16px',
    transition: 'border-color 0.2s',
    '&:focus': {
      outline: 'none',
      borderColor: '#2f855a'
    }
  },
  categorySelect: {
    minWidth: '150px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    cursor: 'pointer'
  },

  // Product Grid
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    '@media (max-width: 640px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))'
    }
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '15px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #e2e8f0',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    }
  },

  // Cart Styles
  cartPanel: {
    position: 'fixed',
    top: 0,
    right: props => props.isCartVisible ? 0 : '-340px',
    width: '340px',
    height: '100vh',
    backgroundColor: '#38a169',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 999,
    transition: 'right 0.3s ease'
  },
  cartHeader: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  },
  cartItems: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px'
  },
  cartItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    animation: 'slideIn 0.3s ease'
  },
  cartFooter: {
    padding: '20px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  button: {
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
    '&:hover': {
      transform: 'translateY(-1px)'
    },
    '&:active': {
      transform: 'translateY(1px)'
    }
  },
  checkoutButton: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#2f855a',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  quantityButton: {
    backgroundColor: '#2f855a',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#276749'
    }
  },
  cartItemControls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  closeButton: {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0 8px'
  }
};

// Remove keyframes object and add it to CSS file instead