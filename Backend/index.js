#!/usr/bin/env node
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

// Import Controllers
const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { pushRepo } = require("./controllers/push");
const { revertRepo } = require("./controllers/revert");

// ⭐ FIX: Correct router import — matches your filename exactly
const repoRouter = require("./routes/repo.router");

dotenv.config();

yargs(hideBin(process.argv))

  .command("start", "start a new server", {}, startServer)

  .command("init", "Initialize a new repository", {}, initRepo)

  .command(
    "add <file>",
    "Add a file to staging",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to stage",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )

  .command(
    "commit <message>",
    "Commit staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )

  .command("pull", "Pull latest changes from remote", {}, pullRepo)
  .command("push", "Push commits to remote", {}, pushRepo)

  .command(
    "revert <commitId>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "Commit ID to revert",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitId);
    }
  )

  .demandCommand(1, "You must enter a valid command before execution!")
  .help()
  .parse();

function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(express.json());
  app.use(bodyParser.json());

  const mongoURI = process.env.MONGODB_URI;

  if (mongoURI) {
    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("MongoDB connection error: ", err);
      });
  } else {
    console.warn("Warning: MONGODB_URI not set. Starting server without DB connection.");
  }

  app.use(cors({ origin: "*" }));

  // ⭐ Routers
  app.use("/", mainRouter);
  app.use("/repo", repoRouter); // <-- now correct

  let user = "test";

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinroom", (userID) => {
      user = userID;
      console.log(`User with ID: ${userID} joined the room.`);
      socket.join(userID);
    });
  });

  const db = mongoose.connection;
  db.once("open", async () => {
    console.log("CRUD operations can be performed");
  });

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
