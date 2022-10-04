export const signUpErrors = (err: any) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Mail isn't correct";
  if (err.message.includes("password"))
    errors.password = "The password need to be 6 letters minimal";
  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "This email is already taken";
  return errors;
};

export const signInErrors = (err: any) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";
  return errors;
};
