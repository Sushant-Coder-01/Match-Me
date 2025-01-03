import { PrismaClient } from "@prisma/client";
import { membersData } from "./membersData.ts";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;

const prisma = new PrismaClient();

async function seedMembers() {
  for (const member of membersData) {
    const passwordHash = await hash("Password@123", 10);

    const createdUser = await prisma.user.create({
      data: {
        email: member.email,
        emailVerified: new Date(),
        name: member.name,
        passwordHash,
        image: member.image,
        profileComplete: true,
        member: {
          create: {
            name: member.name,
            gender: member.gender,
            dateOfBirth: new Date(member.dateOfBirth),
            created: new Date(member.created),
            updated: new Date(member.lastActive),
            description: member.description,
            city: member.city,
            country: member.country,
            image: member.image,
            photos: {
              create: {
                url: member.image,
                isApproved: true,
              },
            },
          },
        },
      },
    });
  }
}

async function seedAdmin() {
  return await prisma.user.create({
    data: {
      email: "admin@test.com",
      emailVerified: new Date(),
      name: "Admin",
      passwordHash: await hash("Password@123", 10),
      role: "ADMIN",
    },
  });
}

async function main() {
  await seedMembers();
  await seedAdmin();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
