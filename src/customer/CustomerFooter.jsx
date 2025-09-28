import React from "react";
import {
  FaFacebook,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

import playstore from "../assets/playstore.png";

const CustomerFooter = () => {
  return (
    <footer className="bg-light text-dark pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h4 style={{ color: "green", fontWeight: "bold" }}>Udane</h4>
            <p style={{ fontSize: "15px" }}>
              At Udane, we offer fresh, quality groceries at great prices,
              ensuring convenience and value.
            </p>
           
            <div className="d-flex gap-3 mt-3">
              <FaFacebook size={20} />
              <FaXTwitter size={20} />
              <FaInstagram size={20} />
              <FaYoutube size={20} />
              <FaLinkedin size={20} />
            </div>
            
            <div className="d-flex gap-2 mt-3">
              <img src={playstore} alt="Google Play" height="70" width="100" object-fit=" contain" />
            </div>
          </div>

         
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold">Support</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="/about" className="text-dark text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-dark text-decoration-none">Contact Us</a></li>
              <li><a href="/faq" className="text-dark text-decoration-none">FAQ</a></li>
            </ul>
          </div>

          
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold">Legal</h6>
            <ul className="list-unstyled mt-3">
              <li><a href="/privacy" className="text-dark text-decoration-none">Privacy Policy</a></li>
              <li><a href="/terms" className="text-dark text-decoration-none">Terms & Condition</a></li>
              <li><a href="/refund" className="text-dark text-decoration-none">Refund Policy</a></li>
            </ul>
          </div>

          
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold">Contact</h6>
            <ul className="list-unstyled mt-3">
              <li>📞 9876543210</li>
              <li>✉️ support@udane.online</li>
              <li>📍 Wayanad, Kerala 673121</li>
            </ul>
          </div>
        </div>
      </div>
      <hr />

      <div className="text-center mt-4" style={{ fontSize: "13px", color: "#555" }}>
        © {new Date().getFullYear()}{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>Udane</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default CustomerFooter;
