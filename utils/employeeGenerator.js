function generateEmployee() {
  const unique = Date.now();
  return {
    employeeId: unique.toString().slice(-8),
    firstName: "Ram",
    middleName: "Krishna",
    lastName: "Shrestha",
    username: `emp${unique}`,
    password: "user@123",
    cPassword: "user@123",
  };
}
module.exports = { generateEmployee };
