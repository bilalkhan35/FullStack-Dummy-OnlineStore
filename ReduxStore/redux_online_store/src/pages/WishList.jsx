import { useWishlist } from "../WishlistContext";
import ProductCard from "../components/ProductCard";
import { addToCart } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Wishlist = () => {
  const dispatch = useDispatch();

  const { wishlist, removeFromWishlist } = useWishlist();

  const moveToCart = (product) => {
    dispatch(addToCart(product)); // ✅ properly dispatch action
    toast.success("Product moved to cart");
    removeFromWishlist(product._id); //vanishes from the wishlist after moving to cart
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="relative border p-4 rounded-lg shadow flex flex-col"
            >
              <ProductCard product={item} />

              <button
                onClick={() => moveToCart(item)}
                className="mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Move to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
