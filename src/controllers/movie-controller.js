import { prisma } from "../helpers/utils.js";

// get all movies
export const index = async (_, reply) => {
  try {
    const movies = await prisma.movie.findMany();
    return reply.send(movies);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
};

// get movie id
export const show = async (req, reply) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: +id },
    });
    return reply.send(movie);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
};

export const create = async (req, reply) => {
  const { title, description, gender_id, user_id } = req.body;
  try {
    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        gender_id,
        user_id,
      },
    });

    return reply.status(201).send(movie);
  } catch (error) {
    reply.status(500).send(error);
  }
};

// update movie
export const update = async (req, reply) => {
  const { id } = req.params;
  const { id: user_id } = req.user;

  const movie = await prisma.movie.findUnique({
    where: { id: +id },
  });

  const { user_id: movie_user_id } = movie;

  if (user_id !== movie_user_id) {
    return reply
      .status(403)
      .send({ message: "Você não tem permições para alterar este filme" });
  }

  let data = {};

  if (req.body.title) {
    data.title = req.body.title;
  }

  if (req.body.description) {
    data.description = req.body.description;
  }

  if (req.body.gender_id) {
    data.gender_id = +req.body.gender_id;
  }

  try {
    const movie = await prisma.movie.update({
      where: { id: +id },
      data: data,
    });

    return reply.status(200).send(movie);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};

// remove movie
export const remove = async (req, reply) => {
  const { id } = req.params;
  try {
    const movie = await prisma.movie.delete({
      where: { id: +id },
    });

    return reply.status(200).send(movie);
  } catch (error) {
    console.error(error);
    reply.status(500).send(error);
  }
};
