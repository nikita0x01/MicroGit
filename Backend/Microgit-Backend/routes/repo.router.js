const express = require("express");
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

// CREATE
repoRouter.post("/create", repoController.createRepository);

// READ
repoRouter.get("/all", repoController.getAllRepositories);
repoRouter.get("/name/:name", repoController.fetchRepositoryByName);
repoRouter.get("/user/:userID", repoController.fetchRepositoriesForCurrentUser);
repoRouter.get("/:id", repoController.fetchRepositoryById);

// UPDATE
repoRouter.put("/update/:id", repoController.updateRepositoryById);
repoRouter.patch("/toggle/:id", repoController.toggleVisibilityById);

// DELETE
repoRouter.delete("/delete/:id", repoController.deleteRepositoryById);

module.exports = repoRouter;
