import { Request, Response, request, response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcrypt';

import generateWebToken from '../utils/gerenerateWebToken'

class UsersController {

  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userFound = await knex('users').where('email', email);

    if(userFound.length > 0) {
      return response.status(400).json({ message: 'User already registered'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email,
      password: hashedPassword,
    }

    const insertedIds = await knex('users').insert(user);
    const userId = insertedIds[0];

    const newUser = {
      id: userId, 
      emaail: user.email,
    }

    const token = generateWebToken({ id: newUser.id })

    return response.json({user: newUser, token});
  }

  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await knex('users').where('email', email).first();

    if(!user){
      return response.status(400).json({ message: 'User not found'})
    }

    if(!await bcrypt.compare(password, user.password)){
      return response.status(400).json({ message: 'Invalid password'})
    }

    const token = generateWebToken({ id: user.id})

    return response.json({ token });
  }

}

export default UsersController;