import { Prisma } from "../../utils/prismaClient";
import { TCreateProgram } from "./progZod";

export class ProgUtils extends Prisma {
  public data;

  constructor(data?: TCreateProgram) {
    super();
    this.data = data;
  }

  public async findProgram() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const program = await this.prisma.program.findFirst({
        where: { name: this.data.name },
      });

      if (!program) {
        return false;
      }

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async createProgram() {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const program = await this.prisma.program.create({ data: this.data });

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async updateProgram(id: string) {
    try {
      if (!this.data) {
        throw new Error("Missing Fields");
      }

      const program = await this.prisma.program.update({
        where: { id: id },
        data: this.data,
      });

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async deleteProgram(id: string) {
    try {
      const program = await this.prisma.program.delete({
        where: {
          id: id,
        },
      });

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async findId(id: string) {
    try {
      const program = await this.prisma.program.findUnique({
        where: { id: id },
        include: {
          schedules: true,
        },
      });

      if (!program) {
        return false;
      }

      return program;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  public async getProgram(id: string) {
    try {
      const program = await this.prisma.program.findMany({
        where: { brgyId: id },
        include: {
          schedules: true,
          barangay: true,
        },
      });

      return [...program];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
