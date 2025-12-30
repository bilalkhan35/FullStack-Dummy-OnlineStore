import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apis } from "../configuration/apis";

const initialState = {
  cartItems: [],
  products: [],
  categories: [],
  amount: 4,
  total: 0,
  isLoading: true,
  singleProduct: null,
  isProductLoading: false,
};

// Fetch all products and categories
// export const fetchProduct = createAsyncThunk(
//   "cart/fetchProduct",
//   async (_, thunkAPI) => {
//     try {
//       const [products, categories] = await axios.all([
//         axios.get(`${apis.items}/items`),
//         axios.get("https://fakestoreapi.com/products/categories"),
//       ]);
//       return { products: products.data, categories: categories.data };
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Failed to fetch product", error);
//     }
//   }
// );

export const fetchProduct = createAsyncThunk(
  "cart/fetchProduct",
  async (_, thunkAPI) => {
    try {
      const [productsRes, categoriesRes] = await axios.all([
        axios.get(`${apis.items}`), // GET /items
        axios.get(`${apis.items}/categories`), // GET /items/categories
      ]);

      return {
        products: productsRes.data, // array of products
        categories: categoriesRes.data.categories, // array of categories
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Failed to fetch product");
    }
  }
);

// Fetch single product by ID
export const fetchProductById = createAsyncThunk(
  "cart/fetchProductById",
  async (_id, thunkAPI) => {
    try {
      const res = await axios.get(`${apis.items}/${_id}`);
      return res.data;
    } catch (error) {
      console.error("Fetch product by ID error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch product by ID");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item._id === product._id);
      if (existing) {
        existing.amount += 1;
      } else {
        state.cartItems.push({ ...product, amount: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== productId
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload
      );
      if (cartItem) cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload
      );
      if (cartItem) {
        // decrement amount; if it reaches zero, remove the item from the cart
        cartItem.amount -= 1;
        if (cartItem.amount <= 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== action.payload
          );
        }
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    // Handle all products
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.products = action.payload; // ✅ now products will populate
        state.products = action.payload.products;
        state.categories = action.payload.categories;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Product fetch failed:", action.payload);
      });

    // Handle single product
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isProductLoading = true;
        state.singleProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.singleProduct = action.payload.item;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isProductLoading = false;
        state.singleProduct = null;
        console.error("Single product fetch failed:", action.payload);
      });
  },
});

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  addToCart,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
