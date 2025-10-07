import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PopularProducts.css";

const PopularProducts = () => {
    const navigate = useNavigate();

    const products = [
        { img: "https://cdn1.foodviva.com/static-content/food-images/juice-recipes/strawberry-juice-recipe/strawberry-juice-recipe.jpg", name: "Fresh Strawberry Juice", price: "₹ 90" },
        { img: "https://img.freepik.com/free-photo/elevated-view-raw-vegetables-wooden-tray_23-2147870976.jpg", name: "Organic Vegetables Pack", price: "₹ 60" },
        { img: "https://luvflowercake.com/wp-content/uploads/2023/08/1-41.webp", name: "Dairy Milk Pack", price: "₹ 200" },
        { img: "https://img.freepik.com/free-photo/front-view-fresh-red-apples-dark-background-color-tree-mellow-ripe-vitamine-apple-pear-juice-food-diet_140725-158134.jpg?semt=ais_hybrid&w=740&q=80", name: "Fresh Apples", price: "₹ 120" },
        { img: "https://5.imimg.com/data5/SELLER/Default/2023/10/357378088/BC/JB/KD/33662479/1121-steam-basmati-rice-500x500.jpeg", name: "Steam Basmati Rice", price: "₹ 105/kg" },
        { img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyYWtEEDqzCz9g-dy5fQJ4gGmAGS1S-NOydw&s", name: "SunFlower Oil", price: "₹ 100" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    const handleProductClick = () => {
        navigate("/customer/CustomerPopularProducts"); 
    };

    return (
        <div className="popular-container mt-5">
            <h3 className="text-left mb-4" style={{ fontSize: '18px', color: "green" }}>
                Popular Products
            </h3>

            <Slider {...settings}>
                {products.map((product, index) => {
                    const shortName =
                        product.name.split(" ").slice(0, 2).join(" ") +
                        (product.name.split(" ").length > 2 ? "..." : "");

                    return (
                        <div key={index} className="px-2">
                            <div
                                className="card popular-card border-0 shadow-sm rounded-3"
                                onClick={handleProductClick}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="img-wrapper">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="w-100"
                                    />
                                </div>
                                <div className="card-body text-center p-2">
                                    <h6 className="text-dark">{shortName}</h6>
                                    <p className="text-success fw-bold">{product.price}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>

            <div className="text-center mt-5">
                <button
                    className="btn btn-success px-4 py-2 rounded-pill shadow-sm"
                    style={{ backgroundColor: "#2f855a" }}
                    onClick={() => navigate("/customer/CustomerPopularProducts")}
                >
                    View All
                </button>
            </div>
        </div>
    );
};

export default PopularProducts;
