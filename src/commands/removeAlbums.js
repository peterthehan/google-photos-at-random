const prompts = require("prompts");

const getCachedAlbums = require("../util/getCachedAlbums");
const put = require("../util/put");

module.exports = async () => {
  const albums = getCachedAlbums();

  const { values } = await prompts({
    type: "multiselect",
    name: "values",
    message: `Select from ${albums.length} album(s) to remove from track`,
    choices: albums.map((album) => ({
      title: album.title,
      description: `${album.cachedPhotosCount} cached photo(s)`,
      value: album.id,
    })),
  });

  if (values.length === 0) {
    return;
  }

  const track = albums.reduce(
    (obj, album) => ({
      ...obj,
      [album.id]: {
        id: album.id,
        title: album.title,
        productUrl: album.productUrl,
      },
    }),
    {}
  );

  values.forEach((value) => delete track[value]);

  put(track);
};
