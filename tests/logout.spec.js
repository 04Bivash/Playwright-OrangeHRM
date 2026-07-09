const { test, expect } = require("@playwright/test");
const testdata = require("../test-data/loginData.json");
const { LoginPage } = require("../pages/loginPage");
const { HomePage } = require("../pages/homePage");

test("Testing logout functionality of the application", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  await loginPage.LoginToApplication(
    testdata[0].username,
    testdata[0].password,
  );
  await homePage.LogoutFromApplication();
  await loginPage.VerifyHeaderVisibility();
});
