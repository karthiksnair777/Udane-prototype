import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerProdCategory.css";
import CustomerHeader from "./CustomerHeader";
import CustomerFooter from "./CustomerFooter";

function CustomerProdCategory() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: "Dairy, Bread & Eggs",
      img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSm0wcxTftxkpcJArlGLyxRi0P3dOtN1lpQMb6QIU6Y1HfgoUV2",
    },
    {
      id: 2,
      title: "Fruits & Vegetables",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSptK5r2Hz0a-7ydvcAu_xEXAxsvnbA2Wpal6SZFOypaqhkc_t_",
    },
    {
      id: 3,
      title: "Juice & Drinks",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT4cz1puo5ur-27GQevcAWXSiMak8Bww7eVyg0IS67QkDx69lTm",
    },
    {
      id: 4,
      title: "Chicken Meat & Fish",
      img: "https://png.pngtree.com/thumb_back/fh260/background/20220408/pngtree-chicken-fillet-skinless-spice-cooking-photo-image_4051671.jpg",
    },
    {
      id: 5,
      title: "Chocolates, Candies & Ice Creams",
      img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQHVHxzXzgoPd_vmPSMxyhBIpUcmQh8fC8KReAY81UE7_jda8gU",
    },
    {
      id: 6,
      title: "Bakery Biscuits",
      img: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRmnnf2NLoRb6lvWIxIFvfnXVwjlaFFxpO1PJejCXXj7LbH682N",
    },
    {
      id: 7,
      title: "Tea Coffee",
      img: "https://blinkme.online/uploads/category/thump_1735797079.webp",
    },
    {
      id: 8,
      title: "Instant Food",
      img: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT8GP_BL1Hdlq1N-UN0Yu5vlwfOvFJf3NY_jf6nxkIXR1HbqcP4",
    },
    {
      id: 9,
      title: "Masala Oil",
      img: "https://blinkme.online/uploads/category/thump_1735797447.webp",
    },
     {
      id: 9,
      title: "Cleaning Essentials",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQX2TjNaYeYHwor65CPA-X_D8MyIyhabGwlw2gGrkV_Ht7m4_G",
    },
     {
      id: 10,
      title: "Home Office",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr2zvJXyfdtt1za8oS53mKmWWLKEIuTb83GLuwAqRtYBsWUUSTSRaiHCNMbYV_oF6ai8U&usqp=CAU",
    },
    {
      id: 11,
      title: "Personal care",
      img: "https://www.byrdie.com/thmb/697uKc77djiTWVHg3uBavEMiQqs=/fit-in/1500x1000/filters:no_upscale():max_bytes(150000):strip_icc()/neutrogena-42b9325c21144096b7c9a5d159045a73.jpg",
    },
    {
      id: 12,
      title: "Pet Care",
      img: "https://static.theprint.in/wp-content/uploads/2024/03/ANI-20240304130827.jpg",
    },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/subcategory/${categoryName}`);
  };

  return (
    <>
    <CustomerHeader/>
    <div className="category-container">
      <h2 className="category-title">Category</h2>
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => handleCategoryClick(cat.title)}
          >
            <img src={cat.img} alt={cat.title} className="category-img" />
            <p className="category-name">{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
    <CustomerFooter/>
    </>
  );
}

export default CustomerProdCategory;
