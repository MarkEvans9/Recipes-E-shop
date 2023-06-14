import jwt from "jsonwebtoken";
// import { verify } from "jsonwebtoken";
import { hash } from "bcrypt";
import { compare } from "bcrypt";
import { UserModel } from "../model/Users.js";
import { validateInputs } from "../utils/validate.js";
// function validateInputs(...inputs) {
//   const [username, email, password] = inputs;
//   if (
//     !username ||
//     username.trim() === "" ||
//     username.length < 3 ||
//     !email ||
//     email.trim() === "" ||
//     !email.includes("@") ||
//     !password ||
//     password.length < 3 ||
//     password.trim() === ""
//   ) {
//     return true;
//   }
// }

const register = async (req, res) => {
  const { username, email, password } = req.body;

  //inputs validation
  const validate = validateInputs(username, email, password);
  if (validate) return res.status(422).json({ eror: "inputs not valid" });

  const existingUser = await UserModel.findOne({ username });
  const existingUser1 = await UserModel.findOne({ email });

  if (existingUser || existingUser1) {
    return res.status(500).json({ message: "user already exists" });
  }

  const hashedPassword = await hash(password, 12);
  const user = {
    username,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };

  const newUser = new UserModel(user);
  await newUser.save();

  return res.status(201).json({ message: "registration successful" });
};

//Login user
const Login = async (req, res) => {
  const { email, password } = req.body;

  // verify inputs
  if (!email || !email.includes("@") || !password || password.trim() === "") {
    return res.status(422).json({ message: "Credientials error" });
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(422).json({ message: "Enter a valid email" });
  }

  //verify password
  const verify = await compare(password, user.password);

  if (!verify) {
    return res.status(422).json({ message: "Password incorrect" });
  }

  const token = jwt.sign({ user: user._id }, "secretkey");

  return res.status(200).json({ token, user: user._id });
};

export { register, Login };
