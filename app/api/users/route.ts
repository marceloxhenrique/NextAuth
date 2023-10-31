import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (isUserExist) {
    return NextResponse.json({ error: "User already exist." }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name: name,
      email: email,
      hashedPassowrd: hashedPassword,
    },
  });

  return NextResponse.json("User succesfuly create");
}
