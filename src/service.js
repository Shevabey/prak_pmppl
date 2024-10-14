// src/service.js

const Repository = require("./repository");
const SecondaryRepository = require("./secondaryRepository");

class Service {
  constructor() {
    this.primaryRepository = new Repository();
    this.secondaryRepository = new SecondaryRepository();
  }

  getAllItems() {
    return this.primaryRepository.getAllItems();
  }

  getItemById(id) {
    let item = this.primaryRepository.getItemById(id);
    if (!item) {
      item = this.secondaryRepository.getItemById(id);
    }
    if (!item) {
      throw new Error("Item not found in both repositories");
    }
    return item;
  }

  addItem(name) {
    const newItem = { id: this.primaryRepository.data.length + 1, name };
    return this.primaryRepository.addItem(newItem);
  }
}

module.exports = Service;
