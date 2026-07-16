# Playwright OrangeHRM Automation Framework

## Overview

This project is an automated UI testing framework for the OrangeHRM Demo application developed using **Playwright** and **JavaScript**. The framework follows the **Page Object Model (POM)** design pattern to create maintainable, reusable, and scalable automated tests.

The project covers functional, validation, and end-to-end testing of key HR workflows, including authentication, employee management, system user management, dashboard navigation, and social feed interactions.

---

## Features

- Login with valid credentials
- Login validation with invalid credentials
- Required field validation
- Logout functionality
- Dashboard verification
- Employee creation and search (PIM)
- System user creation and search (Admin)
- Buzz post creation and verification
- End-to-end workflow for creating and logging in as a new system user
- Dynamic test data generation to ensure unique employees and users

---

## Tech Stack

- Playwright
- JavaScript (Node.js)
- Page Object Model (POM)
- Git & GitHub

---

## Project Structure

```text
Playwright-OrangeHRM/
│
├── pages/
│   ├── loginPage.js
│   ├── dashboardPage.js
│   ├── pimPage.js
│   ├── adminPage.js
│   └── buzzPage.js
│
├── tests/
│   ├── login.spec.js
│   ├── logout.spec.js
│   ├── dashboard.spec.js
│   ├── pim.spec.js
│   ├── admin.spec.js
│   ├── buzz.spec.js
│   └── e2e.spec.js
│
├── test-data/
│   ├── loginData.json
│
├── utils/
│   └── employeeGenerator.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Test Coverage

### Authentication

- Login with valid credentials
- Login with invalid credentials
- Required field validation
- Logout

### Dashboard

- Verify successful dashboard navigation
- Verify dashboard elements

### PIM (Personnel Information Management)

- Add new employee
- Search employee
- Employee validation
- Required field validation

### Admin

- Create system user
- Search system user
- Invalid search validation

### Buzz

- Create a new post
- Verify newly created post

### End-to-End Workflow

- Login as Administrator
- Create a new employee
- Create a system user for the employee
- Logout
- Login using the newly created user credentials
- Verify successful login
- Make a post

---

## Framework Design

This framework follows the **Page Object Model (POM)** design pattern.

Each application page is represented by a dedicated page class that encapsulates:

- Page locators
- User actions
- Verification methods

This structure improves:

- Code reusability
- Readability
- Maintainability
- Scalability

---

## Installation

Clone the repository:

```bash
git clone https://github.com/04Bivash/Playwright-OrangeHRM.git
```

Navigate into the project:

```bash
cd Playwright-OrangeHRM
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

## Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.js
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test by name:

```bash
npx playwright test -g "should allow a newly created system user to log in successfully"
```

---

## Test Reports

Open the Playwright HTML report:

```bash
npx playwright show-report
```
---


## Key Highlights

- Page Object Model architecture
- Modular page classes
- Reusable page methods
- Dynamic test data generation
- End-to-end workflow automation
- Explicit assertions
- Clean project structure
- Maintainable and scalable framework

---

## Author

**Bivash**

GitHub: https://github.com/04Bivash