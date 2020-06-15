import { Request, Response } from 'express';
import prisma from '../connection';

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await prisma.point.findMany({
      where: {
        city: String(city),
        uf: String(uf),
        items: {
          some: {
            id: {
              in: parsedItems,
            },
          },
        },
      },
    });

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.0.103:3333/uploads/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await prisma.point.findOne({
      where: {
        id: Number(id),
      },
      include: {
        items: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!point) {
      return response.status(400).json({ message: 'Point not found' });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.0.103:3333/uploads/${point.image}`,
    };

    return response.json(serializedPoint);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body;

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((itemId: number) => {
        return {
          id: itemId,
        };
      });

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp: String(whatsapp),
      latitude,
      longitude,
      city,
      uf,
      items: {
        connect: pointItems,
      },
    };

    const insertedPoint = await prisma.point.create({
      data: point,
      include: {
        items: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return response.json(insertedPoint);
  }
}

export default PointsController;
