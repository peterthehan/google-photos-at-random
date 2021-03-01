const fs = require("fs");
const path = require("path");

const file = path.resolve(__dirname, "../albums/tracked_albums.txt");

const initializeTrackedAlbums = () => {
  fs.writeFileSync(file, "{}");
  return {};
};

module.exports = () => {
  if (!fs.existsSync(file)) {
    return initializeTrackedAlbums();
  }

  const data = fs.readFileSync(file).toString();
  if (data === "") {
    return initializeTrackedAlbums();
  }

  return JSON.parse(data);
};
