import { Link } from "react-router-dom";
import { useWishlist } from "../WishlistContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const ProductCard = ({ product, searchTerm }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  if (!product) return null; // safety check
  const {
    title,
    price,
    image,
    rating = 0,
    numberOfReviews = 0,
    onSale = false,
    discount = 0,
    category,
  } = product;
  const dispatch = useDispatch();
  const handleAddToCart = () => dispatch(addToCart(product));

  // const isInCart = cartItems.some((item) => item.id === product.id);
  // If searchTerm is provided, filter out cards that don't match
  if (
    searchTerm &&
    !product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !(
      product.description &&
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) {
    return null;
  }

  // Helper: render 5-star UI rounded to nearest half-star
  const renderStars = (rating) => {
    const rounded = Math.round((rating || 0) * 2) / 2; // nearest 0.5

    const FullStar = ({ keyProp }) => (
      <svg
        key={keyProp}
        className="w-4 h-4 text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.538 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.783.57-1.838-.197-1.538-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    );

    const HalfStar = ({ keyProp }) => (
      <svg
        key={keyProp}
        className="w-4 h-4 text-yellow-400"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="half-grad">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-grad)"
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.538 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.783.57-1.838-.197-1.538-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.049 2.927z"
        />
      </svg>
    );

    const EmptyStar = ({ keyProp }) => (
      <svg
        key={keyProp}
        className="w-4 h-4 text-gray-300"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.538 1.118l-3.39-2.462a1 1 0 00-1.176 0l-3.39 2.462c-.783.57-1.838-.197-1.538-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.047 9.4c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    );

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rounded >= i) stars.push(<FullStar keyProp={i} key={i} />);
      else if (rounded + 0.5 >= i) stars.push(<HalfStar keyProp={i} key={i} />);
      else stars.push(<EmptyStar keyProp={i} key={i} />);
    }
    return <>{stars}</>;
  };

  const toggleWishlist = () => {
    isInWishlist(product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product);
  };

  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {/* Sale badge */}
      {onSale && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {discount ? `Sale ${discount}% Off` : `Sale`}
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={toggleWishlist}
        aria-label={
          isInWishlist(product._id) ? "Remove from wishlist" : "Add to wishlist"
        }
        className={`absolute top-3 right-3 p-1 rounded-full bg-white/80 backdrop-blur-sm border cursor-pointer ${
          isInWishlist(product._id) ? "text-red-500" : "text-gray-400"
        }`}
      >
        ♥
      </button>

      {/* Image */}
      <div className="w-full h-44 flex items-center justify-center bg-gray-50 p-4">
        <img src={image} alt={title} className="max-h-full object-contain" />
      </div>

      {/* Body */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-md font-semibold text-gray-800 mb-1 truncate">
          {title}
        </h3>

        <div
          className="flex items-center gap-2 mt-1"
          title={`Rating: ${rating.toFixed(2)}`}
        >
          <div
            className="flex items-center bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded text-sm"
            aria-hidden="true"
          >
            <div className="flex items-center mr-2">{renderStars(rating)}</div>
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
          <span className="text-sm text-gray-500">({numberOfReviews})</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            {onSale ? (
              <>
                <div className="text-sm text-gray-400 line-through">
                  ${price.toFixed(2)}
                </div>
                <div className="text-lg font-bold text-red-600">
                  ${(price * (1 - discount / 100)).toFixed(2)}
                </div>
              </>
            ) : (
              <div className="text-lg font-bold text-gray-900">
                ${price.toFixed(2)}
              </div>
            )}
            {category && (
              <div className="text-xs text-gray-500 mt-1">{category}</div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <Link
              to={`/product/${product._id}`}
              className="text-xs text-blue-600 hover:underline"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
