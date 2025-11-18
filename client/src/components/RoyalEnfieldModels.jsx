import React from "react";
import { Link } from "react-router-dom";

const bikes = [
  {
    id: 1,
    name: "SHOTGUN 650",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-shotgun-650-dug-dug-300x196.png",
    link: "/shotgun-650",
  },
  {
    id: 2,
    name: "SUPER METEOR 650",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-super-meteor-650-dug-dug-300x168.png",
    link: "/super-meteor-650",
  },
  {
    id: 3,
    name: "CONTINENTAL GT 650",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-continental-GT-650-dug-dug-300x168.png",
    link: "/continental-gt-650",
  },
  {
    id: 4,
    name: "INTERCEPTOR 650",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-interceptor-650-dug-dug-300x186.png",
    link: "/interceptor-650",
  },
  {
    id: 5,
    name: "HIMALAYAN 450",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-himalayan-450-dug-dug-300x183.png",
    link: "/himalayan-450",
  },
  {
    id: 6,
    name: "Reborn-350",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-classic-reborn-350-dug-dug-300x184.png",
    link: "/reborn-350",
  },
  {
    id: 7,
    name: "METEOR 350",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-meteor-350-dug-dug-300x175.png",
    link: "/meteor-350",
  },
  {
    id: 8,
    name: "HUNTER 350",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-hunter-350-dug-dug-300x172.png",
    link: "/hunter-350",
  },
  {
    id: 9,
    name: "NEW BULLET 350",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-bullet-350-dug-dug-300x186.png",
    link: "/new-bullet-350",
  },
  {
    id: 10,
    name: "HIMALAYAN SCRAM 411",
    img: "https://www.dugdugmotorcycles.com/wp-content/uploads/2024/02/royal-enfield-himalayan-scram-411cc-dug-dug-300x179.png",
    link: "/himalayan-scram-411",
  },
];

function RoyalEnfieldModels() {
  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <h2 className="text-center text-3xl font-bold tracking-wide text-gray-800 mb-10">
          ROYAL ENFIELD
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {bikes.map((bike) => (
            <Link key={bike.id} to={bike.link}>
              <div className="flex flex-col items-center group">
                {/* Image */}
                <div className="w-full h-36 sm:h-40 flex justify-center items-center overflow-hidden">
                  <img
                    src={bike.img}
                    alt={bike.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Title */}
                <div className="mt-3 text-center">
                  <p className="text-sm sm:text-base font-semibold text-gray-900 tracking-wide">
                    {bike.name}
                  </p>

                  {/* underline */}
                  <span className="block mx-auto mt-2 w-10 border-b border-gray-300"></span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RoyalEnfieldModels;
