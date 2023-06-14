export function validateInputs(...inputs) {
  const [username, email, password] = inputs;
  if (
    !username ||
    username.trim() === "" ||
    username.length < 3 ||
    !email ||
    email.trim() === "" ||
    !email.includes("@") ||
    !password ||
    password.length < 3 ||
    password.trim() === ""
  ) {
    return true;
  }
}
