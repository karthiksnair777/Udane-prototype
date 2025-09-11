import React from 'react';
import { Link } from 'react-router-dom';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import CustomerHeader from './CustomerHeader'; 

function Home() {
  return (
    <>

        <CustomerHeader />
      <div className="container">
  <div className="row">
    <div 
      className="d-flex align-items-center w-100 rounded"
      style={{ 
        backgroundImage: `url('https://console.kr-asia.com/wp-content/uploads/2021/03/BB-scaled.jpeg')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        height: '300px' // Adjust height as needed
      }}
    >
      {/* Text wrapper to align content properly */}
      <div className="ms-3">
        <h1 className="text-white text-start">Welcome to Udane</h1>
        <p className="text-white text-start">The complete grocery shopping experience</p>
        <Link to="/customer/products" className="btn btn-light text-success">
  Experience Here
</Link>
      </div>
    </div>
  </div>
  {/* next */}
  <div className="row mt-5">
    <div className="col-lg-6">
      <div className="card"  style={{ 
      backgroundImage: `url('https://sunshoweronline.com.au/wp-content/uploads/2024/09/c4ee15bc22fa3a63fce34fd4017026e4.jpg')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      height: '100%' // Ensures full height coverage
    }}>
        <div className="card-body text-white mt-3 ms-2">
          <h2 className="card-title">Beverages</h2>
          <p className="card-text fw-bold">cool yourself with chilled</p>
          <Link to="/products" className="btn btn-light text-success">Oder Now</Link>
          </div>
        </div>
    </div>
    <div className="col-lg-6">
    <div className="card"  style={{ 
      backgroundImage: `url('https://media.assettype.com/thequint%2F2022-04%2F9bb03208-8222-43e9-b17e-504fb7f76ccc%2FHealthy_food_shopping_grocery_list_india_diet_healthy_weight_loss_secret_tip.jpg?auto=format%2Ccompress&fmt=webp&width=720')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      height: '100%' // Ensures full height coverage
    }}>
        <div className="card-body text-white mt-3 ms-2">
          <h2 className="card-title">HouseGoods</h2>
          <p className="card-text fw-bold">grab waht you need the most</p>
          <Link to="/products" className="btn btn-light text-success">Oder Now</Link>
          </div>
        </div>
    </div>
  </div>
  {/* next */}
  <div className='row'>
  <div className="text-center mt-5">
  <h2 className=''>Our Mission</h2>
  <p className="text-success w-75 mx-auto">
    Our mission is to provide the best quality products to our customers at the most affordable prices. 
    We believe in providing the best customer service and making sure that our customers are satisfied with their purchases.
  </p>
</div>
  </div>

  {/* next */}
 <div className='row'>
  <h4 className='text-center mt-5'>How it Works</h4>
  <div className='align-item-center d-flex gap-2 mt-5'><div className="col-lg-4">
  <div className="card border-light  shadow-lg">
  <div className="card-body">
    <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.59.0/images/pdp/place-order.svg" alt="" />
    <h5 className="card-title">Open the app</h5>
    <p className="card-text">Choose from over 7000 products across groceries, fresh fruits & veggies, meat.</p>
  </div>
</div>
  </div>
  <div className="col-lg-4 ">
  <div className="card border-light  shadow-lg"> 
  <div className="card-body">
    <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.59.0/images/pdp/do-not-blink.svg" alt="" />
    <h5 className="card-title">Place an order</h5>
    <p className="card-text">Add your favourite items to the cart & avail the best offers</p>
  </div>
</div>
  </div>
  <div className="col-lg-4">
  <div className="card border-light  shadow-lg">
  <div className="card-body">
    <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.59.0/images/pdp/enjoy.svg" alt="" />
    <h5 className="card-title">Get free delivery</h5>
    <p className="card-text">Experience lighting-fast speed & get all your items delivered in 10 minutes</p>
  </div>
</div>
  </div>
  </div>


 </div>



</div>


      


    </>
  );
}

export default Home;