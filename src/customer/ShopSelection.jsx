import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function ShopSelection() {
  const [shops, setShops] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from("shops").select("*");
      if (!error) setShops(data);
    }
    load();
  }, []);

  const selectShop = (shop) => {
    localStorage.setItem("selected_shop", shop.id);
    navigate("/customer/products");
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto" }}>
      <h2>Select a Shop</h2>
      {shops.map((shop) => (
        <div
          key={shop.id}
          onClick={() => selectShop(shop)}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          {shop.name}
        </div>
      ))}
    </div>
  );
}

