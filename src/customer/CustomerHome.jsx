import React from 'react';
import { Link } from 'react-router-dom';
import CustomerHeader from './CustomerHeader';

function Home() {
  return (
    <>
      <CustomerHeader />
      <div className="container">
        {/* Hero Section */}
        <div className="row">
          <div
            className="d-flex align-items-center w-100 rounded"
            style={{
              backgroundImage: `url('https://console.kr-asia.com/wp-content/uploads/2021/03/BB-scaled.jpeg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '300px',
            }}
          >
            <div className="ms-3">
              <h1 className="text-white text-start">Welcome to Udane</h1>
              <p className="text-white text-start">
                The complete grocery shopping experience
              </p>
              <Link to="/customer/products" className="btn btn-light text-success">
                Experience Here
              </Link>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="container mt-5">
          <div className="row justify-content-center text-center">
            {[
              {
                img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,w=200/layout-engine/2022-11/Slice-2_10.png',
                // label: 'Dairy',
              },
              {
                img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,w=200/layout-engine/2022-11/Slice-3_9.png',
                // label: 'Fruits',
              },
              {
                img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,w=200/layout-engine/2022-11/Slice-4_9.png',
                // label: 'Bread',
              },
              {
                img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-13.png',
                // label: 'Snacks',
              },
              {
                img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-7_3.png',
                // label: 'Vegetables',
              },
              {
                img: 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-12.png',
                // label: 'Household',
              },
            ].map((cat, index) => (
              <div key={index} className="col-lg-2 col-sm-4 col-6 mb-4">
                <div className="card shadow-sm h-100 border-0 rounded-3">
                  <img src={cat.img} className="card-img-top p-2" alt={cat.label} />
                  <div className="card-body text-center">
                    <h6 className="text-dark">{cat.label}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlighted Sections */}
        <div className="row mt-5 g-4">
          <div className="col-lg-6">
            <div
              className="card border-0 shadow-lg rounded-3"
              style={{
                backgroundImage: `url('https://sunshoweronline.com.au/wp-content/uploads/2024/09/c4ee15bc22fa3a63fce34fd4017026e4.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
              }}
            >
              <div className="card-body text-white mt-3 ms-2">
                <h2 className="card-title">Beverages</h2>
                <p className="card-text fw-bold">Cool yourself with chilled</p>
                <Link to="/products" className="btn btn-light text-success">
                  Order Now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div
              className="card border-0 shadow-lg rounded-3"
              style={{
                backgroundImage: `url('https://media.assettype.com/thequint%2F2022-04%2F9bb03208-8222-43e9-b17e-504fb7f76ccc%2FHealthy_food_shopping_grocery_list_india_diet_healthy_weight_loss_secret_tip.jpg?auto=format%2Ccompress&fmt=webp&width=720')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '250px',
              }}
            >
              <div className="card-body text-white mt-3 ms-2">
                <h2 className="card-title">HouseGoods</h2>
                <p className="card-text fw-bold">Grab what you need the most</p>
                <Link to="/products" className="btn btn-light text-success">
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="row">
          <div className="text-center mt-5">
            <h2>Our Mission</h2>
            <p className="text-success w-75 mx-auto">
              Our mission is to provide the best quality products to our customers at
              the most affordable prices. We believe in providing the best customer
              service and making sure that our customers are satisfied with their
              purchases.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="row mt-5">
          <h4 className="text-center mb-4">How it Works</h4>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {[
              {
                img: 'https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.59.0/images/pdp/place-order.svg',
                title: 'Open the app',
                text: 'Choose from over 7000 products across groceries, fresh fruits & veggies, meat.',
              },
              {
                img: 'https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.59.0/images/pdp/do-not-blink.svg',
                title: 'Place an order',
                text: 'Add your favourite items to the cart & avail the best offers',
              },
              {
                img: 'https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.59.0/images/pdp/enjoy.svg',
                title: 'Get free delivery',
                text: 'Experience lighting-fast speed & get all your items delivered in 10 minutes',
              },
            ].map((step, index) => (
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="card border-light shadow-lg text-center h-100 rounded-3">
                  <div className="card-body">
                    <img src={step.img} alt={step.title} className="mb-3" />
                    <h5 className="card-title">{step.title}</h5>
                    <p className="card-text text-muted">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
