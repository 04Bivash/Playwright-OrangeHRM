const { expect } = require("@playwright/test");

class PimPage {
  constructor(page) {
    this.page = page;
    this.pimHeading = page.getByRole("heading", { name: "PIM" });
  }

  async verifyPimPageLoaded() {
    await expect(this.page).toHaveURL(/pim/);
    await expect(this.pimHeading).toBeVisible();
  }
}

module.exports = { PimPage };
