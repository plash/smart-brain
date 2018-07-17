const jwt = require("jsonwebtoken");
// Load Input Validation
const userValidations = require("../validations/user");

// Load User Model
const UserModel = require("../models/User");

const handleRegister = (req, res, bcrypt) => {
  const { errors, isValid } = userValidations.validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  UserModel.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = {
                id: user._id,
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
            })
            .catch(err => res.status(400).json(err));
        });
      });
    }
  });
};

module.exports = {
  handleRegister: handleRegister
};
