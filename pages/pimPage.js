const { expect } = require("@playwright/test");

class PimPage {
  constructor(page) {
    this.page = page;
    this.pimHeading = page.getByRole("heading", { name: "PIM" });
    this.addEmployeeBtn = page.getByRole("link", { name: "Add Employee" });
    this.firstName = page.getByPlaceholder("First Name");
    this.middleName = page.getByPlaceholder("Middle Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.employeeId = page.locator(
      "//label[text()='Employee Id']/parent::div/following-sibling::div/input",
    );
    this.loginDetailsToggle = page.locator(
      "//span[@class='oxd-switch-input oxd-switch-input--active --label-right']",
    );
    this.username = page.locator(
      "//label[text()='Username']/parent::div/following-sibling::div/input",
    );
    this.password = page.locator(
      "//label[text()='Password']/parent::div/following-sibling::div/input",
    );
    this.cPassword = page.locator(
      "//label[text()='Confirm Password']/parent::div/following-sibling::div/input",
    );
    this.saveBtn = page.getByRole("button", { name: "Save" });
    this.duplicateIdError = page.getByText("Employee Id already exists");
    this.duplicateUsernameError = page.getByText("Username already exists");
    this.firstNameRequiredError = page.locator(
      "//input[@placeholder='First Name']/ancestor::div/span[text()='Required']",
    );
    this.lastNameRequiredError = page.locator(
      "//input[@placeholder='Last Name']/ancestor::div/span[text()='Required']",
    );
    this.passwordMatchError = page.getByText("Passwords do not match");
  }

  async verifyPimPageLoaded() {
    await expect(this.page).toHaveURL(/pim/);
    await expect(this.pimHeading).toBeVisible();
  }

  async clickAddBtn() {
    await this.addEmployeeBtn.click();
  }

  async fillAddEmployeeForm(employee) {
    await this.firstName.fill(employee.firstName);
    await this.middleName.fill(employee.middleName);
    await this.lastName.fill(employee.lastName);
    await this.employeeId.fill(employee.employeeId);
    await this.loginDetailsToggle.click();
    await this.username.fill(employee.username);
    await this.password.fill(employee.password);
    await this.cPassword.fill(employee.cPassword);
  }
  async clickSaveBtn() {
    await this.page.pause();
    await this.saveBtn.click();
    await expect(this.page.getByText("Success", { exact: true })).toBeVisible();
  }

  async verifyDuplicateEmployeeIdError() {
    await expect(this.duplicateIdError).toBeVisible();
  }

  async verifyDuplicateUsernameError() {
    await expect(this.duplicateUsernameError).toBeVisible();
  }

  async verifyFirstNameRequiredError() {
    await expect(this.firstNameRequiredError).toBeVisible();
  }

  async verifyLastNameRequiredError() {
    await expect(this.lastNameRequiredError).toBeVisible();
  }

  async verifyPasswordMatchError() {
    await expect(this.passwordMatchError).toBeVisible();
  }
}

module.exports = { PimPage };
