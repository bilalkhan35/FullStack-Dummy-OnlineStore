import { useSelector } from "react-redux";

function SearchBox({
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
}) {
  const { categories } = useSelector((state) => state.cart);
  return (
    <>
      <input
        type="text"
        placeholder="Search products..."
        className="w-full md:w-1/2 border p-2 rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        className="border p-2 rounded w-full md:w-1/4"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories &&
          categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
      </select>
    </>
  );
}

export default SearchBox;
