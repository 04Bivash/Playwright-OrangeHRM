const { expect } = require("@playwright/test");

class HomePage {
  constructor(page) {
    this.page = page;
    this.profile = page.locator("//img[@alt='profile picture']").first();
    this.logoutBtn = page.locator("//a[text()='Logout']");
  }

  async LogoutFromApplication() {
    await this.profile.click();
    await this.logoutBtn.click();
  }
}

module.exports = { HomePage };
