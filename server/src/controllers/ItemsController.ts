import { Request, Response } from 'express';
import prisma from '../connection';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await prisma.item.findMany();
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://192.168.0.103:3333/uploads/${item.image}`,
      };
    });
    response.json(serializedItems);
  }
}

export default ItemsController;
