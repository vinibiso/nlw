import { Request, Response, request, response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';

class UsersController {

  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = {
      email,
      password: hashedPassword,
    }

    const insertedIds = await knex('users').insert(user);
    const userId = insertedIds[0];

    delete user.password;

    return response.json({userId, ...user});
  }

}

export default UsersController;