const { test } = require("@playwright/test");
const { LoginPage } = require("../pages/loginPage");
const { DashboardPage } = require("../pages/dashboardPage");
const { PimPage } = require("../pages/pimPage");
const { AdminPage } = require("../pages/adminPage");
const { BuzzPage } = require("../pages/buzzPage");
const emp = require("../utils/employeeGenerator");
const loginTestData = require("../test-data/loginData.json");

let loginPage;
let dashboardPage;
let pimPage;
let adminPage;
let buzzPage;

test.setTimeout(60000);
test.beforeEach("Navigate to OrangeHRM", async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  pimPage = new PimPage(page);
  adminPage = new AdminPage(page);
  buzzPage = new BuzzPage(page);

  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
});

test("should allow a newly created system user to log in successfully", async ({
  page,
}) => {
  await loginPage.loginToApplication(
    loginTestData.validUser.username,
    loginTestData.validUser.password,
  );
  await dashboardPage.verifyDashboardLoaded();
  await dashboardPage.clickPim();
  await pimPage.verifyPimPageLoaded();
  const employee = emp.generateEmployee();
  const username = employee.firstName + Date.now();
  const employeeName =
    employee.firstName + " " + employee.middleName + " " + employee.lastName;
  const password = employee.password;
  const cPassword = employee.cPassword;
  await pimPage.clickAddBtn();
  await pimPage.fillAddEmployeeForm(employee);
  await pimPage.clickSaveBtn();
  await dashboardPage.clickAdmin();
  await adminPage.verifyAdminPageLoaded();
  await adminPage.clickAddBtn();
  await adminPage.fillUserDetails(employeeName, username, password, cPassword);
  await adminPage.clickSaveBtn();
  await dashboardPage.logoutFromApplication();
  await loginPage.verifyHeaderVisibility();
  await loginPage.loginToApplication(employee.username, employee.password);
  await dashboardPage.verifyDashboardLoaded();
  await dashboardPage.clickBuzz();
  await buzzPage.verifyBuzzPageLoaded();
  const postContent = `Playwright Test Post Content ${Date.now()}`;
  await buzzPage.createPost(postContent);
  await buzzPage.clickPostBtn();
  await buzzPage.verifyPost(postContent);
  await dashboardPage.logoutFromApplication();
  await loginPage.verifyHeaderVisibility();
});
