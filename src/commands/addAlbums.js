const prompts = require("prompts");

const batchLoader = require("../util/batchLoader");
const get = require("../util/get");
const put = require("../util/put");

const MAX_ALBUMS_PAGE_SIZE = 50;

module.exports = async (photos) => {
  const track = get();

  const callback = async (nextPageToken) => {
    const response = await photos.albums.list(
      MAX_ALBUMS_PAGE_SIZE,
      nextPageToken
    );

    return { batch: response.albums, nextPageToken: response.nextPageToken };
  };

  const albums = await batchLoader(callback);

  const { values } = await prompts({
    type: "multiselect",
    name: "values",
    message: `Select from ${albums.length} album(s) to add to track`,
    choices: albums.map((album) => ({
      title: album in track ? `${album.title} - Already tracked` : album.title,
      description: `${album.mediaItemsCount} photo(s)`,
      value: { id: album.id, title: album.title, productUrl: album.productUrl },
      disabled: album in track,
    })),
  });

  if (values.length === 0) {
    return;
  }

  const albumsToAdd = values.reduce(
    (obj, value) => ({ ...obj, [value.id]: value }),
    {}
  );

  put({ ...track, ...albumsToAdd });
};
