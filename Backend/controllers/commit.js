const fs = require("fs");
const fsp = fs.promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function copyFolderRecursiveSync(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      const entryStat = fs.statSync(srcPath);
      if (entryStat.isDirectory()) {
        copyFolderRecursiveSync(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  } else {
    // src is a file
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

exports.commitRepo = async (message) => {
  const microgitPath = path.join(process.cwd(), ".microgit");
  const commitsRoot = path.join(microgitPath, "commits");

  try {
    // Ensure .microgit exists
    const exists = fs.existsSync(microgitPath);
    if (!exists) {
      console.error("Repository not initialized. Run `init` first.");
      return;
    }

    // Create commit folder (always using synchronous mkdir to guarantee creation)
    const commitId = uuidv4();
    const commitDir = path.join(commitsRoot, commitId);
    fs.mkdirSync(commitDir, { recursive: true });

    // Commit all top-level files and directories except `.microgit` and hidden files
    const entries = fs.readdirSync(process.cwd());
    const filesToCommit = entries.filter((e) => e !== ".microgit" && !e.startsWith("."));

    if (filesToCommit.length === 0) {
      console.log("Nothing to commit.");
      return;
    }

    for (const entry of filesToCommit) {
      const src = path.join(process.cwd(), entry);
      const dest = path.join(commitDir, entry);
      const st = fs.statSync(src);
      if (st.isDirectory()) {
        copyFolderRecursiveSync(src, dest);
      } else if (st.isFile()) {
        // ensure parent exists
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
      }
    }

    // Save commit metadata
    const metadata = {
      id: commitId,
      message: message || "",
      date: new Date().toISOString(),
      files: filesToCommit,
    };

    fs.writeFileSync(path.join(commitDir, "commit.json"), JSON.stringify(metadata, null, 2));

    console.log(`Committed as ${commitId}`);
  } catch (err) {
    console.error("Error committing files:", err && err.stack ? err.stack : err);
  }
};
