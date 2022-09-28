import { Prisma } from "../../utils/prismaClient";
import { TRegister, TRegisterResident } from "./userZod";

export default class UserUtil extends Prisma {
  public data;

  constructor({ data }: { data: TRegister | undefined }) {
    super();
    this.data = data;
  }

  public async isNameAvailable() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const { fname, lname, mname } = this.data;
      const findUser = await this.prisma.users.findFirst({
        where: {
          fname: fname,
          lname: lname,
          mname: mname,
        },
      });

      if (findUser) {
        return false;
      }

      return true;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async isNumberAvailable(mobileNo?: string) {
    try {
      const findNumber = await this.prisma.users.findFirst({
        where: {
          mobileNo: this.data ? this.data.mobileNo : mobileNo,
        },
      });

      if (!findNumber) {
        return false;
      }

      return findNumber;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async registerUser() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

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

  public async registerResident(resData: TRegisterResident) {
    try {
      const postResident = await this.prisma.residents.create({
        data: {
          id: Number(resData.id),
          birthdate: resData.birthdate.toString(),
          birthPlace: resData.birthPlace.toString(),
          civilStatus: resData.civilStatus.toString(),
          emgContName: resData.emgContName.toString(),
          emgContNum: resData.emgContNum.toString(),
          empStatus: resData.empStatus.toString(),
          OSCAId: resData.OSCAId ? resData.OSCAId.toString() : "",
          residencyStatus: resData.residencyStatus.toString(),
          seniorType: resData.seniorType.toString(),
        },
      });

      return postResident;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
