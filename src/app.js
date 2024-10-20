import express from "express";
import itemsController from "../src/controller.js"; // Gunakan import alih-alih require

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// API Routes
app.get("/api/items", itemsController.getItems);
app.post("/api/items", itemsController.addItem);
app.delete("/api/items/:id", itemsController.deleteItem);
app.put("/api/items/:id", itemsController.updateItem);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});

export default app; // Gunakan export default
