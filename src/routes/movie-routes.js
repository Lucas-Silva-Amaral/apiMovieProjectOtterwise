import * as MovieController from "../controllers/movie-controller.js";
import { validateRequest } from "../middleware/auth.js";

export default {
  showAllMovie: {
    method: "GET",
    url: "/movies",
    handler: MovieController.index,
  },
  showMovie: {
    method: "GET",
    url: "/movies/:id",
    handler: MovieController.show,
  },

  createMovie: {
    method: "POST",
    url: "/movies",
    preHandler: [validateRequest],
    handler: MovieController.create,
  },

  updateMovie: {
    method: "PUT",
    url: "/movies/:id",
    preHandler: [validateRequest],
    handler: MovieController.update,
  },

  updateMovieAtribute: {
    method: "PATCH",
    url: "/movies/:id",
    preHandler: [validateRequest],
    handler: MovieController.update,
  },

  deleteMovie: {
    method: "DELETE",
    url: "/movies/:id",
    preHandler: [validateRequest],
    handler: MovieController.remove,
  },
};
