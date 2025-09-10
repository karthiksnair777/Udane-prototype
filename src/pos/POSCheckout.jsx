import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { QRCodeSVG } from "qrcode.react";

export default function POSCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const [paymentMethod, setPaymentMethod] = useState("cash"); // 'cash' or 'upi'
  const [isPaid, setIsPaid] = useState(false);
  const shopId = localStorage.getItem("shop_id");

  const totalAmount = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handleCheckout = async () => {
    try {
      // Format order data
      const shopOrderData = {
        shop_id: shopId,
        items: cart,
        total_amount: parseFloat(totalAmount.toFixed(2)),
        payment_method: paymentMethod,
        payment_status: isPaid ? "paid" : "unpaid",
        created_at: new Date().toISOString(),
      };

      console.log("Submitting shop order:", shopOrderData); // Debug log

      // Create order in shop_orders table
      const { data: createdOrder, error: orderError } = await supabase
        .from("shop_orders")
        .insert([shopOrderData])
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        throw new Error("Failed to create order");
      }

      // Update product stock - fixed query
      for (const item of cart) {
        // First get current stock
        const { data: productData } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.id)
          .single();

        if (productData) {
          const newStock = productData.stock - item.qty;

          // Update with new stock value
          const { error: stockError } = await supabase
            .from("products")
            .update({ stock: newStock })
            .eq("id", item.id);

          if (stockError) {
            console.error("Stock update error:", stockError);
            throw new Error("Failed to update stock");
          }
        }
      }

      // Clear cart from localStorage
      localStorage.removeItem("pos_cart");

      // Navigate to success page
      navigate("/pos/checkout-success", {
        state: {
          orderId: createdOrder.id,
          paymentMethod,
          isPaid,
          total: totalAmount,
          cart: cart,
        },
        replace: true, // This ensures the user can't go back to checkout page
      });
    } catch (error) {
      console.error("Checkout error:", error);
      alert(error.message || "Error processing checkout");
    }
  };

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

      <div
        style={{
          maxWidth: "500px",
          margin: "60px auto",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#38a169", // light yellow
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <h2 style={{ color: "#ffffffff", marginBottom: "20px" }}>🧾 Checkout</h2>

        <div style={{ marginBottom: "20px" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.qty * item.price}</span>
            </div>
          ))}
        </div>

        <hr />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          <span>Total</span>
          <span>
            ₹{cart.reduce((sum, item) => sum + item.qty * item.price, 0)}
          </span>
        </div>

        {/* Payment Method Selection */}
        <div style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#ffffffff", marginBottom: "10px" }}>Payment Method</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={() => setPaymentMethod("cash")}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                color: "white",
                backgroundColor: paymentMethod === "cash" ? "#2f855a" : "#e2e8f0",
                marginRight: "10px",
              }}
            >
              Cash Payment
            </button>
            <button
              onClick={() => setPaymentMethod("upi")}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                color: "white",
                backgroundColor: paymentMethod === "upi" ? "#2f855a" : "#e2e8f0",
              }}
            >
              UPI Payment
            </button>
          </div>

          {/* UPI QR Code Section */}
          {paymentMethod === "upi" && (
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <QRCodeSVG
                value={`upi://pay?pa=sujithbalan2001@okhdfcbank&pn=UdanePOS&am=${totalAmount}&cu=INR`}
                size={200}
                level="H"
              />
              <p style={{ color: "#ffffffff", marginTop: "10px" }}>Scan QR code to pay</p>
            </div>
          )}

          {/* Payment Status Toggle */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={() => setIsPaid(true)}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                color: "white",
                backgroundColor: isPaid ? "#2f855a" : "#e2e8f0",
                marginRight: "10px",
              }}
            >
              Mark as Paid
            </button>
            <button
              onClick={() => setIsPaid(false)}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                color: "white",
                backgroundColor: !isPaid ? "#e53e3e" : "#e2e8f0",
              }}
            >
              Mark as Unpaid
            </button>
          </div>
        </div>

        {/* Complete Order Button */}
        <button
          onClick={handleCheckout}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#ffffffff",
            color: "black",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Complete Order
        </button>
      </div>
    </>
  );
}
