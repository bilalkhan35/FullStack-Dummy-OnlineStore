import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useNavbar } from "../NavBarContext";

const Navbar = () => {
  const { isOpen, setIsOpen } = useNavbar();
  const { cartItems } = useSelector((store) => store.cart);

  return (
    <nav className="bg-yellow-300 shadow mb-4 p-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <NavLink to={"/"} className=" flex items-center gap-2 group">
          <span className=" animate-bounce inline-block bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-transparent bg-clip-text text-2xl md:text-3xl font-extrabold font-serif tracking-tight drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block align-middle mr-1 animate-spin-slow"
            >
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="url(#paint0_linear)"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M16 2 A14 14 0 0 1 30 16"
                stroke="url(#paint1_linear)"
                strokeWidth="4"
                fill="none"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="0"
                  y1="0"
                  x2="32"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FDE68A" />
                  <stop offset="1" stopColor="#F472B6" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="16"
                  y1="2"
                  x2="30"
                  y2="16"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F59E42" />
                  <stop offset="1" stopColor="#F472B6" />
                </linearGradient>
              </defs>
            </svg>
            MyStore
          </span>
        </NavLink>
        <button
          className="md:hidden block text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars className="cursor-pointer" />
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          } absolute top-12 left-0 w-full bg-yellow-300 md:static md:w-auto md:flex md:max-h-full md:opacity-100 space-x-4 md:space-x-4 md:items-center `}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold px-3 py-4 block"
                : "text-gray-700 hover:text-blue-600 transition px-3 py-4 block"
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold px-3 py-4 block"
                : "text-gray-700 hover:text-blue-600 transition px-3 py-4 block"
            }
            onClick={() => setIsOpen(false)}
          >
            Cart 🛒
            <span className=" bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold px-3 py-4 block"
                : "text-gray-700 hover:text-blue-600 transition px-3 py-4 block"
            }
          >
            💖 Wishlist
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
