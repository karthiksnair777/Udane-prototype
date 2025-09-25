import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { QRCodeSVG } from "qrcode.react";
import POSHeader from "../components/POSHeader";

export default function POSCheckout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];
  const [paymentMethod, setPaymentMethod] = useState("cash"); // 'cash' or 'upi'
  const [isPaid, setIsPaid] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const shopId = localStorage.getItem("shop_id");

  const totalAmount = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  const sendWhatsAppMessage = (phone, orderDetails) => {
    // Format phone number (remove spaces, add country code if needed)
    const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone.replace(/\s/g, '');
    
    // Create message text
    const message = `Thank you for your purchase at Udane POS!\n\n`
      + `Order #${orderDetails.id}\n`
      + `Total: ₹${totalAmount}\n\n`
      + `Items:\n${cart.map(item => 
          `${item.name} x ${item.qty} = ₹${item.price * item.qty}`
        ).join('\n')}\n\n`
      + `Payment: ${paymentMethod.toUpperCase()}\n`
      + `Status: ${isPaid ? 'PAID' : 'UNPAID'}`;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
  };

  const handleCheckout = async () => {
    if (!customerName || !customerPhone) {
      alert("Please enter customer details");
      return;
    }

    try {
      setIsProcessing(true);

      // First check if customer exists
      const { data: existingCustomer, error: customerError } = await supabase
        .from("pos_customers")
        .select("*")
        .eq("phone_number", customerPhone)
        .eq("shop_id", shopId)
        .single();

      let customerId;

      if (!existingCustomer) {
        // Create new customer
        const { data: newCustomer, error: createError } = await supabase
          .from("pos_customers")
          .insert([{
            name: customerName,
            phone_number: customerPhone,
            shop_id: shopId
          }])
          .select()
          .single();

        if (createError) throw createError;
        customerId = newCustomer.id;
      } else {
        customerId = existingCustomer.id;
      }

      // Create order with customer reference
      const { data: orderData, error: orderError } = await supabase
        .from("shop_orders")
        .insert([{
          shop_id: shopId,
          customer_id: customerId,
          items: cart,
          total_amount: totalAmount,
          payment_method: paymentMethod,
          payment_status: isPaid ? 'paid' : 'unpaid'
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Send WhatsApp message
      sendWhatsAppMessage(customerPhone, orderData);

      // Clear cart from localStorage
      localStorage.removeItem('pos_cart');

      // Navigate to success with customer info
      navigate("/pos/checkout-success", { 
        state: { 
          orderId: orderData.id,
          customerName,
          customerPhone,
          paymentMethod,
          isPaid,
          total: totalAmount,
          cart 
        }
      });

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error processing checkout: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <POSHeader />
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

        {/* Customer Details Form */}
        <div style={{ marginTop: "20px", backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
          <h3 style={{ color: "#2f855a", marginBottom: "10px" }}>Customer Details</h3>
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              fontSize: "16px",
            }}
            required
          />
          <input
            type="tel"
            placeholder="WhatsApp Number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              fontSize: "16px",
            }}
            required
          />
        </div>

        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "20px",
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
            disabled={!customerName || !customerPhone || isProcessing}
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
            {isProcessing ? "Processing..." : "Complete Order"}
          </button>
        </div>
      </div>
    </>
  );
}
