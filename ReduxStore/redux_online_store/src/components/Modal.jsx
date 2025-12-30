import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { closeModal } from "../features/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();

  return (
    <aside className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
          Remove all items from your shopping cart?
        </h4>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-lg font-medium transition"
            onClick={() => {
              dispatch(closeModal());
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
