import { ZodError } from "zod";
import { ProgUtils } from "./utils/ProgUtils";
import { SCreateProgram, TCreateProgram } from "./utils/progZod";

export async function createProgram(data: TCreateProgram) {
  try {
    SCreateProgram.parse(data);

    const Program = new ProgUtils(data);

    const checkName = await Program.findProgram();

    if (checkName && checkName.brgyId === data.brgyId) {
      throw new Error("Program name already exists");
    }

    const create = await Program.createProgram();

    return create;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function getPrograms(id: string) {
  try {
    const Program = new ProgUtils();

    const create = await Program.getProgram(id);

    return create.length > 0 ? { data: [...create] } : { data: "No Data" };
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function updateProgram(data: TCreateProgram, id: number) {
  try {
    SCreateProgram.parse(data);

    const Program = new ProgUtils(data);

    const findId = await Program.findId(id);

    if (!findId) {
      throw new Error("Program does not exists");
    }

    const checkName = await Program.findProgram();

    if (checkName && checkName.brgyId === data.brgyId) {
      throw new Error("Program name already exists");
    }

    const update = await Program.updateProgram(id);

    return update;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}

export async function deleteProgram(id: number) {
  try {
    const Program = new ProgUtils();

    const findId = await Program.findId(id);

    if (!findId) {
      throw new Error("Program does not exists");
    }

    const deleted = await Program.deleteProgram(id);

    return deleted;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
export async function findProgram(id: string) {
  try {
    const Program = new ProgUtils();

    const findId = await Program.findId(id);

    if (!findId) {
      throw new Error("Program does not exists");
    }

    return findId;
  } catch (err: any) {
    if (err instanceof ZodError) {
      throw new Error(
        err.issues[0].message || err.message || "There was an Error"
      );
    }

    throw new Error(err.message || "There was an Error");
  }
}
