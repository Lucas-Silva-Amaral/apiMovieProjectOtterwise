import { prisma } from "../helpers/utils.js";

export const index = async (req, reply) => {
  try {
    const genders = await prisma.gender.findMany();
    return reply.send(genders);
  } catch (error) {
    console.log(error);
    return reply.status(500).send(error);
  }
};

export const create = async (req, reply) => {
  const { name } = req.body;
  console.log(req.body);
  if (!name) return reply.status(400).send("Campo nome não preenchido");

  try {
    const gender = await prisma.gender.create({
      data: {
        name,
      },
    });
    return reply.status(203).send(gender);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
};

export const update = async (req, reply) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return reply.status(400).send("Campo nome não preenchido");

  try {
    const gender = await prisma.gender.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    return reply.status(200).send(gender);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
};

export const remove = async (req, reply) => {
  const { id } = req.params;

  try {
    const gender = await prisma.gender.delete({ where: { id: parseInt(id) } });
    return reply.status(200).send(gender);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error);
  }
};
