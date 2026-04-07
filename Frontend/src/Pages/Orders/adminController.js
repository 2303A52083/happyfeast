import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔐 Simple hardcoded admin (easy for project)
    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {
      const token = jwt.sign({ role: "admin" }, "secretkey");

      res.json({
        success: true,
        token
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials"
      });
    }
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export { adminLogin };
