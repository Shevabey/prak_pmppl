import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js"; // Gunakan import alih-alih require

describe("Items API", () => {
  it("should get all items", async () => {
    const res = await request(app).get("/api/items");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should add a new item", async () => {
    const res = await request(app).post("/api/items").send({ name: "Item 1" });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("id");
    expect(res.body.name).to.equal("Item 1");
  });

  it("should delete an item", async () => {
    // Menambahkan item terlebih dahulu
    const resPost = await request(app)
      .post("/api/items")
      .send({ name: "Item to delete" });

    const resDelete = await request(app).delete(
      `/api/items/${resPost.body.id}`
    );
    expect(resDelete.status).to.equal(200);
    expect(resDelete.body.message).to.equal("Item dihapus");
  });

  it("should update an item", async () => {
    // Menambahkan item terlebih dahulu
    const resPost = await request(app)
      .post("/api/items")
      .send({ name: "Old Item" });

    const resUpdate = await request(app)
      .put(`/api/items/${resPost.body.id}`)
      .send({ name: "Updated Item" });

    expect(resUpdate.status).to.equal(200);
    expect(resUpdate.body.name).to.equal("Updated Item");
  });
});
