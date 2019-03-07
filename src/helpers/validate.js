export default function(values) {
  const errors = {};
  const requiredFields = values.passwordRe
    ? ["email", "password", "passwordRe"]
    : ["email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (values.password !== values.passwordRe) {
    errors.passwordRe = `Passwords don't match.`;
  }
  return errors;
}
