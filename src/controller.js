let items = [];

// Mendapatkan semua item
const getItems = (req, res) => {
  res.status(200).json(items);
};

// Menambah item baru
const addItem = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Nama item diperlukan" });
  }
  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
};

// Menghapus item
const deleteItem = (req, res) => {
  const { id } = req.params;
  const itemIndex = items.findIndex((item) => item.id === parseInt(id));

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item tidak ditemukan" });
  }

  items.splice(itemIndex, 1);
  res.status(200).json({ message: "Item dihapus" });
};

// Memperbarui item
const updateItem = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return res.status(404).json({ message: "Item tidak ditemukan" });
  }

  item.name = name || item.name;
  res.status(200).json(item);
};

// Ekspor sebagai default
export default { getItems, addItem, deleteItem, updateItem };
