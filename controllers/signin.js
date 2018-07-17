const jwt = require("jsonwebtoken");
// Load Input Validation
const userValidations = require("../validations/user");

// Load User Model
const UserModel = require("../models/User");

const handleSignin = bcrypt => (req, res) => {
  const { errors, isValid } = userValidations.validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;

  // Find user by email
  UserModel.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.SECRET_OR_PRIVATE_KEY,
          {
            expiresIn: 3600
          },
          (err, token) => {
            return res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
};

module.exports = {
  handleSignin: handleSignin
};
