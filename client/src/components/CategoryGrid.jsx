import React from "react";

const CATEGORIES = [
  {
    id: 1,
    title: "Helmets",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2021/06/royal-enfield-accessories-dug-dug-motorcycles.jpg",
  },
  {
    id: 2,
    title: "Riding Gloves",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2021/06/bajaj-accessories-dug-dug-motorcycles-1.jpg",
  },
  {
    id: 3,
    title: "Bike Lights",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2021/06/yamaha-accessories-dug-dug-motorcycles-1.jpg",
  },
  {
    id: 4,
    title: "Crash Guards",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2021/06/ktm-accessories-dug-dug-motorcycles.jpg",
  },
  {
    id: 5,
    title: "Exhausts",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2021/06/honda-accessories-dug-dug-motorcycles-1.jpg",
  },
  {
    id: 6,
    title: "Lubricants",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2021/06/tvs-accessories-dug-dug-motorcycles-1.jpg",
  },
  {
    id: 7,
    title: "Bags & Luggage",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2021/06/Jawa-accessories-dug-dug-motorcycles.jpg",
  },
  {
    id: 8,
    title: "Radiator Grills",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2021/06/bajaj-accessories-dug-dug-motorcycles-1.jpg",
  },
];

function CategoryGrid() {
  return (
    <section className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-3xl md:text-4xl font-extrabold tracking-[2px]
                   text-black uppercase"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Shop By{" "}
                <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 bg-clip-text text-transparent">
                  Brands
                </span>
              </h2>

              <div className="mt-3 w-28 h-[3px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse" />
            </div>

            <a
              href="#"
              className="text-sm text-white/70 hover:text-yellow-400 transition font-medium tracking-wide"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              View all →
            </a>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {CATEGORIES.map((c) => (
            <div
              key={c.id}
              className="group relative p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 
              transition-all transform hover:scale-[1.04] hover:bg-white/10"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-40 object-contain rounded-xl group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
