import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function POSManageProducts() {
  const shopId = localStorage.getItem("shop_id");
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState(null);
  const [newProductStock, setNewProductStock] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [shopId]);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("shop_id", shopId);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
      alert('Error loading products');
    }
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

  const handleSave = async () => {
    try {
      if (!newProductName || !newProductPrice) {
        alert("Please fill in all required fields");
        return;
      }

      let imageUrl = editingProduct?.image_url;

      if (newProductImage) {
        // First, get bucket URL
        const { data: { publicUrl } = {} } = supabase
          .storage
          .from('product-images')
          .getPublicUrl(`public/${Date.now()}-${newProductImage.name}`);

        // Upload image
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(`public/${Date.now()}-${newProductImage.name}`, newProductImage);

        if (uploadError) {
          console.error('Image upload error:', uploadError);
          throw new Error('Failed to upload image');
        }

        imageUrl = publicUrl;
      }

      const productData = {
        name: newProductName,
        price: parseFloat(newProductPrice),
        image_url: imageUrl,
        shop_id: shopId,
        stock: parseInt(newProductStock) || 0
      };

      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;
      } else {
        // Insert new product
        const { error } = await supabase
          .from("products")
          .insert([productData]);

        if (error) throw error;
      }

      await loadProducts();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert(error.message || 'Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProductName(product.name);
    setNewProductPrice(product.price);
    setNewProductStock(product.stock);
    setPreviewUrl(product.image_url);
    setShowModal(true);
  };

  const resetForm = () => {
    setNewProductName("");
    setNewProductPrice("");
    setNewProductImage(null);
    setNewProductStock("");
    setPreviewUrl("");
    setShowModal(false);
    setEditingProduct(null);
  };

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

      <div style={styles.container}>
        <div style={styles.headerBar}>
          <h2>Manage Products</h2>
          <button onClick={() => setShowModal(true)} style={styles.addButton}>
            + Add Product
          </button>
        </div>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={styles.productCard}>
              {product.image_url && (
                <img src={product.image_url} alt={product.name} style={styles.productImage} />
              )}
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <p>Stock: {product.stock}</p>
              <button 
                onClick={() => handleEdit(product)}
                style={styles.editButton}
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              
              <input
                type="text"
                placeholder="Product Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                style={styles.input}
              />

              <input
                type="number"
                placeholder="Price"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                style={styles.input}
              />

              <input
                type="number"
                placeholder="Stock"
                value={newProductStock}
                onChange={(e) => setNewProductStock(e.target.value)}
                style={styles.input}
              />

              <input type="file" accept="image/*" onChange={handleImageChange} />

              {previewUrl && (
                <img src={previewUrl} alt="Preview" style={styles.previewImage} />
              )}

              <div style={styles.buttonGroup}>
                <button onClick={resetForm} style={styles.cancelButton}>
                  Cancel
                </button>
                <button onClick={handleSave} style={styles.saveButton}>
                  {editingProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  headerBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "6px",
    border: "1px solid #e2e8f0"
  },
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px"
  },
  productCard: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  productImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px"
  },
  editButton: {
    backgroundColor: "#2f855a",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "500px"
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd"
  },
  previewImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "6px",
    marginTop: "10px"
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px"
  },
  addButton: {
    backgroundColor: "#2f855a",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer"
  },
  saveButton: {
    backgroundColor: "#2f855a",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  cancelButton: {
    backgroundColor: "#e53e3e",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};