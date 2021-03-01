const fs = require("fs");
const path = require("path");

const get = require("../util/get");

module.exports = () => {
  const track = get();

  return Object.values(track).map((album) => {
    try {
      const cachedPhotosCount = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, `../albums/${album.id}.json`))
      ).length;
      return { ...album, cachedPhotosCount };
    } catch (error) {
      return { ...album, cachedPhotosCount: 0 };
    }
  });
};
