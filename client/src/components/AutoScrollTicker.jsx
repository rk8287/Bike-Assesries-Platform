import royal from "../assets/royal.png";
import ktm from "../assets/ktm.png";
import bajaj from "../assets/bajaj.png";
import yamaha from "../assets/yahama.png";
import honda from "../assets/honda.png";
import tvs from "../assets/tvs.jpg";

function AutoScrollTicker() {
  const brands = [
    { id: 1, img: royal, name: "Royal Enfield" },
    { id: 2, img: ktm, name: "KTM" },
    { id: 3, img: bajaj, name: "Bajaj" },
    { id: 4, img: yamaha, name: "Yamaha" },
    { id: 5, img: honda, name: "Honda" },
    { id: 6, img: tvs, name: "TVS" },
  ];

  return (
    <div className="mt-16 py-10 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8">
        Your Favorite Bike Brands{" "}
        <span className="text-yellow-400">Coming Soon!</span>
      </h2>

      <div className="px-4">
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
          {brands.concat(brands).map((brand, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 backdrop-blur-md hover:scale-110 transition-transform duration-500 cursor-pointer"
            >
              <img
                src={brand.img}
                alt={brand.name}
                className="w-30 h-30 object-contain"
              />
              <span className="mt-2 text-white text-sm font-medium">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            gap: 3rem;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default AutoScrollTicker;
