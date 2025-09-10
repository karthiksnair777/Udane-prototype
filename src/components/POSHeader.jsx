import { Link, useLocation } from "react-router-dom";

export default function POSHeader() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <Link to="/pos/dashboard" style={styles.logo}>
          Udane POS
        </Link>
        <nav style={styles.nav}>
          <Link
            to="/pos/dashboard"
            style={{
              ...styles.navLink,
              ...(isActive('/pos/dashboard') && styles.activeNavLink)
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/pos/products"
            style={{
              ...styles.navLink,
              ...(isActive('/pos/products') && styles.activeNavLink)
            }}
          >
            Products
          </Link>
          <Link
            to="/pos/manage-products"
            style={{
              ...styles.navLink,
              ...(isActive('/pos/manage-products') && styles.activeNavLink)
            }}
          >
            Manage Products
          </Link>
          <Link
            to="/pos/order"
            style={{
              ...styles.navLink,
              ...(isActive('/pos/order') && styles.activeNavLink)
            }}
          >
            Orders
          </Link>
        </nav>
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
    gap: '20px'
  },
  navLink: {
    color: '#2f855a',
    textDecoration: 'none',
    fontWeight: 500,
    padding: '8px 12px',
    borderRadius: '6px',
    transition: 'all 0.2s'
  },
  activeNavLink: {
    backgroundColor: '#2f855a',
    color: 'white'
  }
};
