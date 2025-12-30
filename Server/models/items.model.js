import { Schema, model } from "mongoose";

const itemSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    brand: { type: String },
    subTitle: { type: String },
    category: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // ✅ single image field
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 },
    onSale: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Item = model("Item", itemSchema); // ✅ capitalized model name
export default Item;
