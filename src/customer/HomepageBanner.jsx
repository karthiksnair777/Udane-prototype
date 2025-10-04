import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomepageBanner() {
  // Advertisement cards data
  const ads = [
    {
      id: 1,
      backgroundImage: "https://i.pinimg.com/736x/d7/83/10/d78310dbad0cbd59242ebcdb23786fa4.jpg",
      //title: "Fresh Fruits Sale",
      //subtitle: "Up to 50% Off"
    },
    {
      id: 2,
      backgroundImage: "https://img.freepik.com/free-vector/grocery-store-sale-banner-template_23-2151089846.jpg",
      //title: "Weekly Grocery Deal",
      //subtitle: "Buy 2 Get 1 Free"
    },
    {
      id: 3,
      backgroundImage: "https://img.freepik.com/free-vector/hand-drawn-grocery-store-sale-banner_23-2151043935.jpg",
      //title: "Organic Vegetables",
      //subtitle: "Fresh from Farm"
    },
    {
      id: 4,
      backgroundImage: "https://img.freepik.com/premium-vector/vegetable-grocery-delivery-promotion-facebook-cover-web-banner-social-media-post-template_584651-68.jpg",
      //title: "Dairy Products",
      //subtitle: "Special Discounts"
    }
  ];

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container mt-3">
      {/* Advertisement Cards Carousel */}
      <div className="mb-4">
        <Slider {...carouselSettings}>
          {ads.map((ad) => (
            <div key={ad.id} className="px-2">
              <div
                className="p-3 rounded-4 text-center position-relative"
                style={{
                  backgroundImage: `url('${ad.backgroundImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                }}
              >
                <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4" 
                  style={{
                    background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3))"
                  }}></div>
                <div className="position-relative z-1">
                  <h4 className="fw-bold">{ad.title}</h4>
                  <p className="mb-0 fs-5">{ad.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default HomepageBanner;