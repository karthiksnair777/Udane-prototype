import React from "react";


function CustomerProdCategory() {
  const categories = [
    {
      id: 1,
      title: "Beverages",
      desc: "Cool yourself with chilled drinks",
      img: "https://sunshoweronline.com.au/wp-content/uploads/2024/09/c4ee15bc22fa3a63fce34fd4017026e4.jpg",
    },
    {
      id: 2,
      title: "Snacks",
      desc: "Tasty bites anytime",
      img: "https://5.imimg.com/data5/SELLER/Default/2023/3/ZX/JU/FJ/180799655/namkeen-snacks.jpg",
    },
    {
      id: 3,
      title: "Fruits",
      desc: "Fresh & healthy choices",
      img: "https://img.freepik.com/free-photo/healthy-fruits-veggies-arrangement_23-2151066889.jpg",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="row">
        {categories.map((cat) => (
          <div key={cat.id} className="col-lg-4 col-sm-6 mb-4">
            <div
              className="card shadow-lg"
              style={{
                backgroundImage: `url('${cat.img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "200px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                className="card-body text-white d-flex flex-column justify-content-end"
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                <h2 className="card-title">{cat.title}</h2>
                <p className="fw-bold">{cat.desc}</p>
                <button className="btn btn-light text-success btn-sm">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>  
  );
}

export default CustomerProdCategory;
