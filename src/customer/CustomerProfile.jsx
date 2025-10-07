import React, { useEffect, useState } from "react";
import CustomerHeader from "./CustomerHeader";

function CustomerProfile() {
  const [customerName, setCustomerName] = useState("Guest");
  const [customerPhone, setCustomerPhone] = useState("7306166866");
  const [activeTab, setActiveTab] = useState("orders"); 

  useEffect(() => {
    const email = localStorage.getItem("customer_email") || "guest@example.com";
    const phone = localStorage.getItem("customer_phone") || "7306166866";

    const nameFromEmail = email.split("@")[0];

    setCustomerName(nameFromEmail);
    setCustomerPhone(phone);
  }, []);

  return (
    <div>
      <CustomerHeader />

      <div className="card m-5" style={{ width: "72rem" }}>
        <div className="card-body d-flex">
          <div className="col-4 p-3">
            <div className="d-flex align-items-center mb-3">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#d3d3d3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "24px",
                  color: "#fff",
                }}
              >
                {customerName.charAt(0).toUpperCase()}
              </div>
              <div className="ms-3">
                <h6 className="mb-0">{customerName}</h6>
                <small className="text-muted">{customerPhone}</small>
              </div>
            </div>

            <div
              className="p-3 mb-3"
              style={{
                backgroundColor: "#23aa4eff",
                borderRadius: "10px",
                color: "#fff",
              }}
            >
              <p className="mb-1">
                You would potentially save <b>₹500</b> per month with Zepto Daily
              </p>
              <button className="btn btn-warning btn-sm">Get Daily</button>
            </div>

            <div className="p-3 mb-3 border rounded">
              <p className="fw-bold mb-1">Udane Cash & Gift Card</p>
              <p className="mb-1">Available Balance: ₹100</p>
              <button className="btn btn-dark btn-sm">Add Balance</button>
            </div>

            <div className="p-3 border rounded bg-light">
              <p className="mb-0 text-danger fw-bold">
                🎁 Free Cash <span className="float-end">₹100</span>
              </p>
            </div>

            <div
              className="p-3 mt-3 border rounded cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={() => setActiveTab("address")}
            >
              My Addresses
            </div>
          </div>

         
<div className="col-8 p-5 bg-light rounded">
  {activeTab === "orders" ? (
    <>
      <div className="text-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
          alt="Orders"
          width="50"
          className="mb-3"
        />
        <h5>No orders yet</h5>
        <button className="btn btn-outline-dark mt-3">Browse products</button>
        <div>
          <button className="btn btn-outline-danger mt-3">↓ Load More</button>
        </div>
      </div>
    </>
  ) : (
    <>
      <div
        className="d-flex justify-content-between align-items-center p-3 mb-3 border rounded"
        style={{ cursor: "pointer" }}
      >
        <span className="text-danger fw-bold">
          <i className="bi bi-plus-lg"></i> Add New Address
        </span>
        <span>›</span>
      </div>

      <h6 className="fw-bold mb-3">Saved Addresses</h6>

      <div className="text-center p-5 border rounded bg-white">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4150/4150897.png"
          alt="No Address"
          width="120"
          className="mb-3"
        />
        <h6 className="text-muted">No Address Added Yet</h6>
      </div>
    </>
  )}
</div>

        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
