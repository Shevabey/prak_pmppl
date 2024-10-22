import { Builder, By, Key, until } from "selenium-webdriver";
import chai from "chai";
const { expect } = chai;

describe("UI testing using selenium", function () {
  this.timeout(10000); // set timeout for mocha test to 10 seconds

  let driver;

  // inisialisasi webDriver sebelum menjalankan test case
  before(async function () {
    driver = await new Builder().forBrowser("chrome").build(); // Bisa diganti 'firefox' jika menggunakan Firefox
  });

  // tutup webDriver setelah semua test selesai
  after(async function () {
    await driver.quit();
  });

  it("should load the login page", async function () {
    await driver.get("index.html"); // ubah path sesuai lokasi file login.html
    const title = await driver.getTitle();
    expect(title).to.equal("Login page");
  });

  it("should input username and password", async function () {
    await driver.findElement(By.id("username")).sendKeys("testuser");
    await driver.findElement(By.id("password")).sendKeys("password123");

    const usernameValue = await driver
      .findElement(By.id("username"))
      .getAttribute("value");
    const passwordValue = await driver
      .findElement(By.id("password"))
      .getAttribute("value");

    expect(usernameValue).to.equal("testuser");
    expect(passwordValue).to.equal("password123");
  });

  it("should click the login button", async function () {
    await driver.findElement(By.id("loginButton")).click();
    // Simulasikan login dengan validasi pesan error atau redirect ke halaman lain.
    // Misalnya memeriksa keberadaan pesan error jika login gagal
    const errorMessage = await driver
      .findElement(By.id("errorMessage"))
      .getText()
      .catch(() => null); // Tangkap jika elemen tidak ada

    expect(errorMessage).to.equal(null); // Asumsikan tidak ada error message untuk login yang valid
  });

  it("should fail login with incorrect credentials", async function () {
    await driver.get("file://path/to/your/login.html");
    await driver.findElement(By.id("username")).sendKeys("wronguser");
    await driver.findElement(By.id("password")).sendKeys("wrongpassword");
    await driver.findElement(By.id("loginButton")).click();

    // Validasi error message setelah login gagal
    const errorMessage = await driver
      .findElement(By.id("errorMessage"))
      .getText();

    expect(errorMessage).to.equal("Invalid username or password");
  });

  it("should validate visibility of elements", async function () {
    const loginButton = await driver.findElement(By.id("loginButton"));
    const isVisible = await loginButton.isDisplayed();
    expect(isVisible).to.be.true; // Validasi apakah tombol login terlihat
  });

  it("should input username and password using CSS Selector and XPath", async function () {
    await driver.findElement(By.css("#username")).sendKeys("testuser");
    await driver
      .findElement(By.xpath('//*[@id="password"]'))
      .sendKeys("password123");

    const usernameValue = await driver
      .findElement(By.css("#username"))
      .getAttribute("value");
    const passwordValue = await driver
      .findElement(By.xpath('//*[@id="password"]'))
      .getAttribute("value");

    expect(usernameValue).to.equal("testuser");
    expect(passwordValue).to.equal("password123");
  });
});
