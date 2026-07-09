const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");
    this.loginBtn = page.getByRole("button", { type: "submit" });
    this.usernameRequired = page.locator(
      "//label[text()='Username']/ancestor::div[contains(@class,'oxd-input-group')]//span",
    );
    this.passwordRequired = page.locator(
      "//label[text()='Password']/ancestor::div[contains(@class,'oxd-input-group')]//span",
    );
    this.errorMsg = page.locator("//p[text()='Invalid credentials']");
    this.header = page.locator("//h5[text()='Login']");
  }
  async LoginToApplication(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
  async VerifyHeaderVisibility() {
    await expect(this.header).toBeVisible();
  }
  async VerifyBothFieldsRequired() {
    await expect(this.usernameRequired).toBeVisible();
    await expect(this.passwordRequired).toBeVisible();
  }
  async VerifyUsernameRequired() {
    await expect(this.usernameRequired).toBeVisible();
  }
  async VerifyPasswordRequired() {
    await expect(this.passwordRequired).toBeVisible();
  }
  async VerifyErrorMessage() {
    await expect(this.errorMsg).toBeVisible();
  }
}

module.exports = { LoginPage };
