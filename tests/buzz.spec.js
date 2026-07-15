const { test } = require("@playwright/test");
const { DashboardPage } = require("../pages/dashboardPage");
const { LoginPage } = require("../pages/loginPage");
const { BuzzPage } = require("../pages/buzzPage");
const loginTestData = require("../test-data/loginData.json");

let loginPage;
let dashboardPage;
let buzzPage;

test.beforeEach(
  "Navigate to OrangeHRM Buzz page from dashboard",
  async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    buzzPage = new BuzzPage(page);

    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await loginPage.loginToApplication(
      loginTestData.validUser.username,
      loginTestData.validUser.password,
    );
    await dashboardPage.clickBuzz();
  },
);

test.describe("Testing the functionality of the Buzz page", () => {
  test("should navigate to the Buzz page from the dashboard", async ({
    page,
  }) => {
    await buzzPage.verifyBuzzPageLoaded();
  });

  test("should create a new post successfully", async ({ page }) => {
    const postContent = `Playwright Test Post Content ${Date.now()}`;
    await buzzPage.createPost(postContent);
    await buzzPage.clickPostBtn();
    await buzzPage.verifyPost(postContent);
  });
});
