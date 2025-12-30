import { useEffect, startTransition } from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../features/modalSlice";

import { useNavbar } from "../NavBarContext";
import {
  removeItem,
  increase,
  decrease,
  calculateTotals,
} from "../features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);

  const { setIsOpen } = useNavbar();

  // ✅ Defer setIsOpen to avoid cross-component render issue
  useEffect(() => {
    startTransition(() => {
      setIsOpen(false);
    });
  }, [setIsOpen]);

  // Recalculate totals whenever cart items change
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  if (cartItems.length === 0) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-700 text-center text-5xl">
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-600">
                      ${(item.price * item.amount).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(decrease(item._id))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.amount}</span>
                  <button
                    onClick={() => dispatch(increase(item._id))}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => dispatch(removeItem(item._id))}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={() => dispatch(openModal())}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
