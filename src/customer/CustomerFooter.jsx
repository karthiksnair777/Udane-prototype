import React from "react";
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

//import playstore from "../assets/playstore.png";

const CustomerFooter = () => {
  return (
    <footer style={{

      paddingTop: "3rem",
      paddingBottom: "1rem",
      marginTop: "3rem"
    }}>
      <div className="container">
        <div className="row">
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 style={{ color: "#2f855a", fontWeight: "bold", fontSize: "1.8rem" }}>Udane</h4>
            <p style={{ fontSize: "15px", color: "#070707ff", lineHeight: "1.6" }}>
              At Udane, we offer fresh, quality groceries at great prices,
              ensuring convenience and value.
            </p>
           
            <div className="d-flex gap-3 mt-3">
              <FaFacebook size={20} style={{ color: "#040404ff", cursor: "pointer" }} />
              <FaXTwitter size={20} style={{ color: "#040404ff", cursor: "pointer" }} />
              <FaInstagram size={20} style={{ color: "#040404ff", cursor: "pointer" }} />
              <FaYoutube size={20} style={{ color: "#040404ff", cursor: "pointer" }} />
              <FaLinkedin size={20} style={{ color: "#040404ff", cursor: "pointer" }} />
            </div>
            
            {/* <div className="d-flex gap-2 mt-3">
              <img 
                src={playstore} 
                alt="Google Play" 
                height="70" 
                width="100" 
                style={{ objectFit: "contain", borderRadius: "8px" }} 
              />
            </div> */}
          </div>

         
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold" style={{ color:'black' }}>Support</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="/about" style={{ color: "#131313ff", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#131313ff"} onMouseOut={(e) => e.target.style.color = "#2f2f2fff"}>About Us</a></li>
              <li><a href="/contact" style={{ color: "#131313ff", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#131313ff"} onMouseOut={(e) => e.target.style.color = "#2f2f2fff"}>Contact Us</a></li>
              <li><a href="/faq" style={{ color: "#131313ff", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#131313ff"} onMouseOut={(e) => e.target.style.color = "#2f2f2fff"}>FAQ</a></li>
            </ul>
          </div>

          
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold" style={{ color:'black' }}>Legal</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="/privacy" style={{ color: "#131313ff", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#131313ff"} onMouseOut={(e) => e.target.style.color = "#e0e0e0"}>Privacy Policy</a></li>
              <li><a href="/terms" style={{ color: "#131313ff", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#131313ff"} onMouseOut={(e) => e.target.style.color = "#e0e0e0"}>Terms & Condition</a></li>
              <li><a href="/refund" style={{ color: "#131313ff", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "#131313ff"} onMouseOut={(e) => e.target.style.color = "#e0e0e0"}>Refund Policy</a></li>
            </ul>
          </div>

          
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold" style={{ color:'black' }}>Contact</h6>
            <ul className="list-unstyled mt-3" style={{ color: "#131313ff" }}>
              <li>📞 9876543210</li>
              <li>✉️ support@udane.online</li>
              <li>📍 Calicut, Kerala 673121</li>
            </ul>
          </div>
        </div>
      </div>
      
      <hr style={{ borderColor: "black", opacity: "0.3", margin: "1rem 0" }} />

      <div className="text-center mt-4" style={{ fontSize: "13px", color: "black", fontWeight: "bold" }}>
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "#2f855a", fontWeight: "bold" }}>Udane</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default CustomerFooter;