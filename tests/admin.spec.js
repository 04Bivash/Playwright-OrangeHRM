const { test } = require("@playwright/test");
const { DashboardPage } = require("../pages/dashboardPage");
const { LoginPage } = require("../pages/loginPage");
const { AdminPage } = require("../pages/adminPage");
const testdata = require("../test-data/loginData.json");

let loginPage;
let dashboardPage;
let adminPage;

test.beforeEach(
  "Navigate to OrangeHRM Admin page from dashboard",
  async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    adminPage = new AdminPage(page);

    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await loginPage.loginToApplication(
      testdata.validUser.username,
      testdata.validUser.password,
    );
    await dashboardPage.clickAdmin();
  },
);

test.describe("Testing the functionality of the admin page", () => {
  test("should navigate to the admin page from the dashboard", async ({
    page,
  }) => {
    await adminPage.verifyAdminPageLoaded();
  });
});
