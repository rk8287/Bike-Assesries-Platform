import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import { Heart, Star, Filter, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParam = new URLSearchParams(location.search).get("search") || "";
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const safeProducts = products || [];

  const brands = useMemo(
    () => Array.from(new Set(safeProducts.map((p) => p.brand))),
    [safeProducts]
  );

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState(new Set());
  const [search, setSearch] = useState(queryParam);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [sortBy, setSortBy] = useState("relevance");

  const toggleBrand = (brand) => {
    const s = new Set(selectedBrands);
    s.has(brand) ? s.delete(brand) : s.add(brand);
    setSelectedBrands(s);
  };

  const clearFilters = () => {
    setSelectedBrands(new Set());
    setSearch("");
    setMaxPrice(50000);
  };

  const filtered = useMemo(() => {
    let out = [...safeProducts];

    out = out.filter((p) => Number(p.price) <= Number(maxPrice));

    if (selectedBrands.size > 0) {
      out = out.filter((p) => selectedBrands.has(p.brand));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      out = out.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc") out.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") out.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") out.sort((a, b) => b.rating - a.rating);

    return out;
  }, [safeProducts, selectedBrands, search, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden sticky top-14 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Products ({filtered.length})
          </h2>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-black text-white rounded-md text-sm"
          >
            <Filter size={16} /> Filters
          </button>
        </div>
      </div>

      {/* MOBILE FILTER OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          mobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileFilterOpen(false)}
      ></div>

      {/* MOBILE FILTER DRAWER */}
      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white shadow-xl p-5 z-50 transform transition-transform duration-300 ${
          mobileFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Filters</h3>
          <button
            onClick={() => setMobileFilterOpen(false)}
            className="text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <FilterSection
          brands={brands}
          selectedBrands={selectedBrands}
          toggleBrand={toggleBrand}
          search={search}
          setSearch={setSearch}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearFilters={clearFilters}
        />
      </div>

      {/* MAIN PAGE */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-14">
        <div className="grid grid-cols-12 gap-6">
          {/* DESKTOP FILTERS */}
          <aside className="hidden md:block md:col-span-3">
            <div className="sticky top-24 bg-white rounded-xl shadow-md p-5 space-y-6">
              <FilterSection
                brands={brands}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                search={search}
                setSearch={setSearch}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sortBy={sortBy}
                setSortBy={setSortBy}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* PRODUCT LIST */}
          <section className="col-span-12 md:col-span-9">
            {loading ? (
              <div className="text-center py-20 text-gray-500 text-lg">
                Loading...
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                  {filtered.map((p) => {
                    const discount = Math.round(
                      ((p.mrp - p.price) / p.mrp) * 100
                    );

                    return (
                      <div
                        key={p._id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden relative"
                      >
                        {/* DISCOUNT TAG */}
                        {discount > 0 && (
                          <div className="absolute top-0 left-0 bg-yellow-400 px-3 py-1 text-xs font-bold rounded-br-xl z-10">
                            -{discount}%
                          </div>
                        )}

                        {/* IMAGE */}
                        <div
                          className="h-44 bg-gray-100"
                          onClick={() => navigate(`/product/${p._id}`)}
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-600">
                              {p.brand}
                            </span>
                            <Heart size={16} className="text-gray-400" />
                          </div>

                          <h3 className="text-sm font-medium mt-1 line-clamp-2">
                            {p.name}
                          </h3>

                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Star size={14} className="text-yellow-400" />
                            {p.rating || 4.2}
                          </div>

                          <div className="mt-2 flex gap-2 items-center">
                            <span className="font-bold text-lg">₹{p.price}</span>
                            <span className="line-through text-gray-400 text-sm">
                              ₹{p.mrp}
                            </span>
                          </div>

                          {/* ADD TO CART BUTTON */}
                          <button
                            onClick={() => dispatch(addToCart(p))}
                            className="w-full mt-3 py-2 bg-black text-white rounded-md hover:bg-yellow-400 hover:text-black transition text-sm"
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filtered.length === 0 && (
                  <p className="text-center text-gray-500 mt-10">
                    No products found
                  </p>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Products;

/* 🔥 FILTER SECTION COMPONENT */
function FilterSection({
  brands,
  selectedBrands,
  toggleBrand,
  search,
  setSearch,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  clearFilters,
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button onClick={clearFilters} className="text-sm text-gray-500">
          Clear
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4">
        <label className="text-xs text-gray-500">Search</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="mt-2 w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* BRANDS */}
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">Brands</h4>
        <div className="space-y-2 text-sm">
          {brands.map((b) => (
            <label key={b} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedBrands.has(b)}
                onChange={() => toggleBrand(b)}
                className="accent-yellow-400"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      {/* PRICE SLIDER */}
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">Max Price</h4>
        <input
          type="range"
          min="100"
          max="50000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full accent-yellow-400"
        />
        <div className="mt-1 text-sm font-bold">₹{maxPrice}</div>
      </div>

      {/* SORT */}
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm"
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </>
  );
}
