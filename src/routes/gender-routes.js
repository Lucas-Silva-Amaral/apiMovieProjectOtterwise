import * as GenderControler from "../controllers/gender-controller.js";
import { validateRequest } from "../middleware/auth.js";

export default {
  showAllGenders: {
    method: "GET",
    url: "/gender",
    handler: GenderControler.index,
  },

  createGender: {
    method: "POST",
    url: "/gender",
    preHandler: [validateRequest],
    handler: GenderControler.create,
  },

  updateNameGender: {
    method: "PUT",
    url: "/gender/:id",
    preHandler: [validateRequest],
    handler: GenderControler.update,
  },

  deleteGender: {
    method: "DELETE",
    url: "/gender/:id",
    preHandler: [validateRequest],
    handler: GenderControler.remove,
  },
};
