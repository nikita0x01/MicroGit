const fs = require("fs").promises;
const path = require("path");

exports.initRepo = async () => {
  const microgitPath = path.join(process.cwd(), ".microgit");
  const commitsPath = path.join(microgitPath, "commits");
  const configFilePath = path.join(commitsPath, "config.json");

  try {
    // Check if repo already exists
    const repoExists = await fs
      .access(microgitPath)
      .then(() => true)
      .catch(() => false);

    if (repoExists) {
      console.log("Repository already initialized.");
      return;
    }

    // Create the directory structure
    await fs.mkdir(microgitPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });

    // Write config.json inside commits folder
    const configData = {
      bucket: process.env.S3_BUCKET || "",
      createdAt: new Date().toISOString()
    };

    await fs.writeFile(
      configFilePath,
      JSON.stringify(configData, null, 2)
    );

    console.log("Initialized microgit repository with commits/config.json!");
  } catch (err) {
    console.error("Error initializing repository:", err);
  }
};
