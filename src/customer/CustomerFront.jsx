import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function CustomerFront() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Set a timeout for 2 seconds to redirect
    const timer = setTimeout(() => {
      setLoading(false);  // Set loading to false after 2 seconds (optional, in case you want to hide the spinner)
      navigate('/customer/login ');  // Redirect to the login page
    }, 2000); // 2000ms = 2 seconds

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]); // Dependency array, to make sure navigate is available

  // Show loading spinner for the first 2 seconds
  if (loading) {
    return (
      <div className='fluid-container' style={{ height: '100vh', overflow: 'hidden' }}>
        <div className='bg-success' style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='text-center text-white'>
            <h1>UDANE</h1>
            <p className='fs-6'>The complete grocery shopping experience</p>
          </div>
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-white" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // You can return an empty div or anything else after redirection (although the redirection should happen before rendering here)
  return <div></div>;
}

export default CustomerFront;
