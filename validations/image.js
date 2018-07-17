const Validator = require("validator");
const isEmpty = require("./is-empty");

const imageValidations = {};

// Image Processing validations
imageValidations.validateImageInput = data => {
  let errors = {};

  data.url = !isEmpty(data.url) ? data.url : "";
  data.isFile = !isEmpty(data.isFile) ? data.isFile : false;

  if (data.isFile) {
    if (Validator.isEmpty(data.url)) {
      errors.url = "File is required";
    }
  } else {
    if (!Validator.isURL(data.url)) {
      errors.url = "URL is invalid";
    }

    if (Validator.isEmpty(data.url)) {
      errors.url = "URL/File is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = imageValidations;
