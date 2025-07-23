import { prisma } from '.';

export interface UserEntity {
  id: number | null;
  username: string;
  passwordHash: string;
  imageSrc: string | null;
  bio: string | null;
  createdAt: number;
}

const demoUsers: UserEntity[] = [
  {
    id: 1,
    username: 'alice_dev',
    passwordHash: 'password',
    imageSrc: 'https://via.placeholder.com/150',
    bio: 'I am a software developer',
    createdAt: Date.now() - 5,
  },
  {
    id: 2,
    username: 'bob_dev',
    passwordHash: 'password',
    imageSrc: 'https://via.placeholder.com/150',
    bio: 'I am a software developer',
    createdAt: Date.now() - 4,
  },
  {
    id: 3,
    username: 'charlie_dev',
    passwordHash: 'password',
    imageSrc: 'https://via.placeholder.com/150',
    bio: 'I am a software developer',
    createdAt: Date.now() - 3,
  },
  {
    id: 4,
    username: 'dave_dev',
    passwordHash: 'password',
    imageSrc: 'https://via.placeholder.com/150',
    bio: 'I am a software developer',
    createdAt: Date.now() - 2,
  },
  {
    id: 5,
    username: 'eve_dev',
    passwordHash: 'password',
    imageSrc: 'https://via.placeholder.com/150',
    bio: 'I am a software developer',
    createdAt: Date.now() - 1,
  },
];

export class User {


  static async insertDemoUsers(): Promise<void> {
    const count = await prisma.users.count()
    if (count === 0) {
      await prisma.users.createMany({
        data: demoUsers.map(user => ({
          ...user,
          id: user.id ?? undefined,
        })),
      });
    }
  }

  static async addUser(user: UserEntity): Promise<void> {
    await prisma.users.create({
      data: {
        ...user,
        id: user.id ?? undefined,
      },
    });
  }

  static async findByUsername(username: string): Promise<UserEntity | null> {
    return await prisma.users.findUnique({
      where: { username },
    }) as UserEntity | null;
  }
}