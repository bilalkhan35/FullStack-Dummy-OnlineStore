import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/WishList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { fetchProduct, calculateTotals } from "./features/cartSlice";
import { useEffect } from "react";
import Product from "./pages/Product";
import Modal from "./components/Modal";
function App() {
  const { cartItems } = useSelector((state) => state.cart);
  const isOpen = useSelector((state) => state.modal?.isOpen);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  return (
    <Router>
      {isOpen && <Modal />}
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-6xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
