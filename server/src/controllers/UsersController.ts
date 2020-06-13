import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

import generateWebToken from '../utils/gerenerateWebToken';

class UsersController {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const prisma = new PrismaClient();

    const userFound = await prisma.users.findOne({
      where: {
        email,
      },
    });

    if (userFound) {
      return response.status(400).json({ message: 'User already registered'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email,
      password: hashedPassword,
    };

    const insertedUser = await prisma.users.create({ data: user });
    delete insertedUser.password;

    const token = generateWebToken({ id: insertedUser.id });

    return response.json({ user: insertedUser, token });
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const prisma = new PrismaClient();

    const user = await prisma.users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return response.status(400).json({ message: 'Invalid password' });
    }

    const token = generateWebToken({ id: user.id });

    return response.json({ token });
  }
}

export default UsersController;
