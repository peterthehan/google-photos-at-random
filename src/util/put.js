const fs = require("fs");
const path = require("path");

const file = path.resolve(__dirname, "../albums/tracked_albums.txt");

module.exports = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};
