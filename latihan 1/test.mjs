import { expect } from "chai";
import { tambah, kali, kurang, bagi } from "./math.mjs";

describe("Pengujian Fungsi Matematika (Negative Case)", function () {
  // Negative case untuk fungsi kurang
  it("seharusnya mengembalikan -5 saat mengurangkan 0 - 5", function () {
    expect(kurang(0, 5)).to.equal(-5);
  });

  it("seharusnya mengembalikan -7 saat mengurangkan -2 - 5", function () {
    expect(kurang(-2, 5)).to.equal(-7);
  });

  // Negative case untuk fungsi bagi
  it("seharusnya melempar error saat membagi 0 dengan 0", function () {
    expect(() => bagi(0, 0)).to.throw("Tidak bisa membagi dengan nol");
  });

  it("seharusnya mengembalikan 0 saat membagi 0 dengan angka positif", function () {
    expect(bagi(0, 5)).to.equal(0);
  });
});
