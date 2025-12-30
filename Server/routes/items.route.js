import express from "express";
import * as item from "../controller/items.controller.js";

import upload from "../middlewares/upload.js";

const itemRoute = express.Router();

// itemRoute.route("/").get(item.getAllItems).post(item.addItem);
itemRoute
  .route("/")
  .get(item.getAllItems)

  .post(upload.single("image"), item.addItem);

// ✅ Separate route for categories
itemRoute.get("/categories", item.getCategories);

itemRoute
  .route("/:id")
  .get(item.getItem)
  .put(upload.single("image"), item.updateItem)
  .delete(item.deleteItem);
export default itemRoute;
