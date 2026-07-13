const { test } = require("@playwright/test");
const loginTestData = require("../test-data/loginData.json");
const { LoginPage } = require("../pages/loginPage");

test.beforeEach("Navigate to OrangeHRM", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
});

test.describe("Testing login functionality of the application", () => {
  test("should login successfully with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(
      loginTestData.validUser.username,
      loginTestData.validUser.password,
    );
  });

  test("should display an error message for an invalid password", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(
      loginTestData.invalidPassword.username,
      loginTestData.invalidPassword.password,
    );
    await loginPage.verifyErrorMessage();
  });

  test("should display an error message for an invalid username", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(
      loginTestData.invalidUsername.username,
      loginTestData.invalidUsername.password,
    );
    await loginPage.verifyErrorMessage();
  });

  test("should display a validation message when username field is empty", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(
      loginTestData.missingUsername.username,
      loginTestData.missingUsername.password,
    );
    await loginPage.verifyUsernameRequired();
  });

  test("should display a validation message when password field is empty", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(
      loginTestData.missingPassword.username,
      loginTestData.missingPassword.password,
    );
    await loginPage.verifyPasswordRequired();
  });

  test("should display validation message when both fields are empty", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginToApplication(
      loginTestData.missingBothFields.username,
      loginTestData.missingBothFields.password,
    );
    await loginPage.verifyBothFieldsRequired();
  });
});
