const { test } = require("@playwright/test");
const { DashboardPage } = require("../pages/dashboardPage");
const { LoginPage } = require("../pages/loginPage");
const { PimPage } = require("../pages/pimPage");
const { AdminPage } = require("../pages/adminPage");
const loginTestData = require("../test-data/loginData.json");
const emp = require("../utils/employeeGenerator");

let loginPage;
let dashboardPage;
let pimPage;
let adminPage;

test.beforeEach(
  "Navigate to OrangeHRM Admin page from dashboard",
  async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    pimPage = new PimPage(page);
    adminPage = new AdminPage(page);

    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await loginPage.loginToApplication(
      loginTestData.validUser.username,
      loginTestData.validUser.password,
    );
  },
);

test.describe("Testing the functionality of the admin page", () => {
  test("should navigate to the admin page from the dashboard", async ({
    page,
  }) => {
    await dashboardPage.clickAdmin();
    await adminPage.verifyAdminPageLoaded();
  });

  test("should create a system user for an existing employee", async ({
    page,
  }) => {
    await dashboardPage.clickPim();
    const employee = emp.generateEmployee();
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee);
    const username = employee.firstName + Date.now();
    const employeeName =
      employee.firstName + " " + employee.middleName + " " + employee.lastName;
    const password = employee.password;
    const cPassword = employee.cPassword;
    await pimPage.clickSaveBtn();
    await dashboardPage.clickAdmin();
    await adminPage.clickAddBtn();
    await adminPage.fillUserDetails(
      employeeName,
      username,
      password,
      cPassword,
    );
    await adminPage.clickSaveBtn();
  });

  test("should return details of searched employee", async ({ page }) => {
    await dashboardPage.clickPim();
    const employee = emp.generateEmployee();
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee);
    const username = employee.firstName + Date.now();
    const employeeName =
      employee.firstName + " " + employee.middleName + " " + employee.lastName;
    const password = employee.password;
    const cPassword = employee.cPassword;
    await pimPage.clickSaveBtn();
    await dashboardPage.clickAdmin();
    await adminPage.clickAddBtn();
    await adminPage.fillUserDetails(
      employeeName,
      username,
      password,
      cPassword,
    );
    await adminPage.clickSaveBtn();
    await adminPage.searchUser(username);
    await adminPage.clickSearchBtn();
    await adminPage.verifySearchResult();
  });

  test.only("should display an error message for an invalid search", async ({
    page,
  }) => {
    await dashboardPage.clickPim();
    const employee = emp.generateEmployee();
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee);
    const username = employee.firstName + Date.now();
    const employeeName =
      employee.firstName + " " + employee.middleName + " " + employee.lastName;
    const password = employee.password;
    const cPassword = employee.cPassword;
    await pimPage.clickSaveBtn();
    await dashboardPage.clickAdmin();
    await adminPage.clickAddBtn();
    await adminPage.fillUserDetails(
      employeeName,
      username,
      password,
      cPassword,
    );
    await adminPage.clickSaveBtn();
    await adminPage.searchUser("xyz");
    await adminPage.clickSearchBtn();
    await adminPage.verifySearchError();
  });
});
