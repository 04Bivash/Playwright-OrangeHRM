const { test } = require("@playwright/test");
const { DashboardPage } = require("../pages/dashboardPage");
const { LoginPage } = require("../pages/loginPage");
const testdata = require("../test-data/loginData.json");

let loginPage;
let dashboardPage;

test.beforeEach("Navigate to OrangeHRM Dashboard", async ({ page }) => {
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

test.describe("Testing dashboard features", () => {
  test("should display the dashboard after successful login", async ({
    page,
  }) => {
    await dashboardPage.verifyDashboardLoaded();
  });

  test("should load the widgets/cards on the dashboard page", async ({
    page,
  }) => {
    await dashboardPage.verifyWidgetsLoaded();
  });

  test("should render the sidebar items", async ({ page }) => {
    await dashboardPage.verifySidebarItems();
  });
});
