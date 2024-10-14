// test/service.test.js

const sinon = require("sinon");
const { expect } = require("chai");
const Service = require("../src/service");
const Repository = require("../src/repository");
const SecondaryRepository = require("../src/secondaryRepository");

describe("Service Integration Tests", () => {
  let service;
  let repositoryStub;
  let secondaryRepositoryStub;

  beforeEach(() => {
    repositoryStub = sinon.createStubInstance(Repository);
    secondaryRepositoryStub = sinon.createStubInstance(SecondaryRepository);
    service = new Service();
    service.primaryRepository = repositoryStub;
    service.secondaryRepository = secondaryRepositoryStub;
  });

  it("should return all items", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    repositoryStub.getAllItems.returns(items);

    const result = service.getAllItems();

    expect(result).to.equal(items);
    expect(repositoryStub.getAllItems.calledOnce).to.be.true;
  });

  it("should return an item by id", () => {
    const item = { id: 1, name: "Item 1" };
    repositoryStub.getItemById.withArgs(1).returns(item);

    const result = service.getItemById(1);

    expect(result).to.equal(item);
    expect(repositoryStub.getItemById.calledOnceWith(1)).to.be.true;
  });

  it("should throw an error when item is not found", () => {
    repositoryStub.getItemById.returns(null);
    secondaryRepositoryStub.getItemById.returns(null);

    expect(() => service.getItemById(3)).to.throw(
      "Item not found in both repositories"
    );
    expect(repositoryStub.getItemById.calledOnceWith(3)).to.be.true;
    expect(secondaryRepositoryStub.getItemById.calledOnceWith(3)).to.be.true;
  });

  it("should add a new item", () => {
    const newItem = { id: 3, name: "Item 3" };
    repositoryStub.data = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    repositoryStub.addItem.returns(newItem);

    const result = service.addItem("Item 3");

    expect(result).to.equal(newItem);
    expect(repositoryStub.addItem.calledOnceWith(newItem)).to.be.true;
  });

  // Tes baru untuk menghapus item berdasarkan ID
  it("should remove an item by id", () => {
    const itemToRemove = { id: 1, name: "Item 1" };
    repositoryStub.removeItem.withArgs(1).returns(itemToRemove);

    const result = service.primaryRepository.removeItem(1);

    expect(result).to.equal(itemToRemove);
    expect(repositoryStub.removeItem.calledOnceWith(1)).to.be.true;
  });

  it("should throw an error when removing a non-existent item", () => {
    repositoryStub.removeItem.withArgs(3).throws(new Error("Item not found"));

    expect(() => service.primaryRepository.removeItem(3)).to.throw(
      "Item not found"
    );
    expect(repositoryStub.removeItem.calledOnceWith(3)).to.be.true;
  });
});
