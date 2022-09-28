import { ZodError } from "zod";
import { Encryption } from "../utils/encryption";
import Validation from "../utils/validation";
import UserUtil from "./utils/userUtil";
import { SRegister, TRegister } from "./utils/userZod";

export async function login(data: any) {
  return data;
}

export async function registerAdmin(data: TRegister) {
  try {
    SRegister.parse(data);

    const Validator = new Validation(data);
    const User = new UserUtil(data);

    Validator.register(["email", "password"]);
    Validator.validate();

    const userNameAvailable = await User.isNameAvailable();
    const mobileAvailable = await User.isNumberAvailable();

    if (!userNameAvailable) {
      throw new Error("Name is already taken");
    }
    if (!mobileAvailable) {
      throw new Error("Name is already taken");
    }

    const encrypt = new Encryption(data.password || "");
    const hashedPass = await encrypt.hashPassword();

    data.password = hashedPass;
    User.data.password = hashedPass;

    const postUser = await User.registerUser();

    return postUser;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
