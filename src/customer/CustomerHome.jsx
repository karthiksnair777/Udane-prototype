import React from 'react';
import { Link } from 'react-router-dom';
import CustomerHeader from './CustomerHeader';
import { useState } from 'react';
import HomepageBanner from "./HomepageBanner";
import PopularProducts from './PopularProducts';
import CustomerFooter from './CustomerFooter';
import { useNavigate } from 'react-router-dom';
import PersonalCareProducts from './PersonalCareProducts';
import ChocolatesProducts from './ChocolatesProducts';
import ReadyInTwoMinProducts from './ReadyInTwoMinProducts';
 

function Home() {

  const [loading, setLoading] = useState(false);

 const navigate = useNavigate();  // import from react-router-dom

const handleViewMore = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    navigate("/customer/categories"); // 👈 redirect after loading
  }, 2000);
};


  return (
    <>
    <div className='body'>
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
        <HomepageBanner/>

       {/* Categories */}
<div className="container mt-5">
  <div className="row justify-content-center text-center">
    {[
      {
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSm0wcxTftxkpcJArlGLyxRi0P3dOtN1lpQMb6QIU6Y1HfgoUV2',
        label: 'Dairy & Bread',
      },
      {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSptK5r2Hz0a-7ydvcAu_xEXAxsvnbA2Wpal6SZFOypaqhkc_t_',
        label: 'Fruits',
      },
      {
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT4cz1puo5ur-27GQevcAWXSiMak8Bww7eVyg0IS67QkDx69lTm',
        label: 'Juices & Soft Drinks',
      },
      {
        img: 'https://png.pngtree.com/thumb_back/fh260/background/20220408/pngtree-chicken-fillet-skinless-spice-cooking-photo-image_4051671.jpg',
        label: 'Chicken, Meat & Fish',
      },
      {
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQHVHxzXzgoPd_vmPSMxyhBIpUcmQh8fC8KReAY81UE7_jda8gU',
        label: 'Chocolates, Candies & Ice Creams',
      },
      {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1yyrBVoM8Vdm_663WVXuJ4QStNnCogI7LVN1BUTXekEQx9nyn',
        label: 'Sauces & Spreads',
      },
      {
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRmnnf2NLoRb6lvWIxIFvfnXVwjlaFFxpO1PJejCXXj7LbH682N',
        label: 'Bakery Biscuits',
      },
      {
        img: 'https://blinkme.online/uploads/category/thump_1735797079.webp',
        label: 'Tea Coffee',
      },
      {
        img: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8GP_BL1Hdlq1N-UN0Yu5vlwfOvFJf3NY_jf6nxkIXR1HbqcP4',
        label: 'Instant Food',
      },
      {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9KFGMIDIn2OYw342IuMs7o77TOC4wc_f5gxnU5LAlSL90F2rnC_LEm7OT&s',
        label: 'Masala',
      },
      {
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcToZqYuZV1FVtqwMW2wMZxF8UM7jpb0-S3MiRN4GlFFvm388ARq',
        label: 'Oil',
      },
      {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQX2TjNaYeYHwor65CPA-X_D8MyIyhabGwlw2gGrkV_Ht7m4_G',
        label: 'Cleaning Essentials',
      },
   ].map((cat, index) => (
      <div key={index} className="col-lg-2 col-sm-4 col-6 mb-4">
        <div
          className="card shadow-sm h-100 border-0 rounded-3"
          style={{
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
          }}
        >
          <div
            style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px',}}>
            <img src={cat.img} alt={cat.label}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', }} />
          </div>
          <div className="card-body text-center">
            <h6 className="text-dark">{cat.label}</h6>
          </div>
        </div>
      </div>
    ))}
  </div>
  <div className="text-center mt-4">
  <button
    className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
    style={{ backgroundColor: "#43a047", border: "none", color: "white" }}
    disabled={loading}
    onClick={handleViewMore}
  >
    {loading ? "Udane..." : "View More"}
  </button>
</div>

</div>

  {/* Banner */}
      <div className="d-flex align-items-center justify-content-between p-4 rounded-4 mb-4 mt-4"
        style={{
          background: "linear-gradient(90deg, #215423ff, #a8e9acff)",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
          border: "2px solid #a8e9acff",
        }}
      >
        {/* Left Side Text */}
        <div>
          <h2 className="fw-bold">Your trusted grocery shop, now online.</h2>
          <p className="mb-3">
            Shop fresh vegetables, fruits & daily essentials with ease.
          </p>
          <button
            className="btn  px-4 py-2 rounded-pill fw-bold"
            style={{ color: "#2f855a",backgroundColor:'white' }}
          >
            Shop Now
          </button>
        </div>

        {/* Right Side Image */}
        <div>
          <img
            src="https://cdn.pixabay.com/photo/2022/08/01/09/12/fruits-7357732_1280.png"
            alt="Grocery Banner"
            style={{ maxHeight: "220px", borderRadius: "12px", paddingRight: '50px' }}
          />
        </div>
      </div>


<PopularProducts/>

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

        <PersonalCareProducts/>
        <ChocolatesProducts/>
        <ReadyInTwoMinProducts/>

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
      <CustomerFooter/>
      </div>
    </>
  );
}

export default Home;
