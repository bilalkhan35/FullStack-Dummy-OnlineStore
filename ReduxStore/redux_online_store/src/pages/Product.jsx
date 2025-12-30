import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  addToCart,
  removeFromCart,
  fetchProductById,
} from "../features/cartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    singleProduct: product,
    isProductLoading,
    cartItems,
  } = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);
  const isInCart = cartItems.some((item) => item._id === product?._id);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      if (isInCart) {
        dispatch(removeFromCart(product._id));
        toast.success("Removed from cart");
      } else {
        dispatch(addToCart(product));
        toast.success("Added to cart");
      }
      setLoading(false);
    }, 300); // Simulate loading effect
  };

  if (isProductLoading || !product) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="relative flex h-16 w-16">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-16 w-16 bg-gradient-to-tr from-blue-400 via-pink-400 to-yellow-300"></span>
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-white animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-gray-700 mt-2">${product.price}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <button
            onClick={handleClick}
            className={`mt-6 w-full ${
              isInCart ? "bg-red-600" : "bg-blue-600"
            } text-white py-2 rounded-lg hover:opacity-90 transition duration-300 flex items-center justify-center`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            {loading
              ? "Processing..."
              : isInCart
              ? "Remove from Cart"
              : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
