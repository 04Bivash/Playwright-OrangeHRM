const { test, expect } = require("@playwright/test");
const testdata = require("../test-data/loginData.json");
const { LoginPage } = require("../pages/loginPage");

test.beforeEach("Navigate to OrangeHRM", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
});

test.describe("Testing login functionality of the application", () => {
  test("should login successfully with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication(
      testdata[0].username,
      testdata[0].password,
    );
  });

  test("should display an error message for an invalid password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication(
      testdata[1].username,
      testdata[1].password,
    );
    await loginPage.VerifyErrorMessage();
  });

  test("should display an error message for an invalid username", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication(
      testdata[2].username,
      testdata[2].password,
    );
    await loginPage.VerifyErrorMessage();
  });

  test("should display a validation message when username field is empty", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication(
      testdata[3].username,
      testdata[3].password,
    );
    await loginPage.VerifyUsernameRequired();
  });

  test("should display a validation message when password field is empty", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication(
      testdata[4].username,
      testdata[4].password,
    );
    await loginPage.VerifyPasswordRequired();
  });

  test("should display validation message when both fields are empty", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.LoginToApplication(
      testdata[5].username,
      testdata[5].password,
    );
    await loginPage.VerifyBothFieldsRequired();
  });
});
