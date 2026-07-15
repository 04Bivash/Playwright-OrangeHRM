const { expect } = require("@playwright/test");

class AdminPage {
  constructor(page) {
    this.page = page;
    this.adminHeading = page.getByRole("heading", { name: "Admin" });
    this.addBtn = page.getByRole("button", { name: "Add" });
    this.searchBtn = page.getByRole("button", { name: "Search" });
    this.username = page.locator(
      "//label[text()='Username']/parent::div/following-sibling::div/input",
    );
    this.userRole = page.locator(
      "//label[text()='User Role']/parent::div/following-sibling::div/div/div/div[@class='oxd-select-text-input']",
    );
    this.status = page.locator(
      "//label[text()='Status']/parent::div/following-sibling::div/div/div/div[@class='oxd-select-text-input']",
    );
    this.employeeName = page.locator(
      "//label[text()='Employee Name']/parent::div/following-sibling::div/div/div/input",
    );
    this.password = page.locator(
      "//label[text()='Password']/parent::div/following-sibling::div/input",
    );
    this.cPassword = page.locator(
      "//label[text()='Confirm Password']/parent::div/following-sibling::div/input",
    );
    this.saveBtn = page.getByRole("button", { name: "Save" });
    this.searchUsername = page.locator(
      "//label[text()='Username']/parent::div/following-sibling::div/input",
    );
    this.searchError = page.locator("//span[text()='No Records Found']");
  }

  async verifyAdminPageLoaded() {
    await expect(this.page).toHaveURL(/admin/);
    await expect(this.adminHeading).toBeVisible();
  }

  async clickAddBtn() {
    await this.addBtn.click();
  }

  async fillUserDetails(employeeName, username, password, cPassword) {
    await this.userRole.click();
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.status.click();
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.employeeName.click();
    await this.employeeName.pressSequentially(employeeName, { delay: 200 });
    await this.page.waitForTimeout(2000);
    await this.page.keyboard.press("ArrowDown");
    await this.page.keyboard.press("Enter");
    await this.username.fill(username);
    await this.password.fill(password);
    await this.cPassword.fill(cPassword);
  }

  async clickSaveBtn() {
    await this.saveBtn.click();
    await expect(this.page.getByText("Success", { exact: true })).toBeVisible();
  }

  async searchUser(username) {
    await this.searchUsername.click();
    await this.searchUsername.fill(username);
  }

  async clickSearchBtn() {
    await this.searchBtn.click();
  }
  async verifySearchResult() {
    await expect(this.page.getByText("(1) Record Found")).toBeVisible();
  }

  async verifySearchError() {
    await expect(this.searchError).toBeVisible();
  }
}

module.exports = { AdminPage };
