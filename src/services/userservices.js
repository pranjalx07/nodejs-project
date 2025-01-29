import { prisma } from "../db/index.js";
import {
  checkPassword,
  generateHashForPassword,
} from "../libs/password-utility.js";

export const getAllUserService = async () => {
  return await prisma.user.findMany();
};

export const registerUserService = async (registerUserData) => {
  const hashedPassword = await generateHashForPassword(
    registerUserData.password
  );

  const res = await prisma.user.create({
    data: {
      email: registerUserData.email,
      fullName: registerUserData.fullName,
      password: hashedPassword,
      gender: registerUserData.gender,
    },
    omit: {
      password: true,
    },
  });
  return res;
};

export const loginUserService = async (loginData) => {
  const email = loginData.email;
  const password = loginData.password;

  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    throw new Error("Invalid credentials", { cause: "CustomError" });
  }

  const isPasswordSame = await checkPassword(password, user.password);

  if (!isPasswordSame) {
    throw new Error("Invalid credentials", { cause: "CustomError" });
  }

  delete user.password;
  return { message: "Login successful", user };
};