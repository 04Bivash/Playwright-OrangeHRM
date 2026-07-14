const { expect } = require("@playwright/test");

class BuzzPage {
  constructor(page) {
    this.page = page;
    this.buzzHeading = page.getByRole("heading", { name: "Buzz" });
    this.postArea = page.getByRole("textbox", { name: "What's on your mind?" });
    this.postBtn = page.locator("//div[@class='oxd-buzz-post-slot']/button");
    this.mostRecentBtn = page.getByRole("button", {
      name: "Most Recent Posts",
    });
  }

  async verifyBuzzPageLoaded() {
    await expect(this.page).toHaveURL(/buzz/);
    await expect(this.buzzHeading).toBeVisible();
  }

  async createPost(postContent) {
    await this.postArea.fill(postContent);
  }
  async clickPostBtn() {
    await this.postBtn.click();
    await expect(this.page.getByText("Success", { exact: true })).toBeVisible();
  }
  async verifyPost(postContent) {
    await this.mostRecentBtn.click();
    await this.page.pause();
    await expect(
      this.page
        .locator(".orangehrm-buzz-post-body")
        .getByText(postContent, { exact: true }),
    ).toBeVisible();
  }
}

module.exports = { BuzzPage };
