import { AuthorizationError } from "remix-auth";
import { prisma } from "~/libs/db";
import bcrypt from "bcryptjs";

export async function signIn(email: string, password: string): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.log("you entered a wrong email");
    throw new AuthorizationError();
  }

  const passwordsMatch = await bcrypt.compare(
    password,
    user.password as string
  );

  if (!passwordsMatch) {
    throw new AuthorizationError();
  }

  console.log(email, password);
  return user.id;
}
