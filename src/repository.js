// src/repository.js

class Repository {
  constructor() {
    this.data = []; // Simpan data di dalam array
  }

  getAllItems() {
    return this.data;
  }

  getItemById(id) {
    return this.data.find((item) => item.id === id) || null;
  }

  addItem(item) {
    this.data.push(item);
    return item;
  }

  // Metode baru untuk menghapus item berdasarkan ID
  removeItem(id) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      return this.data.splice(index, 1)[0]; // Kembalikan item yang dihapus
    }
    throw new Error("Item not found");
  }
}

module.exports = Repository;
