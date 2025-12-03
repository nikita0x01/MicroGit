const express = require("express");
const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const issueRouter = require("./issue.router");

const mainRouter = express.Router();

// Mount userRouter at root '/'
mainRouter.use("/", userRouter);
mainRouter.use("/", repoRouter);
mainRouter.use("/", issueRouter);

mainRouter.get("/", (req, res) => {
  res.send("MicroGit Backend is running");
});

module.exports = mainRouter;
