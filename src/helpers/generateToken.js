const jwt = require("jsonwebtoken");

const generateToken = (id, name) => {
  return jwt.sign({ id: id, name: name }, process.env.JWT_SECRET, {
    expiresIn: "520h",
  });
};

module.exports = { generateToken };
