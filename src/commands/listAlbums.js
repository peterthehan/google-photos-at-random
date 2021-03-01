const get = require("../util/get");

module.exports = async () => {
  const track = get();
  const albums = Object.values(track);

  console.log(
    albums.map((album) => `    ${album.title} - ${album.productUrl}`).join("\n")
  );
};
