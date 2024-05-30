const bycrpt = require("bcryptjs");

const comparePassword = (password, hashedPassword) => {
  return bycrpt.compareSync(password, hashedPassword);
}

module.exports = {
  comparePassword,
};
