import { prisma } from '.';

export interface UserEntity {
  id: number | null;
  email: string;
  username: string;
  passwordHash: string;
  imageSrc: string | null;
  bio: string | null;
  createdAt: bigint;
}

export interface IUserRepository {
  addUser(user: UserEntity): Promise<void>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findByUsername(username: string): Promise<UserEntity | null>;
}

export class User implements IUserRepository {

  async addUser(user: UserEntity): Promise<void> {
    const { id, ...userData } = user;
    await prisma.users.create({
      data: userData,
    });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return await prisma.users.findUnique({
      where: { username },
    }) as UserEntity | null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await prisma.users.findUnique({
      where: { email },
    }) as UserEntity | null;
  }
}