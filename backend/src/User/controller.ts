import { ZodError } from "zod";
import { Encryption } from "../utils/encryption";
import Validation from "../utils/validation";
import UserUtil from "./utils/userUtil";
import {
  SLoginAdmin,
  SRegister,
  SRegisterResident,
  TLoginAdmin,
  TRegister,
  TRegisterResident,
} from "./utils/userZod";

export async function login(data: TLoginAdmin) {
  try {
    SLoginAdmin.parse(data);

    const User = new UserUtil({ data: undefined });
    const Encrypt = new Encryption(data.password);

    const mobileNumber = await User.isNumberAvailable(data.mobileNo as string);

    if (!mobileNumber) {
      throw new Error("MobileNo. does not exists please make an account");
    }

    if (mobileNumber.role === "Resident") {
      throw new Error("You are not an admin");
    }

    if (!(await Encrypt.decryptPassword(mobileNumber.password as string))) {
      throw new Error("Wrong Password");
    }

    if (mobileNumber.status === 0) {
      throw new Error("You are not activated yet");
    }

    return { ...mobileNumber };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function registerAdmin(data: TRegister) {
  try {
    SRegister.parse(data);

    const Validator = new Validation(data);
    const User = new UserUtil({ data: data });

    Validator.register(["email", "password"]);
    Validator.validate();

    const userNameAvailable = await User.isNameAvailable();
    const mobileAvailable = await User.isNumberAvailable();

    if (!userNameAvailable) {
      throw new Error("Name is already taken");
    }
    if (!mobileAvailable) {
      throw new Error("Mobile No. is already taken");
    }

    const encrypt = new Encryption(data.password || "");
    const hashedPass = await encrypt.hashPassword();

    data.password = hashedPass;

    if (!User.data) {
      throw new Error("Error Occured while excrypting password");
    }

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

export async function registerResident({
  data,
  residentData,
}: {
  data: TRegister;
  residentData: TRegisterResident;
}) {
  try {
    SRegister.parse(data);
    SRegisterResident.parse(residentData);

    const User = new UserUtil({ data: data });

    const userNameAvailable = await User.isNameAvailable();
    const mobileAvailable = await User.isNumberAvailable();

    if (!userNameAvailable) {
      throw new Error("Name is already taken");
    }
    if (!mobileAvailable) {
      throw new Error("Mobile No. is already taken");
    }

    const postUser = await User.registerUser();

    residentData.id = postUser.id;

    const postResident = await User.registerResident(residentData);

    return { ...postUser, ...postResident };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
