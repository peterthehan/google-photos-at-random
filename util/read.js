const fs = require("fs");
const path = require("path");

const file = path.resolve(__dirname, "../albums/tracked_albums.txt");

module.exports = () => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "{}");
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(file));
  } catch {
    fs.writeFileSync(file, "{}");
    return {};
  }
};
