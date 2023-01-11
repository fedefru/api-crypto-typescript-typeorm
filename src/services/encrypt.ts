import bcrypt from "bcryptjs";

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const validatePassword = async ( password: string, entryPassword: string ): Promise<boolean> => {
     return await bcrypt.compare(entryPassword, password);
};
