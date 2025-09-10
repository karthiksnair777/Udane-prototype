import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function POSCheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, paymentMethod, isPaid, total, cart } = location.state || {};
  const receiptRef = useRef();

  const handlePrint = () => {
    const printContent = `
      <style>
        body { font-family: 'Arial', sans-serif; }
        .receipt { padding: 20px; max-width: 300px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 20px; }
        .items { margin: 20px 0; }
        .item { display: flex; justify-content: space-between; margin: 5px 0; }
        .total { border-top: 1px solid #000; margin-top: 10px; padding-top: 10px; }
      </style>
      <div class="receipt">
        <div class="header">
          <h2>Udane POS</h2>
          <p>Order #${orderId}</p>
          <p>${new Date().toLocaleString()}</p>
        </div>
        <div>
          <p>Payment: ${paymentMethod}</p>
          <p>Status: ${isPaid ? 'PAID' : 'UNPAID'}</p>
        </div>
        <div class="items">
          ${cart?.map(item => `
            <div class="item">
              <span>${item.name} x ${item.qty}</span>
              <span>₹${item.price * item.qty}</span>
            </div>
          `).join('')}
        </div>
        <div class="total">
          <strong>Total: ₹${total}</strong>
        </div>
        <div class="header">
          <p>Thank you for your purchase!</p>
        </div>
      </div>
    `;

    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Order Complete! 🎉</h2>
        <p>Order #{orderId} has been processed successfully.</p>
        <div style={styles.actions}>
          <button onClick={handlePrint} style={styles.button}>
            🖨️ Print Receipt
          </button>
          <button onClick={() => navigate('/pos/products')} style={styles.button}>
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  title: {
    color: '#2f855a',
    marginBottom: '20px'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '20px'
  },
  button: {
    backgroundColor: '#2f855a',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};
    backgroundColor: '#f8f9fa'
  },
  receiptHeader: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  paymentInfo: {
    marginBottom: '15px',
    padding: '10px 0',
    borderBottom: '1px dashed #ccc'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 0'
  },
  total: {
    borderTop: '1px dashed #ccc',
    marginTop: '15px',
    paddingTop: '15px',
    textAlign: 'right'
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '0.9em'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center'
  },
  printButton: {
    backgroundColor: '#2f855a',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  backButton: {
    backgroundColor: '#4a5568',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};
