import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function CustomerCart() {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const handleCheckout = async () => {
  const shopId = localStorage.getItem("selected_shop");
  const customerId = localStorage.getItem("customer_id");
  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  console.log("🧾 Submitting Order:", { shopId, customerId, total });

  if (!shopId || !customerId) {
    alert("Missing shop or customer ID.");
    return;
  }

  const { data: order, error } = await supabase
    .from("orders")
    .insert([
      {
        shop_id: shopId,
        customer_id: customerId,
        total: total,
        from_customer: true,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("❌ Supabase Order Insert Error:", error);
    alert(`Failed to create order: ${error.message}`);
    return;
  }

  const orderItems = cart.map((item) => ({
    order_id: order.id,
    product_id: item.id,
    qty: item.qty,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("❌ Supabase Order Items Error:", itemsError);
    alert(`Failed to insert order items: ${itemsError.message}`);
    return;
  }

  alert("✅ Order placed successfully!");
  navigate("/customer/orders");
};

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} × {item.qty} = ₹{item.qty * item.price}
        </div>
      ))}
      <hr />
      <strong>
        Total: ₹{cart.reduce((sum, item) => sum + item.qty * item.price, 0)}
      </strong>
      <br />
      <button onClick={handleCheckout} style={{ marginTop: 20 }}>
        Checkout
      </button>
    </div>
  );
}
