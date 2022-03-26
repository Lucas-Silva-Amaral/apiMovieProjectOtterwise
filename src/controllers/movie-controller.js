import { prisma } from "../helpers/utils.js";

export const index = async (_, reply) => {
  try {
    const movies = await prisma.movie.findMany();
    return reply.send(movies);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
};

export const create = async (req, reply) => {
  const { name, year, brand_id } = req.body;

  try {
    const movie = await prisma.movie.create({
      data: {
        name: name,
        year: year,
        brand: { connect: { id: parseInt(brand_id) } },
        image_url: req.file.path,
      },
    });

    return reply.status(201).send(movie);
  } catch (error) {
    reply.status(500).send(error);
  }
};

export const update = async (req, reply) => {
  const { id } = req.params;

  let data = {};

  if (req.body.name) {
    data.name = req.body.name;
  }

  if (req.body.year) {
    data.year = req.body.year;
  }

  if (req.body.brand_id) {
    data.brand_id = parseInt(req.body.brand_id);
  }

  if (req.file) {
    data.image_url = req.file.path;
  }

  try {
    const movie = await prisma.movie.update({
      where: { id: parseInt(id) },
      data: data,
    });

    return reply.status(200).send(movie);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};

export const remove = async (req, reply) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.delete({
      where: { id: parseInt(id) },
    });

    return reply.status(200).send(movie);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};
