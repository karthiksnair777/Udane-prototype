import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function POSHeader({ newOrdersCount = 0 }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shopInfo, setShopInfo] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const shopId = localStorage.getItem("shop_id");
  const navigate = useNavigate();

  useEffect(() => {
    async function getShopInfo() {
      if (!shopId) return;
      
      const { data, error } = await supabase
        .from('shops')
        .select('name')
        .eq('id', shopId)
        .single();
        
      if (!error && data) {
        setShopInfo(data);
      }
    }
    getShopInfo();
  }, [shopId]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('shop_id');
    localStorage.removeItem('pos_cart');
    // Clear any other POS-related data from localStorage
    navigate('/pos/login');
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <Link to="/pos/dashboard" style={styles.logo}>
          Udane POS
        </Link>

        <div style={styles.rightSection}>
          {/* Profile with Order Notification */}
          <div style={styles.profile} onClick={() => setIsProfileOpen(!isProfileOpen)}>
            <div style={styles.profileIcon}>👤</div>
            <div style={styles.shopName}>
              {shopInfo?.name || 'Loading...'}
            </div>
            {newOrdersCount > 0 && (
              <div style={styles.notification}>
                {newOrdersCount}
              </div>
            )}
            {isProfileOpen && (
              <div style={styles.profileDropdown}>
                <div style={styles.dropdownItem} onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={styles.menuButton}>
            <span style={styles.hamburger}>☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav style={styles.mobileNav}>
            <Link 
              to="/pos/dashboard" 
              style={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/pos/products" 
              style={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/pos/manage-products" 
              style={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Manage Products
            </Link>
            <Link 
              to="/pos/order" 
              style={styles.navLink}
              onClick={() => setIsMenuOpen(false)}
            >
              Manage Orders
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

const styles = {
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
    justifyContent: 'space-between',
    position: 'relative'
  },
  logo: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#2f855a',
    textDecoration: 'none'
  },
  menuButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    color: '#2f855a',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center'
  },
  hamburger: {
    fontSize: '24px',
    lineHeight: 1
  },
  mobileNav: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: 'white',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    zIndex: 1000
  },
  navLink: {
    color: '#2f855a',
    textDecoration: 'none',
    padding: '12px 16px',
    display: 'block',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    fontWeight: '500'
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: 'rgba(47, 133, 90, 0.1)'
  },
  profileIcon: {
    fontSize: '20px',
    color: '#2f855a'
  },
  shopName: {
    color: '#2f855a',
    fontWeight: '500',
    fontSize: '14px'
  },
  profileDropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    borderRadius: '6px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    padding: '8px 0',
    marginTop: '4px',
    minWidth: '150px',
    zIndex: 1001
  },
  dropdownItem: {
    padding: '8px 16px',
    color: '#e53e3e',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#fff5f5'
    }
  },
  notification: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#e53e3e',
    color: 'white',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    animation: 'blink 1s infinite'
  },
  '@keyframes blink': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0.5 },
    '100%': { opacity: 1 }
  }
};


