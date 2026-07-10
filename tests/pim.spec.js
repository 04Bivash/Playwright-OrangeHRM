const { test } = require("@playwright/test");
const { DashboardPage } = require("../pages/dashboardPage");
const { LoginPage } = require("../pages/loginPage");
const { PimPage } = require("../pages/pimPage");
const testdata = require("../test-data/loginData.json");

let loginPage;
let dashboardPage;
let pimPage;

test.beforeEach(
  "Navigate to OrangeHRM PIM page from dashboard",
  async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    pimPage = new PimPage(page);

    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await loginPage.loginToApplication(
      testdata.validUser.username,
      testdata.validUser.password,
    );
    await dashboardPage.clickPim();
  },
);

test.describe("Testing the functionality of the PIM page", () => {
  test("should navigate to the PIM page from the dashboard", async ({
    page,
  }) => {
    await pimPage.verifyPimPageLoaded();
  });
});
