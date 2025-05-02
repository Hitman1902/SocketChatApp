const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { success, error } = require("../helpers/responsibleHelper");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return error(res, "Email already registered", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "520hrs" }
    );
    success(res, "User registered", {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Register Error:", err);
    error(res, "Registration failed");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return error(res, "Invalid credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return error(res, "Invalid credentials", 401);

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "520hrs" }
    );

    success(res, "Login successful", { token });
  } catch (err) {
    console.error("Login Error:", err);
    error(res, "Login failed");
  }
};
