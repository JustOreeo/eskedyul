import bcrypt from "bcryptjs";

export class Encryption {
  private password;

  constructor(password: string) {
    this.password = password;
  }

  public async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(this.password, salt);

    return hashedPass;
  }

  public async decryptPassword(password: string) {
    if (!(await bcrypt.compare(this.password, password))) {
      return false;
    }
    return true;
  }
}
