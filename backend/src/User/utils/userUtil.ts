import { Prisma } from "../../utils/prismaClient";
import { TRegister } from "./userZod";

export default class UserUtil extends Prisma {
  public data;

  constructor(data: TRegister) {
    super();
    this.data = data;
  }

  public async isNameAvailable() {
    try {
      const { fname, lname, mname } = this.data;
      const findUser = await this.prisma.users.findFirst({
        where: {
          fname: fname,
          lname: lname,
          mname: mname,
        },
      });

      console.log(findUser);

      if (findUser) {
        return false;
      }

      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async isNumberAvailable() {
    try {
      const findNumber = await this.prisma.users.findFirst({
        where: {
          mobileNo: this.data.mobileNo,
        },
      });

      if (findNumber) {
        return false;
      }

      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async registerUser() {
    try {
      const postUser = await this.prisma.users.create({
        data: {
          ...this.data,
        },
      });

      return postUser;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
