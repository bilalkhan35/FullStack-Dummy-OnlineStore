import Item from "../models/items.model.js";
import cloudinary from "../confiq/cloudinary.js";
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    if (items.length > 0) {
      return res.json(items); // ✅ just the array
    }
    return res.json([]); // ✅ empty array if none
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
// GET /items/categories
// controllers/items.controller.js
export const getCategories = async (req, res) => {
  try {
    const categories = await Item.distinct("category"); // ✅ unique categories
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
      return res.json({ error: `No item Found! with this id: ${id}` });
    }
    return res.json({ item });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export const addItem = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "Image is required" });
    }

    const { title, price } = req.body;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "items",
    });

    // ✅ Check if item with same image already exists
    const existingItem = await Item.findOne({ image: result.secure_url });
    if (existingItem) {
      return res.status(400).json({
        success: false,
        error: "This product image already exists in the store",
      });
    }

    // ✅ Or check by title if you want uniqueness by name
    // const existingItem = await Item.findOne({ title });
    // if (existingItem) { ... }

    const newItem = await Item.create({
      title,
      price: Number(price),
      image: result.secure_url,
    });

    return res.json({
      success: true,
      message: "Product added successfully",
      item: newItem,
    });
  } catch (err) {
    console.error("❌ AddItem error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
export const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    // If image uploaded, send to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "items",
      });
      body.image = result.secure_url; // ✅ Cloudinary URL
    }

    // Cast numeric fields
    if (body.price) body.price = Number(body.price);
    if (body.stock) body.stock = Number(body.stock);

    const updatedItem = await Item.findByIdAndUpdate(id, body, { new: true });
    if (!updatedItem) {
      return res.json({
        success: false,
        error: `No item Found! with this id: ${id} for update`,
      });
    }

    return res.json({
      success: true,
      message: "Item updated successfully!",
      updatedItem,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /items/:id
export const deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.json({
        error: `No item Found! with this id: ${id} for deletion`,
      });
    }
    return res.json({ message: "Item deleted successfully!", deletedItem });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
