const { expect } = require("@playwright/test");

class AdminPage {
  constructor(page) {
    this.page = page;
    this.adminHeading = page.getByRole("heading", { name: "Admin" });
  }

  async verifyAdminPageLoaded() {
    await expect(this.page).toHaveURL(/admin/);
    await expect(this.adminHeading).toBeVisible();
  }
}

module.exports = { AdminPage };
