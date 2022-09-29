import { Prisma } from "../../utils/prismaClient";
import { TTransaction } from "./transZod";

export class TransUtils extends Prisma {
  public data;

  constructor(data?: TTransaction) {
    super();
    this.data = data;
  }

  public async postTransaction() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const transaction = await this.prisma.transaction.create({
        data: this.data,
      });

      return transaction;
    } catch (err: any) {
      throw new Error(err.message || "There was an Error");
    }
  }

  public async updateTransaction(id: number) {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const transaction = await this.prisma.transaction.update({
        where: { id: id },
        data: this.data,
      });

      return transaction;
    } catch (err: any) {
      throw new Error(err.message || "There was an Error");
    }
  }

  public async getTransaction(id: string) {
    try {
      const transaction = await this.prisma.transaction.findMany({
        where: {
          brgyId: id,
        },
        include: {
          barangay: true,
          resident: true,
          schedule: true,
          program: true,
        },
      });

      return [...transaction];
    } catch (err: any) {
      throw new Error(err.message || "There was an Error");
    }
  }
}
