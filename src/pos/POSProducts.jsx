import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function POSProducts() {
  const navigate = useNavigate();
  const shopId = localStorage.getItem("shop_id");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockAlerts, setStockAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === p.id);
      if (existing) {
        return prev.map((item) =>
          item.id === p.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProductImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl("");
    }
  };

  const uploadImage = async (file) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file);

    if (error) {
      console.error("Upload failed:", error.message);
      return null;
    }

    const { data: publicUrl } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);

    return publicUrl?.publicUrl || null;
  };

  const addNewProduct = async () => {
    if (!newProductName.trim() || isNaN(newProductPrice) || Number(newProductPrice) <= 0) {
      alert("Please enter valid product details");
      return;
    }

    let imageUrl = null;

    if (newProductImage) {
      imageUrl = await uploadImage(newProductImage);
      if (!imageUrl) {
        alert("Image upload failed");
        return;
      }
    }

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          shop_id: shopId,
          name: newProductName,
          price: Number(newProductPrice),
          image_url: imageUrl,
        },
      ])
      .select()
      .single();

    if (!error && data) {
      setProducts((prev) => [...prev, data]);
      setNewProductName("");
      setNewProductPrice("");
      setNewProductImage(null);
      setPreviewUrl("");
      setShowModal(false);
    } else {
      alert("Failed to add product.");
    }
  };

  const goToCheckout = () => {
    navigate("/pos/checkout", { state: { cart } });
  };

  // Add keyboard shortcuts
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'F2') setShowModal(true);
    if (e.key === 'F4') goToCheckout();
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Add stock monitoring
  useEffect(() => {
    const checkLowStock = () => {
      const lowStockItems = products.filter(p => p.stock < p.minimum_stock);
      setStockAlerts(lowStockItems);
    };
    checkLowStock();
  }, [products]);

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

  // Add filtered products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#ffffffff",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        {/* Product List */}
        <div style={{ flex: 2, padding: "30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ color: "#2f855a" }}>Products</h2>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: "10px 16px",
                backgroundColor: "#38a169",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              + Add Product
            </button>
          </div>

          {stockAlerts.length > 0 && (
          <div style={{
            background: "#fff3cd",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "20px"
          }}>
            <h4>⚠️ Low Stock Alerts</h4>
            {stockAlerts.map(item => (
              <div key={item.id}>
                {item.name}: {item.stock} remaining
              </div>
            ))}
          </div>
        )}

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
                  {p.stock < p.minimum_stock ? 'Low stock!' : `${p.stock} in stock`}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div
  style={{
    flex: 1,
    backgroundColor: "#38a169",
    padding: "30px",
    borderLeft: "3px solid #ffffffff",
  }}
>
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
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "10px" 
          }}>
            <button
              onClick={() => updateCartQuantity(item.id, -1)}
              style={{
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
              }}
            >
              -
            </button>
            <span style={{ color: "#fff" }}>{item.qty}</span>
            <button
              onClick={() => updateCartQuantity(item.id, 1)}
              style={{
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
              }}
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
  <strong>
    Total: ₹
    {cart.reduce((sum, item) => sum + item.qty * item.price, 0)}
  </strong>
  <br />
  <button
    onClick={goToCheckout}
    disabled={cart.length === 0}
    style={{
      marginTop: "20px",
      padding: "12px 18px",
      backgroundColor: "#2f855a",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontWeight: "bold",
      width: "100%",
      cursor: cart.length === 0 ? "not-allowed" : "pointer",
      opacity: cart.length === 0 ? 0.6 : 1,
    }}
  >
    Proceed to Checkout
  </button>
</div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
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
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            }}
          >
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
