import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function POSDashboard() {
  const [analytics, setAnalytics] = useState({
    todaySales: 0,
    totalOrders: 0,
    weekSales: 0,
    monthSales: 0
  });
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const shopId = localStorage.getItem("shop_id");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  async function fetchAnalytics() {
    try {
      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get start of week
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());

      // Get start of month
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

      // Fetch orders for different time periods
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('shop_id', shopId)
        .gte('created_at', startOfMonth.toISOString());

      // Calculate analytics
      const todayOrders = orders?.filter(order => 
        new Date(order.created_at) >= today
      ) || [];

      const weekOrders = orders?.filter(order => 
        new Date(order.created_at) >= startOfWeek
      ) || [];

      const monthOrders = orders || [];

      // Fetch top products from order_items
      const { data: productData } = await supabase
        .from('order_items')
        .select(`
          quantity,
          price,
          products (
            id,
            name
          )
        `)
        .eq('shop_id', shopId)
        .order('quantity', { ascending: false });

      // Calculate product totals
      const productTotals = productData?.reduce((acc, item) => {
        const productId = item.products.id;
        if (!acc[productId]) {
          acc[productId] = {
            name: item.products.name,
            totalQuantity: 0,
            totalSales: 0
          };
        }
        acc[productId].totalQuantity += item.quantity;
        acc[productId].totalSales += item.quantity * item.price;
        return acc;
      }, {});

      setAnalytics({
        todaySales: todayOrders.reduce((sum, order) => sum + order.total, 0),
        totalOrders: todayOrders.length,
        weekSales: weekOrders.reduce((sum, order) => sum + order.total, 0),
        monthSales: monthOrders.reduce((sum, order) => sum + order.total, 0)
      });

      setTopProducts(Object.values(productTotals || {})
        .sort((a, b) => b.totalQuantity - a.totalQuantity)
        .slice(0, 5));

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading analytics...</div>;

  return (
    <>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>Udane POS</div>
          <nav>
            <Link to="/pos/products" style={styles.navLink}>Products</Link>
            <Link to="/pos/order" style={styles.navLink}>Orders</Link>
          </nav>
        </div>
      </header>

      {/* Dashboard Content */}
      <div style={styles.container}>
        <h2 style={styles.title}>Dashboard</h2>

        {/* Sales Overview Cards */}
        <div style={styles.cardsGrid}>
          <div style={styles.card}>
            <h3>Today's Sales</h3>
            <div style={styles.cardValue}>
              ₹{analytics.todaySales}
            </div>
          </div>
          <div style={styles.card}>
            <h3>Total Orders Today</h3>
            <div style={styles.cardValue}>
              {analytics.totalOrders}
            </div>
          </div>
          <div style={styles.card}>
            <h3>This Week's Sales</h3>
            <div style={styles.cardValue}>
              ₹{analytics.weekSales}
            </div>
          </div>
          <div style={styles.card}>
            <h3>This Month's Sales</h3>
            <div style={styles.cardValue}>
              ₹{analytics.monthSales}
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Top Selling Products</h3>
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <div>Product</div>
              <div>Quantity Sold</div>
              <div>Total Sales</div>
            </div>
            {topProducts.map(product => (
              <div key={product.id} style={styles.tableRow}>
                <div>{product.name}</div>
                <div>{product.totalQuantity}</div>
                <div>₹{product.totalSales}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  header: {
    background: "#ffffff",
    padding: "16px 0",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  headerContent: {
    maxWidth: 900,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontWeight: "bold",
    fontSize: "1.5em",
    color: "#2f855a",
  },
  navLink: {
    marginRight: 20,
    color: "#2f855a",
    textDecoration: "none",
    fontWeight: 500,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  title: {
    color: "#2f855a",
    marginBottom: "30px",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  cardValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#2f855a",
    marginTop: "10px",
  },
  section: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "30px",
  },
  sectionTitle: {
    marginBottom: "20px",
    color: "#2d3748",
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    padding: "10px",
    background: "#f7fafc",
    fontWeight: "bold",
    borderRadius: "6px",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr",
    padding: "10px",
    borderBottom: "1px solid #edf2f7",
  }
};
