const { expect } = require("@playwright/test");

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.profilePic = page.locator("//img[@class='oxd-userdropdown-img']");
    this.employeeDistributionLabel = page.getByText(
      "Employee Distribution by Sub Unit",
      { exact: true },
    );
    this.myActionsLabel = page.getByText("My Actions", { exact: true });
    this.quickLaunchLabel = page.getByText("Quick Launch", { exact: true });
    this.adminLink = page.getByRole("link", { name: "Admin" });
    this.pimLink = page.getByRole("link", { name: "PIM" });
    this.buzzLink = page.getByRole("link", { name: "Buzz" });
    this.logoutBtn = page.locator("//a[text()='Logout']");
  }

  async logoutFromApplication() {
    await this.profilePic.click();
    await this.logoutBtn.click();
  }

  async verifyDashboardLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.profilePic).toBeVisible();
  }

  async verifyWidgetsLoaded() {
    await expect(this.employeeDistributionLabel).toBeVisible();
    await expect(this.myActionsLabel).toBeVisible();
    await expect(this.quickLaunchLabel).toBeVisible();
  }

  async verifySidebarItems() {
    await expect(this.adminLink).toBeVisible();
    await expect(this.pimLink).toBeVisible();
    await expect(this.buzzLink).toBeVisible();
  }

  async clickAdmin() {
    await this.adminLink.click();
    await expect(this.page).toHaveURL(/admin/);
  }

  async clickPim() {
    await this.pimLink.click();
    await expect(this.page).toHaveURL(/pim/);
  }

  async clickBuzz() {
    await this.buzzLink.click();
    await expect(this.page).toHaveURL(/buzz/);
  }
}

module.exports = { DashboardPage };
