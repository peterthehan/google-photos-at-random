const fs = require("fs");
const path = require("path");
const prompts = require("prompts");

const batchLoader = require("../util/batchLoader");
const getCachedAlbums = require("../util/getCachedAlbums");

const MAX_MEDIAITEMS_PAGE_SIZE = 100;

module.exports = async (photos) => {
  const albums = getCachedAlbums();

  const { value } = await prompts({
    type: "select",
    name: "value",
    message: `Select tracked album to update`,
    choices: [
      ...albums.map((album) => ({
        title: album.title,
        description: `${album.cachedPhotosCount} cached photo(s)`,
        value: album.id,
      })),
      { title: "Return to main menu", value: "return" },
    ],
  });

  if (value === "return") {
    return;
  }

  const callback = async (nextPageToken) => {
    const response = await photos.mediaItems.search(
      value,
      MAX_MEDIAITEMS_PAGE_SIZE,
      nextPageToken
    );

    return {
      batch: response.mediaItems.map((mediaItem) => mediaItem.id),
      nextPageToken: response.nextPageToken,
    };
  };

  const photoIds = await batchLoader(callback);

  const file = path.resolve(__dirname, `../albums/${value}.json`);
  fs.writeFileSync(file, JSON.stringify(photoIds, null, 2));
  console.log(`File written to: ${file}`);
};
