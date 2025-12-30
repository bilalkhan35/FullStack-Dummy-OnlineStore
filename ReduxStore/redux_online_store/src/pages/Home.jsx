import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../features/cartSlice";
import ProductCard from "../components/ProductCard";
import SearchBox from "../components/SearchBox";
import Footer from "../components/Footer";

function Home() {
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.cart);

  useEffect(() => {
    console.log("Products from Redux:", products);

    dispatch(fetchProduct());
  }, [dispatch]);

  useEffect(() => {
    let filteredData = products || [];

    if (selectedCategory !== "all") {
      filteredData = filteredData.filter(
        (product) =>
          product?.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      filteredData = filteredData.filter((product) =>
        product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFiltered(filteredData);
  }, [searchQuery, selectedCategory, products]);

  return (
    <div className="container mx-auto p-6 bg-purple-300 rounded-lg">
      <h1 className="text-3xl text-center font-bold mb-4">Browse Products</h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      {/* Product Grid */}
      {isLoading ? (
        <p className="text-center">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((product, index) => {
              return (
                <ProductCard
                  key={product?._id || index}
                  product={product}
                  searchTerm={searchQuery}
                />
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Home;
