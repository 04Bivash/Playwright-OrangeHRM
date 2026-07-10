const { expect } = require("@playwright/test");

class BuzzPage {
  constructor(page) {
    this.page = page;
    this.buzzHeading = page.getByRole("heading", { name: "Buzz" });
  }

  async verifyBuzzPageLoaded() {
    await expect(this.page).toHaveURL(/buzz/);
    await expect(this.buzzHeading).toBeVisible();
  }
}

module.exports = { BuzzPage };
