import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CustomerHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("customer_id");

  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // Manage menu state
  const [selectedLocation, setSelectedLocation] = useState(""); // Store selected location
  const [showLocationModal, setShowLocationModal] = useState(false); // Show location modal
  const [searchLocation, setSearchLocation] = useState(""); // Store search term for location
  const [currentLocation, setCurrentLocation] = useState(null); // Store current location

  // Default coordinates (Pullurmpara)
  const pullurmparaCoords = [11.3045, 75.8292];

  useEffect(() => {
    // Fetch user's current location using geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation(position.coords);
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    }
  }, []);

  if (location.pathname === "/customer/login") return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/customer/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Handle search on the map
  const handleLocationSearch = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleSelectLocation = () => {
    if (searchLocation.toLowerCase() === "pullurmpara") {
      setSelectedLocation("Delivery in 10 minutes");
    } else {
      setSelectedLocation(searchLocation);
    }
    setShowLocationModal(false); // Close the modal after selecting a location
  };

  // Handle the use of current location
  const handleUseCurrentLocation = () => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      // Assuming we have a service to check if the coordinates are in Pullurmpara
      // For now, we'll just mock it by comparing with Pullurmpara's coordinates
      const isInPullurmpara =
        Math.abs(latitude - pullurmparaCoords[0]) < 0.01 &&
        Math.abs(longitude - pullurmparaCoords[1]) < 0.01;

      if (isInPullurmpara) {
        setSelectedLocation("Delivery in 10 minutes");
      } else {
        setSelectedLocation("Your current location");
      }
    }
    setShowLocationModal(false); // Close the modal after using current location
  };

  return (
    <header
      style={{
        background: "#ffffff",
        padding: "16px 0",
        marginBottom: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: "0 20px",
          gap: "20px",
        }}
      >
        {/* Left: Brand + Location */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            to="/customer/home"
            style={{
              fontWeight: "bold",
              fontSize: "1.7em",
              color: "#2f855a",
              textDecoration: "none",
              marginRight: 20,
              whiteSpace: "nowrap",
            }}
          >
            Udane
          </Link>

          {/* Delivery & Location Display */}
          <div
            onClick={() => setShowLocationModal(true)}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              lineHeight: "1.4",
            }}
          >
            <span style={{ fontWeight: "bold", fontSize: "15px" }}>
              {selectedLocation
                ? "Delivery in 10 minutes"
                : "Select your location"}
            </span>
            {selectedLocation && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#444",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {selectedLocation}
                <span style={{ fontSize: "12px" }}>▼</span>
              </span>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ flexGrow: 1 }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "250px",
            }}
          />
        </form>

        {/* Profile Icon */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)} // Toggle menu visibility
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#2f855a",
          }}
          title="Profile"
        >
          <i class="fa-regular fa-user"></i>
        </button>
      </div>

      {/* Hamburger Menu: Conditional Rendering */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px", // Position it below the header
            right: 0,
            width: "250px", // Width of the menu
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // Subtle shadow
            padding: "15px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            zIndex: 1000,
            borderRadius: "8px",
          }}
        >
          <Link to="/customer/profile" style={menuItemStyle}>
            Profile
          </Link>
          <Link to="/customer/home" style={menuItemStyle}>Home</Link>
          <Link to="/customer/products" style={menuItemStyle}>Products</Link>
          <Link to="/customer/orders" style={menuItemStyle}>Orders</Link>
          <Link to="/customer/checkout" style={menuItemStyle}>Checkout</Link>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "10px",
              width: "90%",
              maxWidth: "600px",
              height: "70vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ margin: "10px 0" }}>Select Your Location</h3>

            {/* Option to search location */}
            <input
              type="text"
              placeholder="Search for a location"
              value={searchLocation}
              onChange={handleLocationSearch}
              style={{
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                marginBottom: "10px",
                width: "100%",
              }}
            />

            {/* Google Map iframe */}
            <div style={{ flex: 1 }}>
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps?q=${searchLocation || pullurmparaCoords[0]},${searchLocation || pullurmparaCoords[1]}&hl=es;z=14&output=embed`}
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  borderRadius: "8px",
                }}
              ></iframe>
            </div>

            {/* Buttons */}
            <button
              onClick={handleSelectLocation}
              style={{
                marginTop: "10px",
                padding: "8px",
                background: "#2f855a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Select Location
            </button>

            <button
              onClick={handleUseCurrentLocation}
              style={{
                marginTop: "10px",
                padding: "8px",
                background: "#2f855a",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Use My Current Location
            </button>

            <button
              onClick={() => setShowLocationModal(false)}
              style={{
                marginTop: "10px",
                padding: "8px",
                background: "#ccc",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

// Styling for the menu items
const menuItemStyle = {
  textDecoration: "none",
  color: "#2f855a",
  fontWeight: "500",
  fontSize: "16px",
  padding: "10px",
  borderRadius: "6px",
  transition: "background-color 0.3s",
};
