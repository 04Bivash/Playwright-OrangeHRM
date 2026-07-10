const { test, expect } = require("@playwright/test");
const testdata = require("../test-data/loginData.json");
const { LoginPage } = require("../pages/loginPage");
const { DashboardPage } = require("../pages/dashboardPage");

let loginPage;
let dashboardPage;

test.beforeEach("Navigate to Orange HRM", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  await loginPage.loginToApplication(
    testdata.validUser.username,
    testdata.validUser.password,
  );
});
test("Testing logout functionality of the application", async ({ page }) => {
  await dashboardPage.logoutFromApplication();
  await loginPage.verifyHeaderVisibility();
});
