const fs = require('fs').promises; 
const path = require('path');

async function addRepo(filePath) {
  const repoPath = path.join(process.cwd(), '.microgit');
  const stagingPath = path.join(repoPath, 'staging');

  try {
    await fs.mkdir(stagingPath, { recursive: true });
    
    const fileName = path.basename(filePath);

    // Await the copy operation
    await fs.copyFile(filePath, path.join(stagingPath, fileName));

    console.log(`Added ${fileName} to staging area.`);
  } catch (err) {
    console.error('Error adding file to staging:', err);
  }
}

module.exports = { addRepo };
