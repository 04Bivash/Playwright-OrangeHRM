const { test } = require("@playwright/test");
const { DashboardPage } = require("../pages/dashboardPage");
const { LoginPage } = require("../pages/loginPage");
const { PimPage } = require("../pages/pimPage");
const loginTestData = require("../test-data/loginData.json");

let loginPage;
let dashboardPage;
let pimPage;

test.beforeEach(
  "Navigate to OrangeHRM PIM page from dashboard",
  async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    pimPage = new PimPage(page);

    await page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await loginPage.loginToApplication(
      loginTestData.validUser.username,
      loginTestData.validUser.password,
    );
    await dashboardPage.clickPim();
  },
);

test.describe("Testing the functionality of the PIM page", () => {
  test("should navigate to the PIM page from the dashboard", async ({
    page,
  }) => {
    await pimPage.verifyPimPageLoaded();
  });

  function generateEmployee() {
    const unique = Date.now();
    return {
      employeeId: unique.toString().substring(0, 9),
      firstName: "Ram",
      middleName: "Krishna",
      lastName: "Shrestha",
      username: `emp${unique}`,
      password: "user@123",
      cPassword: "user@123",
    };
  }
  test("should add a new employee with valid details", async ({ page }) => {
    const employee = generateEmployee();
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee);
    await pimPage.clickSaveBtn();
  });

  test("should not allow duplicate employeeID", async ({ page }) => {
    const employee1 = generateEmployee();
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee1);
    await pimPage.clickSaveBtn();
    const employee2 = generateEmployee();
    employee2.employeeId = employee1.employeeId;
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee2);
    await pimPage.verifyDuplicateEmployeeIdError();
  });
  test("should not allow duplicate username", async ({ page }) => {
    const employee1 = generateEmployee();
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee1);
    await pimPage.clickSaveBtn();
    const employee2 = generateEmployee();
    employee2.username = employee1.username;
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee2);
    await pimPage.verifyDuplicateUsernameError();
  });
  test("should require first name", async ({ page }) => {
    const employee1 = generateEmployee();
    await pimPage.clickAddBtn();
    employee1.firstName = " ";
    await pimPage.fillAddEmployeeForm(employee1);
    await pimPage.verifyFirstNameRequiredError();
  });
  test("should require last name", async ({ page }) => {
    const employee1 = generateEmployee();
    await pimPage.clickAddBtn();
    employee1.lastNameName = " ";
    await pimPage.fillAddEmployeeForm(employee1);
    await pimPage.verifyLastNameRequiredError();
  });
  test("should require password confirmation to match", async ({ page }) => {
    const employee1 = generateEmployee();
    await pimPage.clickAddBtn();
    employee1.cPassword = "123654";
    await pimPage.fillAddEmployeeForm(employee1);
    await pimPage.verifyPasswordMatchError();
  });

  test.only("should return details of searched employee", async ({ page }) => {
    const employee = generateEmployee();
    const empId = employee.employeeId;
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee);
    await pimPage.clickSaveBtn();
    await pimPage.searchEmployee(empId);
    await pimPage.verifySearchResult(empId);
  });

  test("should display an error message for an invalid search", async ({
    page,
  }) => {
    const employee = generateEmployee();
    const empId = "xyz789";
    await pimPage.clickAddBtn();
    await pimPage.fillAddEmployeeForm(employee);
    await pimPage.clickSaveBtn();
    await pimPage.searchEmployee(empId);
    await pimPage.verifySearchError(empId);
  });
});
